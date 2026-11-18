import React from "react";
import {Composition} from "remotion";
import {PigeonVideo} from "./PigeonCollection";
export const Root = () => <>{Array.from({length:10},(_,i)=><Composition key={i} id={`PIGEON-${String(i+1).padStart(3,"0")}`} component={PigeonVideo} defaultProps={{variant:i+1}} width={3840} height={2160} fps={30} durationInFrames={600}/>)}</>;
