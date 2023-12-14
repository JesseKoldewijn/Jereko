"use client";

import { createContext, useContext, useEffect, useState } from "react";

import { usedTechnologies as UsedTechnologies } from "@/config/tech";
import { db } from "@/server/db/conn";
import { type Experience, Experiences } from "@/server/db/schemas/experience";
import { type Project, Projects } from "@/server/db/schemas/projects";
import { localstore } from "@/store/local-store";

// Create the PWA context
interface PWAContextProps {
  isPWA: boolean;
  isOffline: boolean;
}

const PWAContext = createContext<PWAContextProps>({
  isPWA: false,
  isOffline: false,
});

const storage = localstore();
export type PWAContextStoreName = keyof typeof storage;

// PWA provider component
const PWAProvider = ({ children }: { children: React.ReactNode }) => {
  const [isPWA, setIsPWA] = useState<boolean>(false);
  const [isOffline, setIsOffline] = useState<boolean>(false);

  /**
   * The function checks if the application is running as a Progressive Web App (PWA).
   * @returns a boolean value indicating whether the code is running as a Progressive Web App (PWA) or
   * not.
   */
  const isRunningAsPWA = () => {
    return window.matchMedia("(display-mode: standalone)").matches;
  };

  /**
   * The function checks if the user's device is currently offline.
   * @returns The function isCurrentlyOffline returns a boolean value. It returns true if the window
   * object is defined and the navigator's online property is false, indicating that the user is
   * currently offline. Otherwise, it returns false.
   */
  const isCurrentlyOffline = () => {
    return !window.navigator.onLine;
  };

  /**
   * The function `getstorage` retrieves data from a specified store in the local storage and
   * returns it as a promise.
   * @param {PWAContextStoreName} storeName - The `storeName` parameter is a string that represents the
   * name of the store in the storage object. It is used to retrieve the corresponding store from
   * the storage object and perform operations on it.
   * @returns The function `getstorage` returns a promise that resolves to an `IDBRequest` object.
   * The specific type of `IDBRequest` depends on the value of the `storeName` parameter. If
   * `storeName` is "projects", the promise resolves to `IDBRequest<Project[]>`. If `storeName` is
   * "experience", the promise resolves to `IDBRequest<
   */
  const getlocalstore = (storeName: PWAContextStoreName) => {
    const store = storage[storeName];
    if (!store) throw new Error(`Store ${storeName} does not exist`);

    const storeValue = store("readonly", (idb) => idb.getAll());
    switch (storeName) {
      case "projects":
        return storeValue as Promise<IDBRequest<Project[]>>;
      case "experience":
        return storeValue as Promise<IDBRequest<Experience[]>>;
      case "usedTech":
        return storeValue as Promise<IDBRequest<typeof UsedTechnologies>>;
      default:
        throw new Error(`Store ${storeName} does not exist`);
    }
  };

  /**
   * The function `setstorage` is used to store a value in a specified store in the local storage.
   * @param {PWAContextStoreName} storeName - storeName is a string that represents the name of the
   * store in the storage object.
   * @param {string} value - The `value` parameter is a string that represents the value you want to
   * store in the local store.
   */
  const setlocalstore = (storeName: PWAContextStoreName, value: string) => {
    if (typeof window === "undefined") return false;

    const store = storage[storeName];
    if (!store) throw new Error(`Store ${storeName} does not exist`);
    store("readwrite", (idb) => {
      idb.put(value);
    });
  };

  /**
   * The function checks if the local store cache has expired based on the last stored date and returns
   * whether an update is needed or not.
   * @param {PWAContextStoreName} storeName - The `storeName` parameter is a string that represents the
   * name of the store in the PWA (Progressive Web App) context. It is used to retrieve the last stored
   * date from the local storage.
   * @returns an object with two properties: "needUpdate" and "lastStoredDate". The "needUpdate"
   * property is a boolean value indicating whether an update is needed or not. The "lastStoredDate"
   * property is the last stored date retrieved from the local storage.
   */
  const checklocalstoreCacheExpiration = async (
    storeName: PWAContextStoreName,
  ) => {
    const lastStored = localStorage.getItem(`${storeName}-last-stored`);
    const lastStoredParsed = lastStored ? JSON.parse(lastStored) : null;
    const lastStoredDate = lastStoredParsed ? new Date(lastStoredParsed) : null;

    const now = new Date();
    const diff = lastStoredDate
      ? now.getTime() - lastStoredDate.getTime()
      : null;
    const diffInDays = diff ? Math.floor(diff / (1000 * 3600 * 24)) : null;

    if (diffInDays && diffInDays > 7) {
      return {
        needUpdate: true,
        lastStoredDate,
      };
    } else {
      return {
        needUpdate: false,
        lastStoredDate,
      };
    }
  };

  /**
   * The function updates the local store with data from the database if the cache has expired.
   * @param {PWAContextStoreName} storeName - The `storeName` parameter is a string that represents the
   * name of the local store. It is used to identify the specific store that needs to be updated.
   */
  const updatelocalstore = async (storeName: PWAContextStoreName) => {
    const { needUpdate } = await checklocalstoreCacheExpiration(storeName);

    if (needUpdate) {
      const data = await db.select().from(Projects).execute();
      setlocalstore(storeName, JSON.stringify(data));
      localStorage.setItem(
        `${storeName}-last-stored`,
        JSON.stringify(new Date()),
      );
    }
  };

  /**
   * The function checks if the local store data is expired, and if so, updates it with new data and
   * returns the updated data, otherwise it returns the existing data.
   * @param {PWAContextStoreName} storeName - The `storeName` parameter is the name of the local store
   * that you want to check for expiration and update if necessary. It is of type `PWAContextStoreName`.
   * @param {Function} newDataCallback - The `newDataCallback` parameter is a function that is called
   * when the local store data needs to be updated. It should return the new data that will be stored in
   * the local store.
   * @returns the result of either `getstorage(storeName)` or `getstorage(storeName)` depending on
   * the value of `needUpdate`.
   */
  const getlocalstoreDataIfNotExpired = async (
    storeName: PWAContextStoreName,
    newDataCallback: Function,
  ) => {
    const { needUpdate } = await checklocalstoreCacheExpiration(storeName);

    if (needUpdate) {
      const newData = newDataCallback();
      setlocalstore(storeName, JSON.stringify(newData));
      updatelocalstore(storeName);
      return await getlocalstore(storeName);
    } else {
      return await getlocalstore(storeName);
    }
  };

  /**
   * The function `getDbData` retrieves data from a database based on the provided store name, either
   * from a local store if offline or from the database if online.
   * @param {PWAContextStoreName} storeName - The `storeName` parameter is a string that represents the
   * name of the store from which you want to retrieve data. It is used to determine which store to
   * query and return data from.
   * @returns The function `getDbData` returns different values based on the conditions:
   */
  const getDbData = async (storeName: PWAContextStoreName) => {
    if (isCurrentlyOffline()) {
      const localstore = await getlocalstore(storeName);
      return localstore.result;
    } else {
      switch (storeName) {
        case "projects":
          return await getlocalstoreDataIfNotExpired(storeName, () => {
            return db.select().from(Projects).execute();
          });
        case "experience":
          return await getlocalstoreDataIfNotExpired(storeName, () => {
            return db.select().from(Experiences).execute();
          });
        case "usedTech":
          // Just a dumb way to make sure the type is infered as expected
          // Might need a change in the future
          return async () => UsedTechnologies;
        default:
          throw new Error(`Store ${storeName} does not exist`);
      }
    }
  };

  useEffect(() => {
    setIsPWA(isRunningAsPWA());
    setIsOffline(isCurrentlyOffline());
  }, []);

  const value = { isPWA, isOffline, getDbData };

  return <PWAContext.Provider value={value}>{children}</PWAContext.Provider>;
};

export default PWAProvider;

// PWA hook
export const usePWA = () => {
  const { isPWA, isOffline } = useContext(PWAContext);

  const CheckCtxEntriesUndefined = () => {
    switch (true) {
      case isPWA === undefined:
      case isOffline === undefined:
        return true;
    }
  };

  if (CheckCtxEntriesUndefined()) {
    throw new Error("usePWA must be used within a PWAProvider");
  }

  return { isPWA, isOffline } as const;
};
