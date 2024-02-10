import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NoteStateContext } from "../App";
import NoteEditor from "../components/NoteEditor";

const Edit = () => {
  const [originData, setOriginData] = useState();
  const navigate = useNavigate();
  const { id } = useParams();

  const noteList = useContext(NoteStateContext);

  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `메모장 - ${id}번 메모 수정`;
  });

  useEffect(() => {
    if (noteList.length >= 1) {
      const targetNote = noteList.find(
        (it) => parseInt(it.id) === parseInt(id)
      );

      if (targetNote) {
        setOriginData(targetNote);
      } else {
        alert("없는 메모입니다.");
        navigate("/", { replace: true });
      }
    }
  }, [id, noteList]);
  return (
    <div>
      {originData && <NoteEditor isEdit={true} originData={originData} />}
    </div>
  );
};

export default Edit;
