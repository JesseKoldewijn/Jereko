import { useRef } from "react";
import { type Mesh } from "three";

export const useMeshRef = () => {
  return useRef<Mesh>(null!);
};
