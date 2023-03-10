import axios from "axios";
import BASE_URL from "constant/api";
import firebaseConfig from "constant/firebase.config";
import { initializeApp } from "firebase/app";
import {
  DocumentData,
  QuerySnapshot,
  getFirestore,
  connectFirestoreEmulator,
} from "firebase/firestore";
import { convertTimeStamp } from "util/TimeStamp";

export const isProd = process.env.NODE_ENV === "production";
const baseURL = isProd ? BASE_URL.PROD : BASE_URL.EMULATOR;

const emulate = false;

export const baseApi = axios.create({
  baseURL,
  headers: {},
});

const app = initializeApp(firebaseConfig);
export const fireStore = getFirestore(app);
if (emulate && !isProd) connectFirestoreEmulator(fireStore, "localhost", 8090);

export const processSnapshot = (
  e: QuerySnapshot<DocumentData>,
  disableFilterVisible: boolean = false
) => {
  const data = e.docs.map((doc) => doc.data()).map(convertTimeStamp);
  if (disableFilterVisible) return data;
  return data.filter((e) => e.visible);
};
