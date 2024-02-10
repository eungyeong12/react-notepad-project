import React, { useEffect, useReducer, useRef } from "react";

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Note from "./pages/Note";
import New from "./pages/New";
import Edit from "./pages/Edit";

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      newState = [action.data, ...state];
      break;
    }
    case "REMOVE": {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    case "EDIT": {
      newState = state.map((it) =>
        it.id === action.data.id ? { ...action.data } : it
      );
      break;
    }
    default:
      return state;
  }
  localStorage.setItem("note", JSON.stringify(newState));
  return newState;
};

export const NoteStateContext = React.createContext();
export const NoteDispatchContext = React.createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    const localData = localStorage.getItem("note");
    if (localData) {
      const noteList = JSON.parse(localData).sort(
        (a, b) => parseInt(b.id) - parseInt(a.id)
      );
      if (noteList.length >= 1) {
        dataId.current = parseInt(noteList[0].id) + 1;
        dispatch({ type: "INIT", data: noteList });
      }
    }
  }, []);

  const dataId = useRef(0);
  // CREATE
  const onCreate = (date, content) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
      },
    });
    dataId.current += 1;
  };
  // REMOVE
  const onRemove = (targetId) => {
    dispatch({ type: "REMOVE", targetId });
  };
  // EDIT
  const onEdit = (targetId, date, content) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
      },
    });
  };

  return (
    <NoteStateContext.Provider value={data}>
      <NoteDispatchContext.Provider
        value={{
          onCreate,
          onEdit,
          onRemove,
        }}
      >
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/edit/:id" element={<Edit />} />
              <Route path="/note/:id" element={<Note />} />
            </Routes>
          </div>
        </BrowserRouter>
      </NoteDispatchContext.Provider>
    </NoteStateContext.Provider>
  );
}

export default App;
