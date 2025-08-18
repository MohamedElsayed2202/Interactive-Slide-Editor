import { Box } from "@mui/material";
import styles from "./styles.module.css";
import NameFilter from "../../components/slides/name-filter/NameFilter";
import SlidesList from "../../components/edit-slide/slides-list/SlidesList";

export default function EditSlide() {
  return (
    <Box component={"section"} className={styles.edit_slide_page}>
      <Box component={"div"} className={styles.left_section}></Box>
      <Box component={"div"} className={styles.right_section}>
        <NameFilter />
        <SlidesList />
      </Box>
    </Box>
  );
}
