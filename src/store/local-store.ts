export const isOffline = () => {
  return !navigator.onLine;
};

const getStoreByNamespace = (namespace: string) => {
  try {
    const data = localStorage.getItem(`store-${namespace}`);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error(e);
    return {
      data: [],
      expiration: new Date(),
    };
  }
  return {
    data: [],
    expiration: new Date(),
  };
};

const getDbDataByNamespace = async (namespace: string) => {
  switch (namespace) {
    case "users": {
      try {
        const res = await fetch("/api/projects");
        if (res.ok) {
          return await res.json();
        } else {
          return [];
        }
      } catch (e) {
        console.error(e);
        return [];
      }
    }
    case "posts": {
      try {
        const res = await fetch("/api/experience");
        if (res.ok) {
          return await res.json();
        } else {
          return [];
        }
      } catch (e) {
        console.error(e);
        return [];
      }
    }
    default:
      return async () => {
        return [];
      };
  }
};

export const validateStoreExpiration = <T>(namespace: string, dbData?: T) => {
  const now = new Date();

  const store = getStoreByNamespace(namespace);

  const expiration = new Date(store ? store.expiration : now.getTime());
  const isExpired =
    Number(
      now.getTime() !== expiration.getTime()
        ? now.getTime() - expiration.getTime()
        : 172800002,
    ) > 172800000; // 2 days

  if (isExpired && dbData) {
    localStorage.setItem(
      `store-${namespace}`,
      JSON.stringify({
        data: dbData,
        expiration: now.getTime(),
      }),
    );
  } else if (!store && dbData) {
    localStorage.setItem(
      `store-${namespace}`,
      JSON.stringify({
        data: dbData,
        expiration: now.getTime(),
      }),
    );
  }

  return {
    local: store,
    dbData: dbData,
    isExpired,
  };
};

export const getStore = async (namespace: string) => {
  const { local, isExpired } = validateStoreExpiration(namespace);
  const offline = isOffline();

  const isOfflineAndExpired = offline && isExpired;
  const isOfflineAndNotExpired = offline && !isExpired;

  const isOnlineAndExpired = !offline && isExpired;
  const isOnlineAndNotExpired = !offline && !isExpired;

  if (isOfflineAndExpired || isOfflineAndNotExpired || isOnlineAndNotExpired) {
    return local;
  } else if (isOnlineAndExpired) {
    const dbData = await getDbDataByNamespace(namespace);
    localStorage.setItem(`store-${namespace}`, JSON.stringify(dbData));
    return dbData;
  } else {
    return await getDbDataByNamespace(namespace);
  }
};
