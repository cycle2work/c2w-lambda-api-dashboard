import { getMongoClient } from "./services/mongo-db";

import { handler } from "./";

import { MONGODB_NAME, REPORTS_COLLECTION } from "./config";

describe("`c2w-lambda-api-dashboard` APIs", () => {
  let client;
  let context;
  let callback;

  beforeAll(async () => {
    client = await getMongoClient();

    await client
      .db(MONGODB_NAME)
      .collection("reports")
      .insertMany([
        {
          athlete: { id: 1 },
          club: { id: 1 },
          year: 2019,
          month: 10,
          distances: [1, 1, 1, 7]
        },
        {
          athlete: { id: 1 },
          club: { id: 2 },
          year: 2019,
          month: 10,
          distances: [8]
        },
        {
          athlete: { id: 2 },
          club: { id: 1 },
          year: 2019,
          month: 10,
          distances: [1, 1, 1, 7]
        },
        {
          athlete: { id: 1 },
          club: { id: 1 },
          year: 2019,
          month: 11,
          distances: [25, 25]
        },
        {
          athlete: { id: 1 },
          club: { id: 1 },
          year: 2018,
          month: 11,
          distances: [100]
        }
      ]);
  });

  afterAll(async () => {
    await client.db(MONGODB_NAME).dropCollection(REPORTS_COLLECTION);

    client.close();
  });

  beforeEach(() => {
    context = {
      succeed: jest.fn()
    };
    callback = jest.fn();
  });

  it("return 400", async () => {
    await handler({}, context, callback);

    expect(callback).lastCalledWith(null, {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
      }
    });
  });

  it("return 200 and reports grouped by month", async () => {
    await handler(
      { queryStringParameters: { year: "2019", athleteId: "1", clubId: "1" } },
      context,
      callback
    );

    const expected = [
      {
        year: 2019,
        month: 10,
        distance: 10
      },
      {
        year: 2019,
        month: 11,
        distance: 50
      }
    ];

    expect(callback).lastCalledWith(null, {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
      },
      body: JSON.stringify(expected)
    });
  });
});
