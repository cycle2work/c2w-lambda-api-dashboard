import moment from "moment";

import { log } from "./services/logger";
import { retrieveReports } from "./services/mongo-db";

export default async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const currentYear = moment.utc().year();

    const { year = currentYear, athleteId, clubId } =
      event.queryStringParameters || {};

    if (!year || !athleteId || !clubId) {
      throw new Error(
        `Request parameters year or athleteId not provided year=${year} athleteId=${athleteId} clubId=${clubId}`
      );
    }

    const parsedYear = parseInt(year);
    const parsedAthleteId = parseInt(athleteId);
    const parsedClubId = parseInt(clubId);

    const reports = await retrieveReports({
      "athlete.id": parsedAthleteId,
      "club.id": parsedClubId,
      year: parsedYear
    });

    log.debug({ parsedYear, parsedAthleteId, parsedClubId, reports });

    const monthlyTotal = reports.map(report => ({
      year: report.year,
      month: report.month,
      distance: report.distances.reduce((sum, distance) => sum + distance, 0)
    }));

    log.debug({ monthlyTotal });

    callback(null, {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
      },
      body: JSON.stringify(monthlyTotal)
    });
  } catch (error) {
    log.error(error);

    callback(null, {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
      }
    });
  }
};
