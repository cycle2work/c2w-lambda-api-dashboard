import { MongoClient } from "mongodb";

import { MONGODB_URL, REPORTS_COLLECTION } from "../config";

let clientInstance;

export async function getMongoClient() {
  if (!clientInstance) {
    /* eslint-disable-next-line */
    clientInstance = await MongoClient.connect(MONGODB_URL, {
      useNewUrlParser: true
    });
  }
  return clientInstance;
}

export async function retrieveReports(query) {
  const client = await getMongoClient();
  return await client
    .db("test")
    .collection(REPORTS_COLLECTION)
    .find(query)
    .toArray();
}
