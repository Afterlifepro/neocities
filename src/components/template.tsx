import { useEffect } from "react";
import { apps } from "../store";

export function NewAppTemplate(props: { title; id; icon?; children }) {
  useEffect(() => {
    apps.newTemplate = {
      title: props.title,
      content: props.children,
      icon: props.icon,
      key: props.id,
    };
  }, []);
  return <></>;
}
