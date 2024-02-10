import { useEffect } from "react";
import NoteEditor from "../components/NoteEditor";

const New = () => {
  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = "메모장 - 새 메모";
  });
  return (
    <div>
      <NoteEditor />
    </div>
  );
};

export default New;
