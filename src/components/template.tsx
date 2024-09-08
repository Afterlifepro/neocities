import { useEffect } from "react";
import { apps } from "../store";

export function NewAppTemplate({ title, id, icon, children: content }) {
  useEffect(() => {
    apps.newTemplate = {
      title: title,
      content: content,
      icon: icon,
      key: id,
    };
  }, []);
  return <></>;
}
