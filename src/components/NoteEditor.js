import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
import { useContext, useEffect, useRef, useState } from "react";
import { NoteDispatchContext } from "../App";
import { useNavigate } from "react-router-dom";

const NoteEditor = ({ isEdit, originData }) => {
  const contentRef = useRef();
  const [content, setContent] = useState("");
  const [date] = useState(new Date());
  const navigate = useNavigate();

  const { onCreate, onEdit, onRemove } = useContext(NoteDispatchContext);

  const handleSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }

    if (!isEdit) {
      onCreate(date, content);
    } else {
      alert("메모를 수정하시겠습니까?");
      onEdit(originData.id, new Date(), content);
    }

    navigate("/", { replace: true });
  };

  const handleRemove = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      onRemove(originData.id);
      navigate("/", { replace: true });
    }
  };

  useEffect(() => {
    if (isEdit) {
      setContent(originData.content);
    }
  }, [isEdit, originData]);

  return (
    <div>
      <MyHeader
        headText={isEdit ? "메모장" : "새 메모"}
        leftChild={
          <MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)} />
        }
        rightChild={
          isEdit && (
            <MyButton
              text={"삭제하기"}
              type={"negative"}
              onClick={handleRemove}
            />
          )
        }
      />
      <section>
        <div className="input_box">
          <textarea
            spellcheck="false"
            ref={contentRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      </section>
      <section>
        <div className="control_box">
          <MyButton text={"취소하기"} onClick={() => navigate(-1)} />
          <MyButton
            text={"작성완료"}
            type={"positive"}
            onClick={handleSubmit}
          />
        </div>
      </section>
    </div>
  );
};

export default NoteEditor;
