import { Box, Button, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomeFormikTextField from "../../components/shared/CustomeFormikTextField";
import styles from "./styles.module.css";
import { useState, type FocusEvent } from "react";
import ForgetPasswordSuccessModal from "../../components/auth/ForgetPasswordSuccessModal";
import { useNavigate } from "react-router";

interface ForgetPasswordFormValues {
  password: string;
  confirmPassword: string;
}

const initialValues: ForgetPasswordFormValues = {
  password: "",
  confirmPassword: "",
};

const validationSchema = Yup.object({
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(64, "Password must be at most 64 characters")
    .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    .matches(/[a-z]/, "Must contain at least one lowercase letter")
    .matches(/[0-9]/, "Must contain at least one number")
    .matches(
      /[!@#$%^&*()_\+\-=\[\]{}|;:'",.<>\/?]/,
      "Must contain at least one special character"
    ),

  confirmPassword: Yup.string()
    .required("Confirmation password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

export default function ForgetPassword() {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched,
    setFieldTouched,
  } = useFormik({
    initialValues,
    validationSchema,
    validateOnMount: false,
    validateOnChange: true,
    validateOnBlur: false,
    onSubmit: (_) => {
      setOpenModal(true);
    },
  });
  const handleFocus = (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFieldTouched(e.target.name, true);
  };

  const handleClose = () => {
    setOpenModal(false);
    navigate("/auth/login")
  };

  return (
    <>
      <ForgetPasswordSuccessModal open={openModal} handleClose={handleClose} />
      <Box component={"section"} className={styles.forget_password_page}>
        <Box
          component={"form"}
          className={styles.form_container}
          onSubmit={handleSubmit}
        >
          <Typography variant="h4" className={styles.form_header}>
            Reset Password
          </Typography>
          <CustomeFormikTextField
            label="New Password"
            name="password"
            value={values.password}
            error={errors.password && touched.password ? true : false}
            placeholder="Enter your New Password"
            helperText={
              errors.password && touched.password ? errors.password : " "
            }
            handleBlur={handleBlur}
            handleChange={handleChange}
            handleFocus={handleFocus}
            type="password"
          />
          <CustomeFormikTextField
            label="Confirm New Password"
            name="confirmPassword"
            value={values.confirmPassword}
            error={
              errors.confirmPassword && touched.confirmPassword ? true : false
            }
            placeholder="Confirm your New Password"
            helperText={
              errors.confirmPassword && touched.confirmPassword
                ? errors.confirmPassword
                : " "
            }
            handleBlur={handleBlur}
            handleChange={handleChange}
            handleFocus={handleFocus}
            type="password"
          />
          <Button
            variant="contained"
            fullWidth
            className={styles.submit_btn}
            color="warning"
            type="submit"
          >
            Reset Password
          </Button>
        </Box>
      </Box>
    </>
  );
}
