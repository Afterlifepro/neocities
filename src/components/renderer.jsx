import { apps, openApps } from "../store";
import { useStore } from "@nanostores/react";
import Window from "./Window";

export default function Render() {
  const $openApps = useStore(openApps);

  let result = [];

  for (const [i, app] of Object.entries($openApps.apps)) {
    result.push(
      <Window title={app.title} layer={app.layer} id={i} key={i}>
        {app.content}
      </Window>
    );
  }

  return <>{result}</>;
}
