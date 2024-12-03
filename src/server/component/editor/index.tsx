import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import { useRef, useEffect } from "react";
import styles from "./editor.module.css";
import { useHeight } from "../../../common/hook/response/use_height";
import "./index.css";

export default function RivEditor({ content = "", onChange }: RivEditorProps) {
  const editorRef = useRef<Editor>(null);
  const height = useHeight();
  const toastHeight = height.width - 175;

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.getInstance().setMarkdown(content);
    }
  }, [content]);

  const handleChange = () => {
    if (editorRef.current) {
      const currentText = editorRef.current.getInstance().getMarkdown();
      if (onChange) {
        onChange(currentText);
      }
    }
  };

  return (
    <div className={styles.customEditor}>
      <Editor
        ref={editorRef}
        previewStyle="vertical"
        initialEditType="wysiwyg"
        useCommandShortcut={true}
        hideModeSwitch={true}
        toolbarItems={[]}
        height={`${toastHeight}px`}
        onChange={handleChange}
      />
    </div>
  );
}

interface RivEditorProps {
  content?: string;
  onChange: (newText: string) => void;
}
