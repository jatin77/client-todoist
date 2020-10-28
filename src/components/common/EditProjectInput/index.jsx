import React, { useState, useEffect, useRef } from "react";
import EditIcon from "@material-ui/icons/Edit";
import EditProjectModal from "./EditProjectModal";
import { createStructuredSelector } from "reselect";
import { selectProjects } from "../../../redux/projects/projects.selector";
import { connect } from "react-redux";

const EditProjectInput = ({ project, projects }) => {
  const firstRender = useRef(true);
  const { updateProjectLoading } = projects;
  const [open, setOpen] = useState(false);

  const handleOpenEditModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    // Close add dialog
    if (!updateProjectLoading) {
      setOpen(false);
    }
  }, [updateProjectLoading]);

  return (
    <div>
      <EditIcon
        onClick={handleOpenEditModal}
        style={{
          color: "#db4c3f",
          width: "1rem",
          position: "absolute",
          top: "1px",
          left: "-21px",
        }}
      />

      {open && (
        <EditProjectModal
          project={project}
          open={open}
          handleCloseModal={handleCloseModal}
        />
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  projects: selectProjects,
});

export default connect(mapStateToProps)(EditProjectInput);
