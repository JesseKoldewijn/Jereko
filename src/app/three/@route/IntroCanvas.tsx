"use client";

import { useLoader } from "@react-three/fiber";
import { Suspense, useLayoutEffect, useState } from "react";
import { Color, TextureLoader } from "three";

import EarthMapDay from "@/../public/images/three/maps/EarthDay.jpg";
import EarthMapNight from "@/../public/images/three/maps/EarthNight.jpg";
import CanvasCore from "@/components/threejs/CanvasCore";

const IntroCanvas = () => {
  const [dayOrNight, setDayOrNight] = useState<"day" | "night" | undefined>(
    undefined,
  );

  useLayoutEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 18) {
      setDayOrNight("day");
    } else {
      setDayOrNight("night");
    }
  }, []);

  return (
    <>
      <CanvasCore>
        <Suspense>
          {dayOrNight !== undefined && <Scene dayOrNight={dayOrNight} />}
        </Suspense>
      </CanvasCore>
    </>
  );
};

export default IntroCanvas;

const sceneConfig = {
  day: {
    ambientLight: 5,
    globeMap: EarthMapDay.src,
  },
  night: {
    ambientLight: 6,
    globeMap: EarthMapNight.src,
  },
} as const;

const Scene = ({
  dayOrNight = "day",
  time,
}: {
  dayOrNight: "day" | "night";
  time?: number;
}) => {
  const config = sceneConfig[dayOrNight];
  const colorMap = useLoader(TextureLoader, config.globeMap);

  const timeFormatted = time ? time / 1000 : 0;

  return (
    <>
      <ambientLight intensity={config.ambientLight} />
      <directionalLight color={Color.NAMES.whitesmoke} position={[1, 50, 50]} />
      <mesh>
        <boxGeometry />
        <sphereGeometry args={[2, 50, 50]} />
        <meshStandardMaterial map={colorMap} />
      </mesh>
      {time && (
        <div className="z-20">
          {new Date(timeFormatted).toLocaleTimeString("en-US")}
        </div>
      )}
    </>
  );
};
