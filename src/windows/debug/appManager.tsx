import { useEffect, useState } from "react";
import { apps, templateApps } from "../../store";
import { useStore } from "@nanostores/react";

export default function AppManager() {
  const $templateApps = useStore(templateApps);

  const [result, setResult] = useState<JSX.Element[]>([]);

  useEffect(() => {
    setResult([]);
    for (const [i, app] of Object.entries($templateApps)) {
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
                apps.newApp ={template: i, source: "app manager"};
              }}
            >
              Open
            </button>
          </td>
        </tr>,
      ]);
    }
  }, [$templateApps]);

  return (
    <table>
      <tbody>{result}</tbody>
    </table>
  );
}
