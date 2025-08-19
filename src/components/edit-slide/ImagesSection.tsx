import { Box, Button } from "@mui/material";
import styles from "./styles.module.css";
import { useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/store-hooks";
import { addMedia } from "../../store/slices/slides/actions";
import type { Background, Element, Media } from "../../utils/interfaces";
import { setNewBackground, setNewElement } from "../../store/slices/slides";

export default function ImagesSection() {
  const { record, media } = useAppSelector((store) => store.slide);
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const handleClick = () => {
    inputRef.current?.click();
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filesUploaded = event.target.files;
    if (filesUploaded?.length === 0) {
      return;
    }
    const formData = new FormData();
    formData.append("type", "image");
    for (const file of filesUploaded!) {
      formData.append("media", file);
    }
    dispatch(
      addMedia({
        id: record.id,
        body: formData,
      })
    );
  };
  const handleAddToSlide = (media: Media) => {
    const element: Element = {
      id: media.id.toString(),
      slideId: record.id,
      type: "image",
      content: media.path,
      x_position: 0,
      y_position: 0,
      z_index: 0,
    };
    dispatch(setNewElement(element));
  };
  const handleAddAsBackground = (media: Media) => {
    const background: Background = {
      slideId: record.id,
      path: media.path,
    };
    dispatch(setNewBackground(background));
  };
  return (
    <Box component="div" className={styles.images_section}>
      <Box component={"div"} className={styles.input_image_container}>
        <input
          type="file"
          multiple
          ref={inputRef}
          accept="image/*"
          onChange={handleChange}
        />
        <Button
          onClick={handleClick}
          variant="contained"
          className={styles.upload_btn}
        >
          Choose File
        </Button>
      </Box>
      <Box component={"div"} className={styles.images_container}>
        {media.map((item) => (
          <Box component={"div"} className={styles.image_wrapper} key={item.id}>
            <img src={item.path} />
            <Box component={"div"} className={styles.btns_container}>
              <Button
                variant="contained"
                className={styles.image_btn}
                onClick={() => handleAddToSlide(item)}
              >
                Add to slide
              </Button>
              <Button
                variant="contained"
                className={styles.image_btn}
                onClick={() => handleAddAsBackground(item)}
              >
                use as background
              </Button>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
