import ResponsivePagination from "react-responsive-pagination";
import { useAppDispatch, useAppSelector } from "../../../hooks/store-hooks";
import { setPage } from "../../../store/slices/slides";
import { list } from "../../../store/slices/slides/actions";
import styles from "./styles.module.css";
import "react-responsive-pagination/themes/classic.css";

export default function Pagination() {
  const { filterData, totalPages } = useAppSelector((store) => store.slide);
  const dispatch = useAppDispatch();
  const handleChangePage = (number: number) => {
    dispatch(setPage(number));
    dispatch(
      list({
        page: number,
        name: filterData.name,
      })
    );
  };
  return (
    <ResponsivePagination
      current={filterData.page}
      total={totalPages}
      onPageChange={handleChangePage}
      previousLabel="Previous"
      previousClassName={styles.pagination_btns}
      nextClassName={styles.pagination_btns}
      nextLabel="Next"
      activeItemClassName={styles.active_item}
    />
  );
}
