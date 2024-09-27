import { useEffect } from "react";
import { apps } from "../../store";
import log from "../../logs";

export default function KillAll() {
  useEffect(() => {
    log("killing all apps", "red");
    new Array(apps.newIndex).fill("o").forEach((_, i) => {
      try {
        apps.closeApp(i);
      } catch (e) {
        if (!(e instanceof TypeError)) throw e;
        log("" + i, "red", "already closed\n\n", e, console.error);
      }
    });
  }, []);
  return (
    <div>
      Killing! Wait. Fuck. Something went wrong. Check the browser console
      please!
    </div>
  );
}
