import { Box, Button, Typography } from "@mui/material";
import styles from "./styles.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomeFormikTextField from "../../components/shared/CustomeFormikTextField";
import { Link, useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../hooks/store-hooks";
import { login } from "../../store/slices/auth/actions";
import type { loginFormValues } from "../../utils/interfaces";

const initialValues: loginFormValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string()
    .required("Email is required")
    .email("Must be a valid email")
    .max(255, "Must be at most 255 characters"),

  password: Yup.string()
    .required("Password is required")
    .min(8, "Must be at least 8 characters")
    .max(255, "Must be at most 255 characters"),
});

export default function Login() {
  const { loginState } = useAppSelector((store) => store.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues,
      validationSchema,
      validateOnMount: false,
      onSubmit: async (values) => {
        const action = await dispatch(login(values));
        if (login.fulfilled.match(action)) {
          const { payload } = action;
          localStorage.setItem("access-token", payload.token);
          navigate("/");
        }
      },
    });

  return (
    <Box component={"section"} className={styles.login_page}>
      <Box
        component={"form"}
        className={styles.form_container}
        onSubmit={handleSubmit}
      >
        <Typography variant="h4" className={styles.form_header}>
          Log in
        </Typography>
        <CustomeFormikTextField
          label="Email"
          name="email"
          value={values.email}
          error={errors.email && touched.email ? true : false}
          placeholder="Enter your Email"
          helperText={errors.email && touched.email ? errors.email : " "}
          handleBlur={handleBlur}
          handleChange={handleChange}
        />
        <CustomeFormikTextField
          label="Password"
          name="password"
          value={values.password}
          error={errors.password && touched.password ? true : false}
          placeholder="Enter your Password"
          helperText={
            errors.password && touched.password ? errors.password : " "
          }
          handleBlur={handleBlur}
          handleChange={handleChange}
          type="password"
        />
        {loginState.error && (
          <Box component={"div"} className={styles.error_container}>
            <Typography variant="subtitle1">{loginState.error}</Typography>
          </Box>
        )}
        <Link to={"/auth/forgot-password"} className={styles.link}>
          Forgot Password?
        </Link>
        <Button
          variant="contained"
          fullWidth
          className={styles.submit_btn}
          color="warning"
          type="submit"
          loading={loginState.loading}
          loadingPosition="end"
        >
          Log in
        </Button>
      </Box>
    </Box>
  );
}
