import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import { useAppSelector } from "../../../hooks/store-hooks";
import styles from "./styles.module.css";
import { Link } from "react-router";

export default function SlidesTable() {
  const { records } = useAppSelector((store) => store.slide);
  return (
    <TableContainer component={Paper} className={styles.table_container}>
      <Table className={styles.table}>
        <TableHead>
          <TableRow>
            <TableCell className={styles.table_head_cell}>Slide name</TableCell>
            <TableCell className={styles.table_head_cell}>Type</TableCell>
            <TableCell className={styles.table_head_cell}>Status</TableCell>
            <TableCell className={styles.table_head_cell}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {records.map((row) => (
            <TableRow key={row.id}>
              <TableCell className={styles.table_body_cell}>
                {row.name}
              </TableCell>
              <TableCell className={styles.table_body_cell}>
                {row.type}
              </TableCell>
              <TableCell className={styles.table_body_cell}>
                {row.status}
              </TableCell>
              <TableCell
                className={`${styles.table_body_cell} ${styles.table_edit_cell}`}
              >
                <Link to={`/slides/${row.id}`}>
                  <img src="/edit-icon.png" alt="edit icon" />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
