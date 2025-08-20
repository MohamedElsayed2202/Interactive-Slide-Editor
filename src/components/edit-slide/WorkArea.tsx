import { Box, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import styles from "./styles.module.css";
import { useAppDispatch, useAppSelector } from "../../hooks/store-hooks";
import ImageDraggableItem from "./ImageDraggableItem";
import TextDraggedItem from "./TextDraggedItem";
import { useState } from "react";
import { ContentCopy, ContentPaste, Delete } from "@mui/icons-material";
import type { Element } from "../../utils/interfaces";
import { setCopiedElement } from "../../store/slices/clipboard";
import { deleteElement, setNewElement } from "../../store/slices/slides";
import { generateId } from "../../utils/functions";

export default function WorkArea() {
  const [anchorPosition, setAnchorPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const { backgrounds, elements, record } = useAppSelector(
    (store) => store.slide
  );
  const { copiedElement } = useAppSelector((store) => store.clipboard);
  const dispatch = useAppDispatch();
  const slideBackground = backgrounds.find((b) => b.slideId === record.id);
  const slideElements = elements.filter((e) => e.slideId === record.id);
  const [selectedId, setSelectedId] = useState<string>("");

  const handleContextMenu = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    item: Element
  ) => {
    event.preventDefault();
    setAnchorPosition({ top: event.clientY - 4, left: event.clientX - 2 });
    setSelectedId(item.id);
  };

  const handleClose = () => {
    setAnchorPosition(null);
    setSelectedId("");
  };

  const handleCopy = () => {
    const element = slideElements.find((e) => e.id === selectedId);
    if (element) {
      dispatch(setCopiedElement(element));
    }
    handleClose();
  };

  const handlePaste = () => {
    dispatch(
      setNewElement({
        id: generateId(12),
        slideId: copiedElement.slideId,
        type: copiedElement.type,
        content: copiedElement.content,
        x_position: copiedElement.x_position + 10,
        y_position: copiedElement.y_position + 10,
        z_index: copiedElement.z_index,
        width: copiedElement.width,
        height: copiedElement.height,
      })
    );
    dispatch(setCopiedElement({} as Element));
    handleClose();
  };

  const handleDelete = () => {
    dispatch(deleteElement(selectedId));
    dispatch(setCopiedElement({} as Element));
    handleClose();
  };

  return (
    <>
      <Menu
        open={Boolean(anchorPosition)}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={anchorPosition ?? undefined}
      >
        <MenuItem onClick={handleCopy}>
          <ListItemIcon>
            <ContentCopy fontSize="small" />
          </ListItemIcon>
          <ListItemText>Copy</ListItemText>
        </MenuItem>

        <MenuItem onClick={handlePaste}>
          <ListItemIcon>
            <ContentPaste fontSize="small" />
          </ListItemIcon>
          <ListItemText>Paste</ListItemText>
        </MenuItem>

        <MenuItem onClick={handleDelete}>
          <ListItemIcon>
            <Delete fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
      <Box component={"div"} className={styles.main_work_area}>
        {slideBackground && (
          <img src={slideBackground.path} className={styles.bgImage} />
        )}
        <Box
          component="div"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: "100%",
            height: "100%",
          }}
        >
          {slideElements.map((element) =>
            element.type === "image" ? (
              <ImageDraggableItem
                key={element.id}
                element={element}
                handleContextMenu={(e) => handleContextMenu(e, element)}
              />
            ) : (
              <TextDraggedItem
                key={element.id}
                element={element}
                handleContextMenu={(e) => handleContextMenu(e, element)}
              />
            )
          )}
        </Box>
      </Box>
    </>
  );
}
