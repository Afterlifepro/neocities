import { openApps } from "../store";
import { useStore } from "@nanostores/react";
import Window from "./Window";
import { useEffect, useState } from "react";

export default function Render() {
  const $openApps = useStore(openApps);

  let [result, setResult] = useState([]);

  useEffect(() => {
    setResult([]);
    for (const [i, app] of Object.entries($openApps.apps)) {
      setResult((results) => [
        ...results,
        <Window
          title={app.title}
          layer={app.layer}
          icon={app.icon}
          id={i}
          key={i}
        >
          {app.content}
        </Window>,
      ]);
    }
  }, [$openApps]);

  return <>{result}</>;
}
