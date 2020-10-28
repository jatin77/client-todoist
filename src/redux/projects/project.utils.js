export const updateProjectHelper = (allProjects, updatedProject) =>
  allProjects.map((project) =>
    project._id === updatedProject._id ? { ...updatedProject } : project
  );
