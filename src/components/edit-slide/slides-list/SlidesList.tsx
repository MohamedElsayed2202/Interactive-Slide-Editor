import { Box } from "@mui/material";
import { useAppSelector } from "../../../hooks/store-hooks";
import styles from "./styles.module.css";
import SlideListItem from "./SlideListItem";

export default function SlidesList() {
  const { record, records } = useAppSelector((store) => store.slide);
  return (
    <Box component={"div"} className={styles.list_container}>
      {records.map((item) => (
        <SlideListItem
          key={item.id}
          item={item}
          currentSelectedId={record?.id}
        />
      ))}
    </Box>
  );
}
