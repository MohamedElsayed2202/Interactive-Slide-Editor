import { Box, Button, TextField, Typography } from "@mui/material";
import styles from "./styles.module.css";
import { useAppDispatch, useAppSelector } from "../../hooks/store-hooks";
import type { ChangeEvent, InputEvent } from "react";
import {
  resetElementToBeAdded,
  setElementToBeAddedValues,
  setElementValues,
  setIsAdding,
  setNewElement,
  setSelectedimage,
  setTypedText,
} from "../../store/slices/slides";
import { generateId } from "../../utils/functions";

const sx = {
  "& .MuiOutlinedInput-root": {
    "& fieldset": {},
    "&.Mui-focused fieldset": {
      borderColor: "transparent",
    },
    "& input": {
      fontFamily: " var(--font-poppins)",
      fontSize: "17px",
      height: "0.6em",
      borderRadius: "5px",
      backgroundColor: "#ffffff",
    },
  },
};

export default function AddElementFooter() {
  const {
    type,
    typedText,
    record,
    currentElementId,
    elements,
    elementToBeAdded,
    isAdding,
    selectedImage,
  } = useAppSelector((store) => store.slide);

  const element = elements.find((e) => e.id === currentElementId);
  const dispatch = useAppDispatch();
  const acceptOnlyNumbers = (e: InputEvent<HTMLDivElement>) => {
    if (!/^\d*$/.test(e.data)) {
      e.preventDefault();
    }
  };

  const handleAddElement = () => {
    if (type === "text") {
      dispatch(
        setNewElement({
          id: generateId(10),
          slideId: record.id,
          type: "text",
          content: typedText,
          x_position: elementToBeAdded.x_position,
          y_position: elementToBeAdded.y_position,
          z_index: elementToBeAdded.z_index,
        })
      );
      dispatch(setTypedText(""));
      dispatch(setIsAdding(false));
      dispatch(resetElementToBeAdded());
      return;
    }
    dispatch(
      setNewElement({
        id: selectedImage.id!.toString(),
        slideId: record.id,
        type: "image",
        content: selectedImage.path,
        x_position: elementToBeAdded.x_position,
        y_position: elementToBeAdded.y_position,
        z_index: elementToBeAdded.z_index,
        width: elementToBeAdded.width || 200,
        height: elementToBeAdded.height || 200,
      })
    );
    dispatch(setIsAdding(false));
    dispatch(resetElementToBeAdded());
    dispatch(setSelectedimage({ id: undefined, path: "" }));
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (isAdding)
      dispatch(
        setElementToBeAddedValues({
          name: e.target.name,
          value: e.target.value,
        })
      );

    dispatch(setElementValues({ name: e.target.name, value: e.target.value }));
  };

  return (
    <Box component={"div"} className={styles.add_contianer_footer}>
      <Box component={"div"} className={styles.add_footer_form}>
        <Typography variant="subtitle1" className={styles.form_lable}>
          Element controls
        </Typography>
        <Box component={"div"} className={styles.input_container}>
          {type === "image" && (
            <TextField
              value={
                isAdding
                  ? elementToBeAdded.width
                  : element && element.type === "image"
                  ? element!.width
                  : ""
              }
              name="width"
              className={styles.input}
              sx={sx}
              placeholder="width"
              inputMode="numeric"
              onBeforeInput={acceptOnlyNumbers}
              onChange={
                type === "image" || element?.type === "image"
                  ? handleChange
                  : () => {}
              }
            />
          )}
          {type === "image" && (
            <TextField
              name="height"
              value={
                isAdding
                  ? elementToBeAdded.height
                  : element && element.type === "image"
                  ? element!.height
                  : ""
              }
              className={styles.input}
              sx={sx}
              placeholder="height"
              inputMode="numeric"
              onBeforeInput={acceptOnlyNumbers}
              onChange={
                type === "image" || element?.type === "image"
                  ? handleChange
                  : () => {}
              }
            />
          )}
          <TextField
            name="x_position"
            value={
              isAdding
                ? elementToBeAdded.x_position
                : element
                ? element!.x_position
                : ""
            }
            className={styles.input}
            sx={sx}
            placeholder="X position"
            inputMode="numeric"
            onBeforeInput={acceptOnlyNumbers}
            onChange={handleChange}
          />
          <TextField
            name="y_position"
            value={
              isAdding
                ? elementToBeAdded.y_position
                : element
                ? element!.y_position
                : ""
            }
            className={styles.input}
            sx={sx}
            placeholder="Y position"
            inputMode="numeric"
            onBeforeInput={acceptOnlyNumbers}
            onChange={handleChange}
          />
          <TextField
            name="z_index"
            value={
              isAdding
                ? elementToBeAdded.z_index
                : element
                ? element!.z_index
                : ""
            }
            className={styles.input}
            sx={sx}
            placeholder="z-index"
            inputMode="numeric"
            onBeforeInput={acceptOnlyNumbers}
            onChange={handleChange}
          />
        </Box>
      </Box>
      <Button
        variant="contained"
        className={styles.add_footer_btn}
        disabled={!isAdding}
        onClick={handleAddElement}
      >
        Add
      </Button>
    </Box>
  );
}
