import { useEffect } from "react";
import { apps } from "../store";

export function NewAppTemplate({ title, id, size, children: content }) {
  useEffect(() => {
    apps.newTemplate = {
      title: title,
      content: content,
    };
  }, []);
  return <></>;
}
