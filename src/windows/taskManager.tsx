import { useEffect, useState } from "react";
import { apps, openApps } from "../store";
import { useStore } from "@nanostores/react";

export default function TaskManager() {
  const $openApps = useStore(openApps);

  const [result, setResult] = useState<JSX.Element[]>([]);

  useEffect(() => {
    setResult([]);
    for (const [i, app] of Object.entries($openApps.apps)) {
      setResult((results) => [
        ...results,
        <tr key={i}>
          <th>{app.title}</th>
          <td style={{ width: "2rem", height: "2rem" }}>
            <img
              src={app.icon}
              alt=""
              style={{ width: "100%", height: "100%" }}
            />
          </td>
          <td>
            <button
              onClick={() => {
                apps.closeApp(parseInt(i));
              }}
            >
              X
            </button>
          </td>
        </tr>,
      ]);
    }
  }, [$openApps]);

  return (
    <table>
      <tbody>{result}</tbody>
    </table>
  );
}
