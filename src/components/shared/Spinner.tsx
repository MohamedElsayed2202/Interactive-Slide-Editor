import { Backdrop, CircularProgress } from "@mui/material";
import { useAppSelector } from "../../hooks/store-hooks";

export default function Spinner() {
  const {
    listState,
    getState: getByIdState,
    getMediaState,
    addMediaState,
    saveState,
  } = useAppSelector((store) => store.slide);
  const { getState } = useAppSelector((store) => store.auth);
  return (
    <Backdrop
      open={
        listState.loading ||
        getState.loading ||
        getByIdState.loading ||
        getMediaState.loading ||
        addMediaState.loading ||
        saveState.loading
      }
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
