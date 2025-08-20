import { Box } from "@mui/material";
import { Rnd, type DraggableData } from "react-rnd";
import styles from "./styles.module.css";
import { useAppDispatch } from "../../hooks/store-hooks";
import { useRef } from "react";
import type { Element } from "../../utils/interfaces";
import {
    setCurrentElementId,
    setElementCordinates,
} from "../../store/slices/slides";
import type { DraggableEvent } from "react-draggable";

interface Props {
  element: Element;
  handleContextMenu: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    item: Element
  ) => void;
}

export default function TextDraggedItem({ element, handleContextMenu }: Props) {
  const dispatch = useAppDispatch();
  const dragRef = useRef<HTMLDivElement>(null);
  const handleDragStart = () => {
    dispatch(setCurrentElementId(element.id));
  };
  const handleDrag = (e: DraggableEvent, data: DraggableData) => {
    dispatch(setElementCordinates({ id: element.id, x: data.x, y: data.y }));
  };

  return (
    <Rnd
      bounds="parent"
      position={{ x: element.x_position, y: element.y_position }}
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      style={{ zIndex: element.z_index }}
    >
      <Box
        component={"div"}
        className={styles.element}
        ref={dragRef}
        dangerouslySetInnerHTML={{ __html: element.content }}
        onContextMenu={(e) => handleContextMenu(e, element)}
      />
    </Rnd>
  );
}
