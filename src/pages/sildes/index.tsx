import { Box, Typography } from "@mui/material";
import styles from "./styles.module.css";
import NameFilter from "../../components/slides/name-filter/NameFilter";
import SlidesTable from "../../components/slides/table/SlidesTable";
import Pagination from "../../components/slides/pagination/Pagination";

function Slides() {
  return (
    <Box component={"section"} className={styles.slides_page}>
      <Typography variant="h4" className={styles.page_name}>
        Slides
      </Typography>
      <NameFilter />
      <Box component={"div"} className={styles.table_container}>
        <SlidesTable />
        <Pagination />
      </Box>
    </Box>
  );
}

export default Slides;
