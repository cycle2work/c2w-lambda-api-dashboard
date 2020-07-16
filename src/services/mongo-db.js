import mongodb from "mongodb";

import { MONGODB_URL, MONGODB_NAME, PROCESSED_ACTIVITIES_COLLECTION } from "../config";

let clientInstance;

export async function getMongoClient() {
  if (!clientInstance) {
    /* eslint-disable-next-line */
    clientInstance = await mongodb.connect(MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
  return clientInstance;
}

export async function retrieveActivities(years, clubId) {
  const client = await getMongoClient();
  return await client
    .db(MONGODB_NAME)
    .collection(PROCESSED_ACTIVITIES_COLLECTION)
    .find({ clubId, year: { $in: years } })
    .project({ _id: 0 })
    .toArray();
}
