import { Box, Button, Typography } from "@mui/material";
import styles from "./styles.module.css";
import { ArrowBackIos } from "@mui/icons-material";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../hooks/store-hooks";
import { saveUpdates } from "../../../store/slices/slides/actions";

interface Props {
  name: string;
}
export default function EditHead({ name }: Props) {
  const { backgrounds, elements, record } = useAppSelector(
    (store) => store.slide
  );
  const slideBackground = backgrounds.find((b) => b.slideId === record.id);
  const slideElements = elements.filter((e) => e.slideId === record.id);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleNavigateBack = () => {
    navigate("/");
  };
  const handleSave = () => {
    const newRecord = { ...record };
    newRecord.background = slideBackground ? slideBackground.path : null;
    newRecord.elements = slideElements;
    dispatch(saveUpdates({ id: newRecord.id, slide: newRecord }));
  };
  return (
    <Box component={"div"} className={styles.head_container}>
      <Button
        startIcon={<ArrowBackIos />}
        variant="contained"
        className={`${styles.btn} ${styles.back_btn}`}
        onClick={handleNavigateBack}
      >
        Back
      </Button>
      <Typography variant="h4" className={styles.name}>
        {name}
      </Typography>
      <Button
        startIcon={<img src="/save.png" />}
        size="large"
        variant="contained"
        className={`${styles.btn} ${styles.save_btn}`}
        onClick={handleSave}
      >
        Save
      </Button>
    </Box>
  );
}
