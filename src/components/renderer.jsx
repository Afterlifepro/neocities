import { useEffect } from "react";
import { apps, openApps } from "../store";
import { useStore } from "@nanostores/react";

export default function Render() {
  const $openApps = useStore(openApps);

  useEffect(() => {
    console.log("new app");
    apps.newApp = { title: "debug", content: "debug 1!!" };
  }, []);

  if ($openApps.length === 0) {
    return (
      <div>
        <ul>
          <li>No Apps Open</li>
        </ul>
      </div>
    );
  }

  return (
    <div>
      <ul>
        {$openApps.apps.map((app, i) => (
          <li key={i}>
            <i>
              {app.title} ({i})
            </i>
            <br />
            {app.content}
          </li>
        ))}
      </ul>
    </div>
  );
}
