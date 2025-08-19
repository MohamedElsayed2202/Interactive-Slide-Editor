import { Box } from "@mui/material";
import styles from "./styles.module.css";
import AddElementHeader from "./AddElementHeader";
import AddElementFooter from "./AddElementFooter";
import AddElementBody from "./AddElementBody";

export default function AddElement() {
  return (
    <Box component={"div"} className={styles.add_contianer}>
      <AddElementHeader />
      <AddElementBody />
      <AddElementFooter />
    </Box>
  );
}
