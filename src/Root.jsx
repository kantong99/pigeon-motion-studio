
import React from "react";
import { Composition } from "remotion";
import { PigeonVideo } from "./PigeonCollection";

const Root = () => {
  return (
    <>
      {Array.from({ length: 10 }, (_, i) => (
        <Composition
          key={i}
          id={`PIGEON-${String(i + 1).padStart(3, "0")}`}
          component={PigeonVideo}
          durationInFrames={600}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{ variant: i + 1 }}
        />
      ))}
    </>
  );
};

export default Root;
