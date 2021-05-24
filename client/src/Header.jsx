import React from "react";
// import HighlightIcon from "@material-ui/icons/Highlight";
import EventNoteIcon from '@material-ui/icons/EventNote';

function Header() {
  return (
    <div>
    <header>
      <h1>
        <EventNoteIcon /> 
        <span> BlogPost </span>
      </h1>
    </header></div>
  );
}

export default Header;
