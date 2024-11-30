"use client";

import { Serwist } from "serwist";

import { serwistConfig } from "@/config/pwa/client";

const serwist = new Serwist(serwistConfig);

serwist.addEventListeners();
