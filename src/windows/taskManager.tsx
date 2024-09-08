import { apps, openApps } from "../store";
import { useStore } from "@nanostores/react";

export default function TaskManager() {
  const $openApps = useStore(openApps);

  let result = [];

  for (const [i, app] of Object.entries($openApps.apps)) {
    result.push(
      <tr><th>{app.title}</th><td>Icon</td><button
      onClick={() => {
        apps.closeApp(i);
      }}
    >
      X
    </button></tr>
    );
  }

  return <table>{result}</table>;
}
