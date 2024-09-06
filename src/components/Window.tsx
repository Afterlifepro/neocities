import { useCallback, useEffect, useRef, useState } from "react";
import { apps } from "../store";

function Cap({ title, id, moveRef }) {
  return (
    <div
      ref={moveRef}
      className="cap"
      style={{ background: "blue", color: "white" }}
    >
      {title}{" "}
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
  size = 200,
}) {
  // state for coords
  const coordsRange = Math.min(
    Math.min(window.innerWidth, window.innerHeight) * 0.8,
    600
  );
  const [posX, setPosX] = useState(
    Math.floor(Math.random() * coordsRange + 50)
  );
  const [posY, setPosY] = useState(
    Math.floor(Math.random() * coordsRange + 50)
  );

  // object thats dragged
  const draggableRef = useRef(null);
  // is dragging?
  const dragging = useRef(false);

  // when clicked make it drag
  const onMouseDown = useCallback((e) => {
    if (draggableRef.current) {
      dragging.current = true;
    }
  }, []);

  // make it not drag
  const onMouseUp = useCallback((e) => {
    if (dragging.current) {
      dragging.current = false;
    }
  }, []);

  // when you move the mouse update the coords if its being dragged
  const onMouseMove = useCallback((e) => {
    if (dragging.current) {
      setPosX((pos) => pos + e.movementX);
      setPosY((pos) => pos + e.movementY);
    }
  }, []);

  // the first time this component renders run this code
  // add the event listeners
  // the window tracks mouse up and move becuase it doesnt do anything when clicked
  // the cap tracks being clicked bc it needs to be per component
  useEffect(() => {
    let thisElement = draggableRef.current;

    window.addEventListener("pointerup", onMouseUp);
    thisElement.addEventListener("pointerdown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);

    // this is the cleanup function
    return () => {
      window.removeEventListener("pointerup", onMouseUp);
      thisElement.removeEventListener("pointerdown", onMouseDown);
      window.removeEventListener("pointermove", onMouseMove);
    };
  }, [onMouseUp, onMouseDown, onMouseMove, id, draggableRef]);

  return (
    <div
      className="window"
      style={{
        width: size + "px",
        zIndex: layer,
        top: posY + "px",
        left: posX + "px",
        position: "absolute",
        background: "white"
      }}
      onMouseDown={() => apps.focusApp(id)}
    >
      <Cap moveRef={draggableRef} title={title} id={id} />
      {content}
    </div>
  );
}
