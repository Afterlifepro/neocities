import { apps, openApps, type app } from "../store";
import { useStore } from "@nanostores/react";
import { useEffect, useState, type ReactElement } from "react";

import "./taskbar.scoped.css";

function App(app: Omit<app, "content" | "layer">) {
  return (
    <div
      className="taskbar-app"
      onClick={() => apps.focusApp(app.index)}
      style={{ cursor: "pointer" }}
    >
      <div>{app.icon ? <img src={app.icon} alt="" /> : null}</div>
      <div>{app.title}</div>
    </div>
  );
}

export default function Taskbar() {
  const $openApps = useStore(openApps);

  const [result, setResult] = useState<ReactElement[]>([]);

  useEffect(() => {
    setResult([]);
    for (const [i, app] of Object.entries($openApps.apps)) {
      setResult((results) => [
        ...results,
        <App
          title={app.title}
          icon={app.icon}
          key={parseInt(i)}
          index={app.index}
          source={app.source}
        />,
      ]);
    }
  }, [$openApps]);

  return <div className="taskbar">{result}</div>;
}
