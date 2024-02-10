import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";
import NoteItem from "./NoteItem";

const sortOptionList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된 순" },
];

const ControlMenu = React.memo(({ value, onChange, optionList }) => {
  return (
    <select
      className="ControlMenu"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  );
});

const NoteList = ({ noteList }) => {
  const navigate = useNavigate();
  const [sortType, setSortType] = useState("latest");

  const getProcessedNoteList = () => {
    const compare = (a, b) => {
      if (sortType === "latest") {
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };
    const copyList = JSON.parse(JSON.stringify(noteList));
    const sortedList = copyList.sort(compare);
    return sortedList;
  };

  return (
    <div className="NoteList">
      <div className="menu_wrapper">
        <div className="left_col">
          <ControlMenu
            value={sortType}
            onChange={setSortType}
            optionList={sortOptionList}
          />
        </div>
        <div className="right_col">
          <MyButton
            type={"positive"}
            text={"새 메모 작성하기"}
            onClick={() => navigate("/new")}
          />
        </div>
      </div>

      {getProcessedNoteList().map((it) => (
        <NoteItem key={it.id} {...it} />
      ))}
    </div>
  );
};

NoteList.defaultProps = {
  noteList: [],
};

export default NoteList;
