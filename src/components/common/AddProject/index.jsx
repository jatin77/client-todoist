import { Button } from "@material-ui/core";
import React, { useState, useRef, useEffect } from "react";
import LoadingSubmitBtn from "../../utility/LoadingSubmitBtn";
import {
  addProject,
  updateProject,
} from "../../../redux/projects/projects.action";
import { connect } from "react-redux";
import { selectProjects } from "../../../redux/projects/projects.selector";
import { createStructuredSelector } from "reselect";
import "./style.scss";

const AddProject = ({
  cancelAddEditProject,
  addProject,
  projects,
  editProject,
  editMode,
  updateProject,
  handleCloseModal,
}) => {
  const firstRender = useRef(true);
  const { addProjectLoading, updateProjectLoading } = projects;

  const [project, setProject] = useState(editMode ? editProject.name : "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!project) {
      alert("Add project name");
    } else {
      if (editMode) {
        updateProject({ name: project, projectID: editProject._id });
      } else {
        addProject({ name: project });
      }
    }
  };

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    // Close add dialog
    if (!addProjectLoading) {
      cancelAddEditProject();
    }
  }, [addProjectLoading]);

  return (
    <div className="addEdit">
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <input
          className="addEdit-input"
          value={project}
          onChange={(e) => setProject(e.target.value)}
          placeholder="Project Name"
        />
        <div className="addEditForm__btns">
          <div className="mr-3">
            <LoadingSubmitBtn
              handleLoadingBtnClick={handleSubmit}
              text="Save"
              loading={addProjectLoading || updateProjectLoading}
            />
          </div>
          <Button
            size="small"
            variant="outlined"
            onClick={cancelAddEditProject || handleCloseModal}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  projects: selectProjects,
});

// Call Global/Redux Actions
const mapDispatchToProps = (dispatch) => ({
  addProject: (data) => dispatch(addProject(data)),
  updateProject: (data) => dispatch(updateProject(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddProject);
