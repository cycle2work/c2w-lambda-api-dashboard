import moment from "moment";

import { log } from "./services/logger";
import { retrieveActivities } from "./services/mongo-db";

export default async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const currentYear = `${moment.utc().year()}`;

    const { years = currentYear, clubId } = event.queryStringParameters || {};

    if (!years || !clubId) {
      throw new Error(
        `Request parameters 'years' or 'clubId' not provided: years=${years} clubId=${clubId}`
      );
    }

    const parsedYears = years.split(",").map((year) => parseInt(year));
    const parsedClubId = parseInt(clubId);

    log.debug({ parsedYears, parsedClubId });

    const clubActivities = await retrieveActivities(parsedYears, parsedClubId);

    log.debug({ clubActivities });

    callback(null, {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify(clubActivities),
    });
  } catch (error) {
    log.error(error);

    callback(null, {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
    });
  }
};
