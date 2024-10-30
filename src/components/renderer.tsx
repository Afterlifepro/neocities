import { openApps } from "@/store";
import { useStore } from "@nanostores/react";
import Window from "./Window";
import { useEffect, useState } from "react";
import log from "@/logs";

export default function Render() {
  const $openApps = useStore(openApps);

  const [result, setResult] = useState([]);

  useEffect(() => {
    log("rerendering windows", "darkgoldenrod");
    setResult([]);
    for (const [i, app] of Object.entries($openApps.apps)) {
      setResult((results) => [
        ...results,
        <Window
          title={app.title}
          layer={app.layer}
          icon={app.icon}
          width={app.width}
          maxHeight={app.maxHeight}
          id={parseInt(i)}
          key={parseInt(i)}
        >
          {app.content}
        </Window>,
      ]);
    }
  }, [$openApps]);

  return <>{result}</>;
}
