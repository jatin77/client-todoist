import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { getAllNotes, getProjectNotes } from "../../redux/notes/notes.action";
import { selectNotes } from "../../redux/notes/notes.selectors";
import Note from "../../components/common/Note/index";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import "./style.scss";
import AddEditNoteForm from "../../components/common/AddEditNoteForm";
import CoffeeLoader from "../../components/common/CoffeLoader";
import { useParams } from "react-router-dom";
import { selectProjects } from "../../redux/projects/projects.selector";
import EditProjectInput from "../../components/common/EditProjectInput";
import EmptyState from "../../components/common/EmptyState";

const Project = ({
  getAllNotes,
  notes,
  getProjectNotes,
  location,
  projects,
}) => {
  const { id } = useParams();
  const { allProjects } = projects;

  const { projectNotes, projectNotesLoading } = notes;
  const [openAddNote, setOpenAddNote] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);

  useEffect(() => {
    getProjectNotes({ projectID: id });
  }, [id]);

  useEffect(() => {
    const project = allProjects.find((project) => project._id === id);
    setCurrentProject(project ? project : null);
  }, [projects, id]);

  const handleAddNote = () => {
    setOpenAddNote(true);
  };

  const handleCloseAdd = () => {
    setOpenAddNote(false);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center cursor-pointer">
        {currentProject ? (
          <div className="d-flex  align-items-center  position-relative">
            <h4>{currentProject.name}</h4>
            <EditProjectInput project={currentProject} />
          </div>
        ) : null}
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
      {openAddNote && (
        <AddEditNoteForm
          handleCloseAdd={handleCloseAdd}
          project={true}
          openedProject={id}
        />
      )}
      {projectNotesLoading && <CoffeeLoader />}
      {!projectNotesLoading &&
        projectNotes &&
        projectNotes.map((note) => (
          <Note key={note._id} note={note} openedProject={id} />
        ))}
      {!projectNotesLoading && !projectNotes.length && <EmptyState />}
    </div>
  );
};

// Call Global/Redux Actions
const mapDispatchToProps = (dispatch) => ({
  getProjectNotes: (data) => dispatch(getProjectNotes(data)),
});

const mapStateToProps = createStructuredSelector({
  notes: selectNotes,
  projects: selectProjects,
});

export default connect(mapStateToProps, mapDispatchToProps)(Project);
