import { Box, Button, TextField, Typography } from "@mui/material";
import styles from "./styles.module.css";
import { useAppDispatch, useAppSelector } from "../../hooks/store-hooks";
import type { InputEvent } from "react";
import { setNewElement, setTypedText } from "../../store/slices/slides";
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
  const { type, typedText, record } = useAppSelector((store) => store.slide);
  const dispatch = useAppDispatch();
  const acceptOnlyNumbers = (e: InputEvent<HTMLDivElement>) => {
    if (!/^\d*$/.test(e.data)) {
      e.preventDefault();
    }
  };

  const handleAddTextElement = () => {
    dispatch(
      setNewElement({
        id: generateId(10),
        slideId: record.id,
        type: "text",
        content: typedText,
        x_position: 20,
        y_position: 70,
        z_index: 50,
      })
    );
    dispatch(setTypedText(""));
  };
  return (
    <Box component={"div"} className={styles.add_contianer_footer}>
      <Box component={"div"} className={styles.add_footer_form}>
        <Typography variant="subtitle1" className={styles.form_lable}>
          Element controls
        </Typography>
        <Box component={"div"} className={styles.input_container}>
          <TextField
            className={styles.input}
            sx={sx}
            placeholder="width"
            inputMode="numeric"
            onBeforeInput={acceptOnlyNumbers}
          />
          <TextField className={styles.input} sx={sx} placeholder="heigh" />
          <TextField
            className={styles.input}
            sx={sx}
            placeholder="X position"
            inputMode="numeric"
            onBeforeInput={acceptOnlyNumbers}
          />
          <TextField
            className={styles.input}
            sx={sx}
            placeholder="Y position"
            inputMode="numeric"
            onBeforeInput={acceptOnlyNumbers}
          />
          <TextField
            className={styles.input}
            sx={sx}
            placeholder="z-index"
            inputMode="numeric"
            onBeforeInput={acceptOnlyNumbers}
          />
        </Box>
      </Box>
      {type === "text" && (
        <Button
          variant="contained"
          className={styles.add_footer_btn}
          disabled={type === "text" && typedText !== "" ? false : true}
          onClick={handleAddTextElement}
        >
          Add
        </Button>
      )}
    </Box>
  );
}
