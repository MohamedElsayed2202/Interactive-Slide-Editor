import { Box, Typography } from "@mui/material";
import type { Slide } from "../../../utils/interfaces";
import styles from "./styles.module.css";

interface Props {
  item: Slide;
  currentSelectedId: string;
}

export default function SlideListItem({ item, currentSelectedId }: Props) {
  return (
    <Box component={"div"} className={styles.item_container}>
      <Typography variant="subtitle2" className={styles.item_name}>
        {item?.name}
      </Typography>
      <Box component={"div"} className={styles.image_body_container}>
        
      </Box>
    </Box>
  );
}
