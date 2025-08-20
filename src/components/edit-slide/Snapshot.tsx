import { Box, Modal, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/store-hooks";
import { setOpenModal } from "../../store/slices/slides";
import styles from "./styles.module.css";

export default function Snapshot() {
  const { record, openModal } = useAppSelector((store) => store.slide);
  const { background, elements = [] } = record;
  const dispatch = useAppDispatch();
  const handleClose = () => {
    dispatch(setOpenModal());
  };
  return (
    <Modal open={openModal} onClose={handleClose}>
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
        }}
      >
        <Box component={"div"} className={styles.modal_content_container}>
          <Typography variant="h4" className={styles.modal_content_header}>
            Preview screenshot
          </Typography>
          <Box component={"div"} className={styles.modal_content_background}>
            <img src={background!} />
            {elements.map((element) =>
              element.type === "image" ? (
                <Box
                  key={element.id}
                  component={"div"}
                  className={styles.modal_content_element}
                  style={{
                    zIndex: element.z_index,
                    top: `${element.y_position}px`,
                    left: `${element.x_position}px`,
                    width: `${element.width}px`,
                    height: `${element.height}px`,
                  }}
                >
                  <img src={element.content} />
                </Box>
              ) : (
                <Box
                  key={element.id}
                  component={"div"}
                  className={styles.modal_content_element}
                  dangerouslySetInnerHTML={{ __html: element.content }}
                  style={{
                    zIndex: element.z_index,
                    top: `${element.y_position}px`,
                    left: `${element.x_position}px`,
                  }}
                />
              )
            )}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
