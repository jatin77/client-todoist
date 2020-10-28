import React, { useEffect, useRef, useState } from "react";
import DatePicker from "../DatePicker";
import ProjectPicker from "../ProjectPicker";
import Button from "@material-ui/core/Button";
import "./styles.scss";
import { connect } from "react-redux";
import { addNote, updateNote } from "../../../redux/notes/notes.action";
import LoadingSubmitBtn from "../../utility/LoadingSubmitBtn";
import { createStructuredSelector } from "reselect";
import { selectNotes } from "../../../redux/notes/notes.selectors";


const AddEditNoteForm = ({
  note,
  editMode,
  handleCloseEdit,
  handleCloseAdd,
  updateNote,
  notes,
  addNote,
  openedProject,
}) => {
  const firstRender = useRef(true);
  const firstRenderSec = useRef(true);
  const { updateNoteLoading, addNoteLoading } = notes;
  const { description, _id, project, createdAt } = note
    ? note
    : { description: "", _id: "", project: "", createdAt: new Date() };
  const [selectedDate, setSelectedDate] = useState(
    editMode ? createdAt : new Date()
  );
  const [desc, setDesc] = useState(description ? description : "");
  const [selectedProject, setSelectedProject] = useState(
    editMode ? project : openedProject ? openedProject : ""
  );
  // Keep check of current edit note
  const [editThis, setEditThis] = useState("");

  const handleDateChange = (inputDate) => {
    setSelectedDate(inputDate);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validateInputs(desc, selectedProject, selectedDate, _id);

    if (!isValid) {
      alert("invalid fields");
      return;
    }

    if (editMode) {
      setEditThis(_id);
      // Update note
      updateNote({
        noteID: _id,
        description: desc,
        project: selectedProject,
        createdAt: selectedDate,
        openedProject,
      });
    }

    if (!editMode) {
      // Create note
      addNote({
        description: desc,
        projectID: selectedProject,
        createdAt: selectedDate,
        openedProject,
      });
    }
  };

  const validateInputs = (desc, project, date, id) => {
    let pass = true;
    if (editMode && (!desc || !project || !date || !id)) {
      pass = false;
    } else if (!editMode && (!desc || !project || !date)) {
      pass = false;
    }

    return pass;
  };

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    // Close edit dialog
    if (editMode && !updateNoteLoading & (editThis === _id)) {
      handleCloseEdit();
    }
  }, [updateNoteLoading]);

  useEffect(() => {
    if (firstRenderSec.current) {
      firstRenderSec.current = false;
      return;
    }

    // Close add dialog
    if (!editMode && !addNoteLoading) {
      handleCloseAdd();
    }
  }, [addNoteLoading]);

  const handleProjectChange = (e) => {
    setSelectedProject(e.target.value);
  };

  return (
    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
      <div className="addEditForm mb-3">
        <input
          type="text"
          placeholder="Type Note description here"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <div className="addEditForm__picker">
          <DatePicker date={selectedDate} handleDateChange={handleDateChange} />
          <ProjectPicker
            selectedProject={selectedProject}
            handleProjectChange={handleProjectChange}
          />
        </div>
      </div>
      <div className="addEditForm__btns">
        <div className="mr-3">
          <LoadingSubmitBtn
            handleLoadingBtnClick={handleSubmit}
            text="Save"
            loading={
              editMode && editThis === _id
                ? updateNoteLoading
                : !editMode
                ? addNoteLoading
                : false
            }
          />
        </div>
        <Button
          size="small"
          variant="outlined"
          onClick={handleCloseEdit || handleCloseAdd}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

const mapStateToProps = createStructuredSelector({
  notes: selectNotes,
});

// Call Global/Redux Actions
const mapDispatchToProps = (dispatch) => ({
  updateNote: (data) => dispatch(updateNote(data)),
  addNote: (data) => dispatch(addNote(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddEditNoteForm);
