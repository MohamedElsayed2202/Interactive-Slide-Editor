import { Outlet } from "react-router";
import styles from "./styles.module.css";
import { Box } from "@mui/material";
import NavBar from "../components/root-layout/NavBar";
import Spinner from "../components/shared/Spinner";

export default function RootLayout() {
  return (
    <>
      <Spinner />
      <Box component={"main"} id={styles.layout}>
        <NavBar />
        <Outlet />
      </Box>
    </>
  );
}
