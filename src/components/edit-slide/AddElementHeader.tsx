import { Box, Button, Typography } from "@mui/material";
import styles from "./styles.module.css";
import { useAppDispatch, useAppSelector } from "../../hooks/store-hooks";
import { setType } from "../../store/slices/slides";

export default function AddElementHeader() {
  const { type } = useAppSelector((store) => store.slide);
  const dispatch = useAppDispatch();
  const handleChangeType = (type: "text" | "image") => {
    dispatch(setType(type));
  };
  return (
    <Box component={"div"} className={styles.add_contianer_header}>
      <Typography variant="h4" className={styles.label}>
        Add Element
      </Typography>
      <Box component={"div"} className={styles.switches_container}>
        <Button
          variant="contained"
          className={`${styles.btns} ${type === "text" && styles.active}`}
          onClick={() => handleChangeType("text")}
        >
          Text
        </Button>
        <Button
          variant="contained"
          className={`${styles.btns} ${type === "image" && styles.active}`}
          onClick={() => handleChangeType("image")}
        >
          Image
        </Button>
      </Box>
    </Box>
  );
}
