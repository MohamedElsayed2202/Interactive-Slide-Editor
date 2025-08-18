import { Outlet } from "react-router";
import styles from "./styles.module.css";
import { Box } from "@mui/material";

export default function AuthLayout() {
  return (
    <Box component={"main"} id={styles.auth_layout}>
      <Outlet />
    </Box>
  );
}
