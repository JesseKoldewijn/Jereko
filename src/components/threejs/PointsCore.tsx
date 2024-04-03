import { type Points as PointsThreejs } from "@react-three/drei";

import dynamic from "next/dynamic";

const Points = dynamic(
  () => import("@react-three/drei").then((mod) => mod.Points),
  {
    ssr: false,
  },
);

const PointsCore = (props: Parameters<typeof PointsThreejs>[0]) => {
  return <Points {...props} />;
};

export default PointsCore;
