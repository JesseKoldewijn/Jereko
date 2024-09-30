import React from "react";

import { cookies } from "next/headers";
import { notFound } from "next/navigation";

import { env } from "@/env.mjs";

const isAuth = (sessionCookie?: string) => {
  const isDev = env.NODE_ENV == "development";

  if (!sessionCookie) return false;
  if (isDev) return true;
  return false;
};

const AdminHome = () => {
  const authCookie = cookies().get("session");
  const isAuthorized = isAuth(authCookie?.value);

  if (!isAuthorized) notFound();

  return <div>AdminHome</div>;
};

export default AdminHome;
