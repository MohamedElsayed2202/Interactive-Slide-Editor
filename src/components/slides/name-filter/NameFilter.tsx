import {
    Box,
    Button,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
} from "@mui/material";
import styles from "./styles.module.css";
import { useAppDispatch, useAppSelector } from "../../../hooks/store-hooks";
import { Clear, Search } from "@mui/icons-material";
import type { ChangeEvent } from "react";
import { setName } from "../../../store/slices/slides";
import { list } from "../../../store/slices/slides/actions";

export default function NameFilter() {
  const { filterData } = useAppSelector((store) => store.slide);
  const dispatch = useAppDispatch();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch(setName(e.target.value));
  };
  const handleSearch = () => {
    dispatch(list(filterData));
  };
  const handleClear = () => {
    dispatch(setName(""));
    dispatch(
      list({
        page: filterData.page,
        name: "",
      })
    );
  };
  return (
    <Box component={"div"} className={styles.filter_container}>
      <Typography variant="h4" className={styles.filter_lable}>
        Slide Name
      </Typography>
      <Box component={"div"} className={styles.input_container}>
        <TextField
          name="name"
          variant="outlined"
          placeholder="Brand Name"
          value={filterData.name}
          onChange={handleChange}
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                border: "2px solid #707070",
                borderRadius: "8px",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#707070",
              },
              "& input": {
                fontFamily: " var(--font-poppins)",
                fontSize: "17px",
                height: "0.7375em",
              },
              "& input::placeholder ": {
                fontStyle: "italic",
              },
            },
          }}
          slotProps={{
            input: {
              ...(filterData.name.length > 0 && {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClear} edge="end">
                      <Clear />
                    </IconButton>
                  </InputAdornment>
                ),
              }),
            },
          }}
        />
        <Button
          variant="contained"
          startIcon={<Search />}
          className={styles.btn}
          disabled={filterData.name.length === 0}
          onClick={handleSearch}
        >
          Search
        </Button>
      </Box>
    </Box>
  );
}
