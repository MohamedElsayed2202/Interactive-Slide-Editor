import { Box } from "@mui/material";
import styles from "./styles.module.css";
import { useAppSelector } from "../../hooks/store-hooks";
import TextEditor from "./TextEditor";
import ImagesSection from "./ImagesSection";

export default function AddElementBody() {
  const { type } = useAppSelector((store) => store.slide);
  return (
    <Box component={"div"} className={styles.body_contianer}>
      {type === "image" && <ImagesSection />}
      {type === "text" && <TextEditor />}
    </Box>
  );
}
