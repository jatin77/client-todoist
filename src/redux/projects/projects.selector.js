import { createSelector } from "reselect";

const selectProjectsState = (state) => state.projects;

export const selectProjects = createSelector(
  [selectProjectsState],
  (projects) => projects
);
