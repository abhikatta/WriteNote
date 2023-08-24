import React, { useState } from "react";
import "./index.css";
import { nanoid } from "nanoid";
import SideBar from "./components/SideBar";
import NoteEditor from "./components/NoteEditor";
import darkIcon from "./assets/icons8-dark-theme-100.png";
import lightIcon from "./assets/icons8-sun-100.png";
import toggleSideBarIcon from "./assets/icons8-double-left-100.png";
function App() {
  const [notes, setNotes] = React.useState(
    JSON.parse(localStorage.getItem("notes")) || []
  );
  const [toggleSideBar, setToggleSideBar] = useState(
    JSON.parse(localStorage.getItem("sidebar")) || false
  );
  const [currentNoteId, setCurrentNoteId] = React.useState(
    (notes[0] && notes[0].id) || ""
  );
  const [theme, setTheme] = React.useState(
    JSON.parse(localStorage.getItem("theme")) || "light"
  );
  const [themeIcon, setThemeIcon] = React.useState(darkIcon);
  React.useEffect(() => {
    localStorage.setItem("sidebar", JSON.stringify(toggleSideBar));
    localStorage.setItem("notes", JSON.stringify(notes));
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [notes, theme, toggleSideBar]);

  function createNewNote() {
    const newNote = {
      id: nanoid(),
      body: `# Title`,
    };
    setNotes((prevNotes) => [newNote, ...prevNotes]);
    setCurrentNoteId(newNote.id);
  }
  function updateNote(text) {
    setNotes((oldnotes) => {
      const newNotes = [];
      for (let i = 0; i < oldnotes.length; i++) {
        const oldNote = oldnotes[i];
        if (oldNote.id === currentNoteId) {
          newNotes.unshift({ ...oldNote, body: text });
        } else {
          newNotes.push(oldNote);
        }
      }
      return newNotes;
    });
  }

  function deleteNote(event, noteId) {
    /* below line of colde works in this way:
     * whenever a note is deleted, it is set to current note but since it
     * doesnt exist in the array, it throws an error, hence this line of code is used
     */
    event.stopPropagation();
    setNotes((oldNotes) => oldNotes.filter((note) => note.id !== noteId));
  }

  const currentNote =
    notes.find((note) => note.id === currentNoteId) || notes[0];

  return notes.length > 0 ? (
    <div
      className={`flex flex-col specialfont items-center w-full h-full min-h-screen min-w-screen
        ${
          theme === "light"
            ? "text-slate-600 bg-slate-200"
            : "text-slate-200 bg-slate-600"
        }`}>
      <div className="flex specialfont flex-row mx-10 ">
        <h1 className=" lg:text-6xl md:text-6xl sm:text-5xl text-4xl font-bold my-10">
          RightNote
        </h1>

        <img
          // width={40}
          // height={20}
          className={`h-[2.5rem] w-[2.5rem] transition-colors p-1 absolute md:top-[3.5rem] top-[2.5rem] md:right-[5rem] right-[2rem] duration-200 rounded-[40%]
            ${
              theme === "light"
                ? "hover:bg-slate-400 bg-slate-300"
                : "hover:bg-slate-300 bg-slate-400"
            }`}
          src={themeIcon}
          alt="ThemeIcon"
          onClick={() =>
            theme === "light"
              ? (setTheme("dark"), setThemeIcon(lightIcon))
              : (setTheme("light"), setThemeIcon(darkIcon))
          }
        />
      </div>
      <div className="flex sm:flex-row flex-col sm:items-baseline items-center sm:mx-10 mx-3">
        <img
          className={`h-[2.5rem] w-[2.5rem] transition-colors p-1 absolute md:top-[3.5rem] top-[2.5rem] md:left-[5rem] left-[2rem] duration-200 rounded-[40%]
          ${
            toggleSideBar
              ? "md:rotate-0 rotate-90 transition-transform duration-300"
              : "md:rotate-180 -rotate-90 transition-transform duration-300"
          }  
          ${
            theme === "light"
              ? "hover:bg-slate-400 bg-slate-300"
              : "hover:bg-slate-300 bg-slate-400"
          }`}
          src={toggleSideBarIcon}
          onClick={() => setToggleSideBar((prevSetSideBar) => !prevSetSideBar)}
        />
        <div
          className={`sm:flex flex-row sm:flex-col w-[10rem] max-w-[15rem] sm:mr-10
              ${
                !toggleSideBar
                  ? "scale-0 transition-transform duration-500"
                  : "scale-100 transition-transform duration-500"
              }
              `}>
          {toggleSideBar && (
            <SideBar
              newNote={createNewNote}
              setCurrentNoteId={setCurrentNoteId}
              notes={notes}
              theme={theme}
              deleteNote={deleteNote}
              currentNote={currentNote}
            />
          )}
        </div>

        <div className="">
          {currentNoteId && notes.length > 0 && (
            <NoteEditor
              theme={theme}
              currentNote={currentNote}
              updateNote={updateNote}
            />
          )}
        </div>
      </div>
    </div>
  ) : (
    <div
      className={`flex flex-col specialfont items-center w-full h-full min-h-screen min-w-screen
        ${
          theme === "light"
            ? "text-slate-600 bg-slate-200"
            : "text-slate-200 bg-slate-600"
        }`}>
      <div className="flex flex-col items-center">
        <h1 className="text-5xl font-bold absolute top-[35%] my-10">
          RightNote
        </h1>
        <img
          className={`h-[2.5rem] w-[2.5rem] transition-colors p-1 absolute md:top-[3.5rem] top-[2.5rem]
           md:right-[5rem] right-[2rem] duration-200 rounded-[40%]

            ${
              theme === "light"
                ? "hover:bg-slate-400 bg-slate-300"
                : "hover:bg-slate-300 bg-slate-400"
            }`}
          src={themeIcon}
          alt="ThemeIcon"
          onClick={() =>
            theme === "light"
              ? (setTheme("dark"), setThemeIcon(lightIcon))
              : (setTheme("light"), setThemeIcon(darkIcon))
          }
        />
        <button
          className={`font-bold text-xl absolute top-[50%] hover:text-slate-200 border-slate-400 hover:border-slate-600 hover:bg-slate-600 border-2 rounded-md px-2 py-1 `}
          onClick={createNewNote}>
          Create a new Note
        </button>
      </div>
    </div>
  );
}
export default App;
