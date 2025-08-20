import { Box, ButtonBase, Typography } from "@mui/material";
import styles from "./styles.module.css";
import { useAppDispatch, useAppSelector } from "../../hooks/store-hooks";
import { logout } from "../../store/slices/auth/actions";
import { useNavigate } from "react-router";
export default function NavBar() {
  const { user } = useAppSelector((store) => store.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    const action = await dispatch(logout());
    if (logout.fulfilled.match(action)) {
      localStorage.removeItem("access-token");
      navigate("/auth/login", { replace: true });
    }
  };
  return (
    <Box component={"nav"} className={styles.nav}>
      <Box component={"div"} className={styles.user_container}>
        <img src="/avatar.png" alt="user image" />
        <Box component={"div"} className={styles.user_details_container}>
          <Typography variant="subtitle1">{user?.name}</Typography>
          <Typography variant="subtitle2">{user?.role?.name}</Typography>
        </Box>
        <ButtonBase onClick={handleLogout}>
          <img src="/logout.png" alt="logout image" />
        </ButtonBase>
      </Box>
    </Box>
  );
}
