import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Box } from "@mui/material";
import styles from "./styles.module.css";
import { useAppDispatch, useAppSelector } from "../../hooks/store-hooks";
import { setTypedText } from "../../store/slices/slides";

export default function TextEditor() {
  const { typedText } = useAppSelector((store) => store.slide);
  const dispatch = useAppDispatch();
  const ref = useRef(null);
  const handleTyping = (content: string) => {
    dispatch(setTypedText(content));
  };
  return (
    <Box component={"div"} className={styles.editor_wrapper}>
      <Editor
        value={typedText}
        onEditorChange={handleTyping}
        apiKey="52qi6oplrlqdt3vtct45u2w4cgs8tlg94cfjt2velzde98gh"
        onInit={(_evt, editor) => (ref.current = editor)}
        init={{
          height: 320,
          menubar: false,
          toolbar:
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
    </Box>
  );
}
