import { Box, Typography } from "@mui/material";
import type { Slide } from "../../../utils/interfaces";
import styles from "./styles.module.css";
import { Link } from "react-router";

interface Props {
  item: Slide;
  currentSelectedId: string;
}

export default function SlideListItem({ item, currentSelectedId }: Props) {
  return (
    <Link to={`/slides/${item.id}`} className={styles.link}>
      <Box
        component={"div"}
        className={`${styles.item_container} ${
          item.id === currentSelectedId && styles.active
        }`}
      >
        <Typography variant="subtitle2" className={styles.item_name}>
          {item?.name}
        </Typography>
        <Box component={"div"} className={styles.image_body_container}>
          <img
            className={styles.slide_image}
            src={
              item?.screenshot?.path
                ? item?.screenshot?.path
                : "/placeholder.svg"
            }
          />
          <Box component={"div"} className={styles.rank}>
            {item?.rank > 10 ? item?.rank : `0${item?.rank}`}
          </Box>
        </Box>
      </Box>
    </Link>
  );
}
