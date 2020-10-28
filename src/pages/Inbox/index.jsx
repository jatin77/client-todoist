import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { getAllNotes } from "../../redux/notes/notes.action";
import { selectNotes } from "../../redux/notes/notes.selectors";
import Note from "../../components/common/Note/index";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import "./style.scss";
import AddEditNoteForm from "../../components/common/AddEditNoteForm";
import CoffeeLoader from "../../components/common/CoffeLoader";
import EmptyState from "../../components/common/EmptyState";

const Inbox = ({ getAllNotes, notes }) => {
  const { allNotes, allNotesLoading } = notes;
  const [openAddNote, setOpenAddNote] = useState(false);

  useEffect(() => {
    getAllNotes();
  }, []);

  const handleAddNote = () => {
    setOpenAddNote(true);
  };

  const handleCloseAdd = () => {
    setOpenAddNote(false);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center cursor-pointer">
        <h4>All Notes</h4>

        <div
          className="d-flex align-items-center"
          onClick={() => handleAddNote()}
        >
          <span className="mr-2">
            <Tooltip title="Add Note">
              <IconButton aria-label="add note">
                <AddIcon className="addIcon" />
              </IconButton>
            </Tooltip>
          </span>
          Add Note
        </div>
      </div>
      {openAddNote && <AddEditNoteForm handleCloseAdd={handleCloseAdd} />}
      {allNotesLoading && <CoffeeLoader />}
      {!allNotesLoading &&
        allNotes &&
        allNotes.map((note) => <Note key={note._id} note={note} />)}
      {!allNotesLoading && !allNotes.length && <EmptyState />}
    </div>
  );
};

// Call Global/Redux Actions
const mapDispatchToProps = (dispatch) => ({
  getAllNotes: (data) => dispatch(getAllNotes()),
});

const mapStateToProps = createStructuredSelector({
  notes: selectNotes,
});

export default connect(mapStateToProps, mapDispatchToProps)(Inbox);
