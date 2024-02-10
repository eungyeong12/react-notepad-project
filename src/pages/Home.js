import { useContext, useEffect, useState } from "react";
import { NoteStateContext } from "../App";

import MyHeader from "./../components/MyHeader";
import NoteList from "./../components/NoteList";

const Home = () => {
  const noteList = useContext(NoteStateContext);

  const [data, setData] = useState([]);
  const [curDate] = useState(new Date());
  const headText = "메모장";

  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = "메모장";
  });

  useEffect(() => {
    if (noteList.length >= 1) {
      setData(noteList);
    }
  }, [noteList, curDate]);

  return (
    <div>
      <MyHeader headText={headText} />
      <NoteList noteList={data} />
    </div>
  );
};

export default Home;
