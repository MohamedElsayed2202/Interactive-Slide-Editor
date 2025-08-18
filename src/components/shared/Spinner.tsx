import { Backdrop, CircularProgress } from "@mui/material";
import { useAppSelector } from "../../hooks/store-hooks";

export default function Spinner() {
  const { listState, getState: getByIdState } = useAppSelector(
    (store) => store.slide
  );
  const { getState } = useAppSelector((store) => store.auth);
  return (
    <Backdrop
      open={listState.loading || getState.loading || getByIdState.loading}
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
