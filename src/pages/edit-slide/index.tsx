import { Box } from "@mui/material";
import styles from "./styles.module.css";
import NameFilter from "../../components/slides/name-filter/NameFilter";
import SlidesList from "../../components/edit-slide/slides-list/SlidesList";
import EditHead from "../../components/slides/edit-head/EditHead";
import { useAppSelector } from "../../hooks/store-hooks";
import EditContainer from "../../components/edit-slide/EditContainer";
import Snapshot from "../../components/edit-slide/Snapshot";

export default function EditSlide() {
  const { record } = useAppSelector((store) => store.slide);
  return (
    <>
      <Snapshot />
      <Box component={"section"} className={styles.edit_slide_page}>
        <Box component={"div"} className={styles.left_section}>
          <EditHead name={record.name} />
          <EditContainer />
        </Box>
        <Box component={"div"} className={styles.right_section}>
          <NameFilter onlyIcon={true} />
          <SlidesList />
        </Box>
      </Box>
    </>
  );
}
