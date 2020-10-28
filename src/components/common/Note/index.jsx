import React, { useState } from "react";
import moment from "moment";
import "./style.scss";
import EditIcon from "@material-ui/icons/Edit";
import AddEditNoteForm from "../AddEditNoteForm";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import { connect } from "react-redux";
import { deleteNote } from "../../../redux/notes/notes.action";

const Note = ({ note, deleteNote, openedProject }) => {
  const { _id } = note;
  const [editNote, setEditNote] = useState(false);
  const { description, createdAt } = note;

  const handleCloseEdit = () => {
    setEditNote(false);
  };

  const handleDeleteNote = () => {
    deleteNote({ noteID: _id, openedProject });
  };

  return (
    <>
      {!editNote && (
        <div className="note">
          <div className="note__content">
            <p className="note__content--desc">{description}</p>
            <p className="note__content--createdAt">
              {moment(createdAt).format("Do ddd YYYY")}
            </p>
          </div>
          <div className="note__actions">
            <Tooltip title="Edit Note">
              <IconButton
                aria-label="edit note"
                onClick={() => setEditNote(true)}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete Note">
              <IconButton
                aria-label="delete note"
                onClick={() => handleDeleteNote()}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      )}
      {editNote && (
        <AddEditNoteForm
          note={note}
          editMode={true}
          handleCloseEdit={handleCloseEdit}
          openedProject={openedProject}
        />
      )}
    </>
  );
};

// Call Global/Redux Actions
const mapDispatchToProps = (dispatch) => ({
  deleteNote: (data) => dispatch(deleteNote(data)),
});

export default connect(null, mapDispatchToProps)(Note);
