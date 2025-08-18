import { Box, Button, Modal, Typography } from "@mui/material";

interface Props {
  open: boolean;
  handleClose: () => void;
}

export default function ForgetPasswordSuccessModal(props: Props) {
  const { open, handleClose } = props;
  return (
    <Modal open={open}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          p: 4,
          borderRadius: 2,
          boxShadow: 24,
          width: { xs: "90%", sm: 400 },
        }}
      >
        <Typography variant="h5" mb={2}>
          Password Reset Successfully
        </Typography>
        <Typography mb={3}>
          Your password has been updated. You can now log in with your new
          password.
        </Typography>
        <Button
          fullWidth
          variant="contained"
          color="success"
          onClick={handleClose}
        >
          OK
        </Button>
      </Box>
    </Modal>
  );
}
