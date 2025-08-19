import { Box } from "@mui/material";
import styles from "./styles.module.css";
import AddElement from "./AddElement";
import WorkArea from "./WorkArea";

export default function EditContainer() {
  return (
    <Box component={"div"} className={styles.edit_container}>
      <Box component={"div"} className={styles.left_side}>
        <AddElement />
      </Box>
      <Box component={"div"} className={styles.right_side}>
        <WorkArea />
      </Box>
    </Box>
  );
}
