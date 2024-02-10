import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NoteStateContext } from "../App";
import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
import Linkify from "linkify-react";

const Note = () => {
  const { id } = useParams();
  const noteList = useContext(NoteStateContext);
  const navigate = useNavigate();
  const [data, setData] = useState();

  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `메모장 - ${id}번 메모`;
  });

  useEffect(() => {
    if (noteList.length >= 1) {
      const targetNote = noteList.find(
        (it) => parseInt(it.id) === parseInt(id)
      );

      if (targetNote) {
        setData(targetNote);
      } else {
        alert("없는 메모입니다.");
        navigate("/", { replace: true });
      }
    }
  }, [id, noteList]);

  if (!data) {
    return <div className="NotePage">로딩중입니다...</div>;
  } else {
    return (
      <div className="NotePage">
        <MyHeader
          headText={"메모장"}
          leftChild={
            <MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)} />
          }
          rightChild={
            <MyButton
              text={"수정하기"}
              onClick={() => navigate(`/edit/${data.id}`)}
            />
          }
        />
        <div className="note_content">
          <p>
            <Linkify>{data.content}</Linkify>
          </p>
        </div>
      </div>
    );
  }
};

export default Note;
