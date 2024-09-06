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
  width = 200,
  maxHeight = 200,
}) {
  // state for coords
  // ensure windows always spawn within the bounds of the window
  const [posX, setPosX] = useState(
    Math.floor(Math.max(Math.random() * (window.innerWidth - width), 0))
  );
  const [posY, setPosY] = useState(
    Math.floor(Math.max(Math.random() * (window.innerHeight - maxHeight), 0))
  );

  // object thats dragged
  const draggableRef = useRef(null);
  // is the object being dragged
  const dragging = useRef(false);

  // when clicked make it drag
  const onMouseDown = useCallback((e) => (dragging.current = true), []);

  // when the mouse goes up stop dragging it
  const onMouseUp = useCallback((e) => (dragging.current = false), []);

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
    let draggy = draggableRef.current;

    window.addEventListener("pointerup", onMouseUp);
    draggy.addEventListener("pointerdown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);

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
      style={{
        width: width + "px",
        maxHeight: maxHeight + "px",
        zIndex: layer,
        top: posY + "px",
        left: posX + "px",
        position: "absolute",
        background: "white",
      }}
      onMouseDown={() => apps.focusApp(id)}
    >
      <Cap moveRef={draggableRef} title={title} id={id} />
      {content}
    </div>
  );
}
