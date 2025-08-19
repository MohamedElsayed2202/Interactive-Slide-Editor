import { Box } from "@mui/material";
import styles from "./styles.module.css";
import { useAppSelector } from "../../hooks/store-hooks";

export default function WorkArea() {
  const { backgrounds, elements, record } = useAppSelector(
    (store) => store.slide
  );
  const slideBackground = backgrounds.find((b) => b.slideId === record.id);
  const slideElements = elements.filter((e) => e.slideId === record.id);

  return (
    <Box component={"div"} className={styles.main_work_area}>
      {slideBackground && (
        <img src={slideBackground.path} className={styles.bgImage} />
      )}
    </Box>
  );
}
