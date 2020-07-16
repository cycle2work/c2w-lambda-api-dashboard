import { getMongoClient } from "./services/mongo-db";

import { handler } from "./";

import { MONGODB_NAME, PROCESSED_ACTIVITIES_COLLECTION } from "./config";

describe("`c2w-lambda-api-dashboard` APIs", () => {
  let client;
  let context;
  let callback;

  beforeAll(async () => {
    client = await getMongoClient();

    await client
      .db(MONGODB_NAME)
      .collection(PROCESSED_ACTIVITIES_COLLECTION)
      .deleteMany({});

    await client
      .db(MONGODB_NAME)
      .collection(PROCESSED_ACTIVITIES_COLLECTION)
      .insertMany([
        {
          athleteId: 1,
          clubId: 1,
          year: 2020,
          month: 3,
          day: 8,
          distance: 100,
        },
        {
          athleteId: 2,
          clubId: 1,
          year: 2020,
          month: 6,
          day: 8,
          distance: 50,
        },
        {
          athleteId: 1,
          clubId: 2,
          year: 2019,
          month: 4,
          day: 8,
          distance: 20,
        },
        {
          athleteId: 2,
          clubId: 2,
          year: 2019,
          month: 11,
          day: 8,
          distance: 30,
        },
        {
          athleteId: 1,
          clubId: 1,
          year: 2018,
          month: 5,
          day: 8,
          distance: 100,
        },
      ]);
  });

  afterAll(() => {
    client.close();
  });

  beforeEach(() => {
    context = {
      succeed: jest.fn(),
    };
    callback = jest.fn();
  });

  it("return 400", async () => {
    await handler({}, context, callback);

    expect(callback).lastCalledWith(null, {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
    });
  });

  it("should return 200 and 2017 and 2018 activities for the provided clubId", async () => {
    await handler(
      { queryStringParameters: { years: "2017,2018", clubId: "1" } },
      context,
      callback
    );

    const expected = [
      {
        athleteId: 1,
        clubId: 1,
        year: 2018,
        month: 5,
        day: 8,
        distance: 100,
      },
    ];

    expect(callback).lastCalledWith(null, {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify(expected),
    });
  });

  it("should return 200 and current year activities for the provided clubId", async () => {
    await handler({ queryStringParameters: { clubId: "1" } }, context, callback);

    const expected = [
      {
        athleteId: 1,
        clubId: 1,
        year: 2020,
        month: 3,
        day: 8,
        distance: 100,
      },
      {
        athleteId: 2,
        clubId: 1,
        year: 2020,
        month: 6,
        day: 8,
        distance: 50,
      },
    ];

    expect(callback).lastCalledWith(null, {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify(expected),
    });
  });
});
