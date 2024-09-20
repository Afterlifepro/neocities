import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { apps } from "../store";
import "./Window.scoped.css";

import goobersdef from "./goobersdef";

function Goobers({ columns }: { columns: number }) {
  const [goobers, setGoobers] = useState<JSX.Element[]>([]);
  useEffect(() => {
    setGoobers([]);
    for (let i = 0; i < columns; i++) {
      if (Math.random() < 0.65) {
        setGoobers((old) => [...old, <div className="goober clear" key={i} />]);
        continue;
      }
      const gooberIndex = Math.floor(Math.random() * goobersdef.length);
      const gooberFileIndex = Math.floor(
        Math.random() * goobersdef[gooberIndex].files.length
      );
      const gooberFile = goobersdef[gooberIndex].files[gooberFileIndex];
      const gooberTag = goobersdef[gooberIndex].tags;
      const rng = Math.random() < 0.5;

      const gooberTagsParsed = [
        ...gooberTag.map((tag) => {
          if (tag === "flip") {
            return rng ? "flip" : "";
          } else {
            return tag;
          }
        }),
      ];

      const gooberWidth = Math.ceil(gooberFile.width / 8);
      const gooberHeight = Math.ceil(gooberFile.height / 8);

      i += gooberWidth - 1;
      if (i < columns)
        setGoobers((results) => [
          ...results,
          <img
            src={gooberFile.src}
            alt=""
            className={"goober " + gooberTagsParsed.join(" ")}
            style={{
              gridColumn: `span ${gooberWidth}`,
              aspectRatio: `${gooberWidth}/${gooberHeight}`,
            }}
            key={i}
          />,
        ]);
    }
  }, [columns]);
  return (
    <div
      className="goobers-container"
      style={{ "--col": columns } as CSSProperties & { "--col": number }}
    >
      {goobers}
    </div>
  );
}

function Cap({
  title,
  id,
  moveRef,
  icon,
}: {
  title: string;
  id: number;
  moveRef: any;
  icon: string;
}) {
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
  const onMouseDown = useCallback((e: { offsetX: any; offsetY: any }) => {
    dragging.current = true;
    apps.focusApp(id);
    origin.current = { x: e.offsetX, y: e.offsetY };
  }, []);

  // when the mouse goes up stop dragging it
  const onMouseUp = useCallback(() => (dragging.current = false), []);

  // when you move the mouse update the coords if its being dragged
  const onMouseMove = useCallback((e: { clientX: number; clientY: number }) => {
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
      <Goobers columns={Math.floor((width - 10) / 32)} /> {/* 32 is the goober width and height, and 10px is the padding total */}
      <Cap moveRef={draggableRef} title={title} id={id} icon={icon} />
      <div className="winContent">{content}</div>
    </div>
  );
}
