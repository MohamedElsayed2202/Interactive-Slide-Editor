import { Box, Button } from "@mui/material";
import styles from "./styles.module.css";
import { useRef, type MouseEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/store-hooks";
import { addMedia } from "../../store/slices/slides/actions";
import type { Background, Element, Media } from "../../utils/interfaces";
import {
  setIsAdding,
  setNewBackground,
  setNewElement,
  setSelectedimage,
} from "../../store/slices/slides";

export default function ImagesSection() {
  const {
    record,
    media,
    selectedImage: selectedImageId,
  } = useAppSelector((store) => store.slide);
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
  const handleAddToSlide = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    media: Media
  ) => {
    e.stopPropagation();
    const element: Element = {
      id: media.id.toString(),
      slideId: record.id,
      type: "image",
      content: media.path,
      x_position: 30,
      y_position: 60,
      z_index: 1000,
      width: 200,
      height: 150,
    };
    dispatch(setNewElement(element));
  };
  const handleAddAsBackground = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    media: Media
  ) => {
    e.stopPropagation();
    const background: Background = {
      slideId: record.id,
      path: media.path,
    };
    dispatch(setNewBackground(background));
  };
  const handleSelectImage = (id: number, path: string) => {
    dispatch(
      setSelectedimage({
        id,
        path,
      })
    );
    dispatch(setIsAdding(true));
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
          <Box
            component={"div"}
            className={`${styles.image_wrapper} ${
              item.id === selectedImageId.id && styles.active_image
            }`}
            key={item.id}
            onClick={() => handleSelectImage(item.id, item.path)}
          >
            <img src={item.path} />
            <Box component={"div"} className={styles.btns_container}>
              <Button
                variant="contained"
                className={styles.image_btn}
                onClick={(e) => handleAddToSlide(e, item)}
              >
                Add to slide
              </Button>
              <Button
                variant="contained"
                className={styles.image_btn}
                onClick={(e) => handleAddAsBackground(e, item)}
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
