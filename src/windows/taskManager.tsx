import { useEffect, useState } from "react";
import { apps, openApps } from "../store";
import { useStore } from "@nanostores/react";

export default function TaskManager() {
  const $openApps = useStore(openApps);

  let [result, setResult] = useState([]);

  useEffect(() => {
    setResult([])
    for (const [i, app] of Object.entries($openApps.apps)) {
      setResult((results) => [
        ...results,
        <tr key={i}>
          <th>{app.title}</th>
          <td>Icon</td>
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
