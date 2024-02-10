import React from "react";
import { useNavigate } from "react-router-dom";

const NoteItem = ({ id, content, date }) => {
  const navigate = useNavigate();
  const strDate = new Date(parseInt(date)).toLocaleDateString();
  const goDetail = () => {
    navigate(`/note/${id}`);
  };
  return (
    <div onClick={goDetail} className="NoteItem">
      <div className="info_wrapper">
        <div className="note_date">{strDate}</div>
        <div className="note_content_preview">{content}</div>
      </div>
    </div>
  );
};

export default React.memo(NoteItem);
