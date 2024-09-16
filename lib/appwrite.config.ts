import * as sdk from "node-appwrite";

export const {
  NEXT_PUBLIC_ENDPOINT,
  PROJECT_ID,
  API_KEY,
  DATABASE_ID,
  PATIENT_COLLECTION_ID,
  DOCTOR_COLLECTION_ID,
  APPOINTMENT_COLLECTION_ID,
  NEXT_PUBLIC_BUCKET_ID,
} = process.env;

if(!NEXT_PUBLIC_ENDPOINT) {
  throw new Error("Missing Endpoint")
} else {
  "APi is missing"
}

const client = new sdk.Client();

client.setEndpoint(NEXT_PUBLIC_ENDPOINT!).setProject(PROJECT_ID!).setKey(API_KEY!);

export const databases = new sdk.Databases(client);
export const users = new sdk.Users(client);
export const messaging = new sdk.Messaging(client);
export const storage = new sdk.Storage(client);