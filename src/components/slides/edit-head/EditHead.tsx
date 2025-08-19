import { Box, Button, Typography } from "@mui/material";
import styles from "./styles.module.css";
import { ArrowBackIos } from "@mui/icons-material";
import { useNavigate } from "react-router";

interface Props {
  name: string;
}
export default function EditHead({ name }: Props) {
  const navigate = useNavigate();
  const handleNavigateBack = () => {
    navigate("/");
  };
  return (
    <Box component={"div"} className={styles.head_container}>
      <Button
        startIcon={<ArrowBackIos />}
        variant="contained"
        className={`${styles.btn} ${styles.back_btn}`}
        onClick={handleNavigateBack}
      >
        Back
      </Button>
      <Typography variant="h4" className={styles.name}>
        {name}
      </Typography>
      <Button
        startIcon={<img src="/save.png" />}
        size="large"
        variant="contained"
        className={`${styles.btn} ${styles.save_btn}`}
      >
        Save
      </Button>
    </Box>
  );
}
