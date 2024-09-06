import { apps, openApps } from "../store";
import { useStore } from "@nanostores/react";

export default function Render() {
  const $openApps = useStore(openApps);

  if (Object.keys($openApps.apps).length === 0) {
    return (
      <div>
        <ul>
          <li>No Apps Open</li>
        </ul>
      </div>
    );
  }

  let result = []

  for (const [i, app] of Object.entries($openApps.apps)) {
    result.push(<li key={i}>
      <i>
        {app.title} ({i}) <button onClick={() => {apps.closeApp(i)}}>X</button> <button onClick={() => apps.focusApp(i)}>{app.layer}</button>
      </i>
      <br />
      {app.content}
    </li>)
  }

  return (
    <div>
      <ul>
        {result}
      </ul>
    </div>
  );
}
