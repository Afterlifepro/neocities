import { useEffect } from "react";
import { apps } from "../store";

export default function NewAppTemplate(props: {
  title;
  id;
  icon?;
  width?;
  maxHeight?;
  children;
}) {
  useEffect(() => {
    apps.newTemplate = {
      title: props.title,
      content: props.children,
      icon: props.icon,
      width: props.width,
      maxHeight: props.maxHeight,
      key: props.id,
    };
  }, []);
  return <></>;
}
