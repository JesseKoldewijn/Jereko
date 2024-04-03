import type { Euler, Color as ThreeColor, Vector3 } from "three";

import type { Rgb0x, Rgba0x } from "./colors";

export type Rotation = Euler;
export type Position = Vector3;
export type Color = ThreeColor | Rgb0x | Rgba0x;
