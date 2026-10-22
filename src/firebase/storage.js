// Firebase Storage (car photos). Kept out of config.js so only the admin
// pages, via carsAdmin.js, download the Storage SDK.
import { connectStorageEmulator, getStorage } from "firebase/storage";
import { app, emulatorsEnabled } from "./config";

export const storage = getStorage(app);

if (emulatorsEnabled) {
  connectStorageEmulator(storage, "127.0.0.1", 9199);
}
