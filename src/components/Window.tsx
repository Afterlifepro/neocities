import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { apps } from "../store";
import "./Window.scoped.css";

// function Goobers({ length }: { length: number }) {}

function Cap({ title, id, moveRef, icon }:{ title:string, id:number, moveRef: any, icon:string }) {
  return (
    <div ref={moveRef} className="cap">
      {icon ? <img src={icon} /> : null}
      <div>{title}</div>
      <button
        onClick={() => {
          apps.closeApp(id);
        }}
      >
        X
      </button>
    </div>
  );
}

export default function Window({
  title,
  layer,
  children: content,
  id,
  icon,
  capColour,
  width = 200,
  maxHeight = 400,
}: {
  title: any;
  layer: any;
  children: any;
  id: any;
  icon?: any;
  capColour?: any;
  width?: any;
  maxHeight?: any;
}) {
  // state for coords
  // ensure windows always spawn within the bounds of the window
  const [posX, setPosX] = useState(
    Math.floor(Math.max(Math.random() * (window.innerWidth - width), 0))
  );
  const [posY, setPosY] = useState(
    Math.floor(Math.max(Math.random() * (window.innerHeight - maxHeight), 0))
  );

  const origin = useRef({ x: 0, y: 0 });

  // object thats dragged
  const draggableRef = useRef(null);
  // is the object being dragged
  const dragging = useRef(false);

  // when clicked make it drag
  const onMouseDown = useCallback((e: { offsetX: any; offsetY: any; }) => {
    dragging.current = true;
    apps.focusApp(id)
    origin.current = { x: e.offsetX, y: e.offsetY };
  }, []);

  // when the mouse goes up stop dragging it
  const onMouseUp = useCallback(() => (dragging.current = false), []);

  // when you move the mouse update the coords if its being dragged
  const onMouseMove = useCallback((e: { clientX: number; clientY: number; }) => {
    if (dragging.current) {
      setPosX(e.clientX - origin.current.x); // - origin.current.x);
      setPosY(e.clientY - origin.current.y); // - origin.current.y);
    }
  }, []);

  // the first time this component renders run this code
  // add the event listeners
  // the window tracks mouse up and move becuase it doesnt do anything when clicked
  // the cap tracks being clicked bc it needs to be per component
  useEffect(() => {
    const draggy = draggableRef.current;

    window.addEventListener("pointerup", onMouseUp);
    draggy.addEventListener("pointerdown", onMouseDown);
    window.addEventListener("pointermove", onMouseMove);

    // this is the cleanup function
    return () => {
      window.removeEventListener("pointerup", onMouseUp);
      draggy.removeEventListener("pointerdown", onMouseDown);
      window.removeEventListener("pointermove", onMouseMove);
    };
  }, [onMouseUp, onMouseDown, onMouseMove, draggableRef]);

  return (
    <div
      className="window"
      style={
        {
          "--cap-colour": capColour, // ?? null,
          "--cap-text-colour": "white", // ?? null,
          "--x": posX + "px",
          "--y": posY + "px",
          "--width": width / 10 + "rem",
          "--max-height": maxHeight / 10 + "rem",
          "--layer": layer,
        } as CSSProperties & { [key: `--${string}`]: any }
      }
      onMouseDown={() => apps.focusApp(id)}
    >
      <Cap moveRef={draggableRef} title={title} id={id} icon={icon} />
      <div className="winContent">{content}</div>
    </div>
  );
}
