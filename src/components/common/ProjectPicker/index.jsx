import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { selectProjects } from "../../../redux/projects/projects.selector";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const ProjectPicker = ({ selectedProject, handleProjectChange, projects }) => {
  const classes = useStyles();
  const { allProjects } = projects;

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="demo-simple-select-label">Project</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedProject}
        onChange={handleProjectChange}
      >
        {allProjects &&
          allProjects.map((project) => (
            <MenuItem key={project._id} value={project._id}>
              {project.name}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};

const mapStateToProps = createStructuredSelector({
  projects: selectProjects,
});

export default connect(mapStateToProps)(ProjectPicker);
