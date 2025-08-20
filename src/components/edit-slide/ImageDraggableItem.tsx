import { Box } from "@mui/material";
import { Rnd, type DraggableData } from "react-rnd";
import styles from "./styles.module.css";
import { useAppDispatch } from "../../hooks/store-hooks";
import { useRef } from "react";
import type { Element } from "../../utils/interfaces";
import {
    setCurrentElementId,
    setElementCordinates,
    setElementSize,
} from "../../store/slices/slides";
import type { DraggableEvent } from "react-draggable";

interface Props {
  element: Element;
  handleContextMenu: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, item: Element) => void;
}

export default function ImageDraggableItem({
  element,
  handleContextMenu,
}: Props) {
  const dispatch = useAppDispatch();
  const dragRef = useRef<HTMLDivElement>(null);
  const handleDragStart = () => {
    dispatch(setCurrentElementId(element.id));
  };
  const handleDrag = (e: DraggableEvent, data: DraggableData) => {
    dispatch(setElementCordinates({ id: element.id, x: data.x, y: data.y }));
  };
  const handleResize = (
    e: MouseEvent | TouchEvent,
    direction: any,
    ref: HTMLElement
  ) => {
    dispatch(
      setElementSize({
        id: element.id,
        width: parseInt(ref.style.width),
        height: parseInt(ref.style.height),
      })
    );
  };
  return (
    <Rnd
      bounds="parent"
      position={{ x: element.x_position, y: element.y_position }}
      size={{ width: element.width!, height: element.height! }}
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onResize={handleResize}
      style={{ zIndex: element.z_index }}
    >
      <Box
        component={"div"}
        className={styles.element}
        ref={dragRef}
        onContextMenu={(e) => handleContextMenu(e, element)}
      >
        <img
          src={element.content}
          width={`${element.width}px`}
          height={`${element.height}px`}
        />
      </Box>
    </Rnd>
  );
}
