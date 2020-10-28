export const updateNoteHelper = (allNotes, updatedNote) =>
  allNotes.map((note) =>
    note._id === updatedNote._id ? { ...updatedNote } : note
  );

export const updateProjectNoteHelper = (allNotes, updatedNote) => {
  const { openedProject, project, _id } = updatedNote;
  if (openedProject !== project) {
    const notes = [...allNotes];
    const filteredNotes = notes.filter((note) => note._id !== _id);

    return filteredNotes;
  }
  return allNotes.map((note) =>
    note._id === updatedNote._id ? { ...updatedNote } : note
  );
};

export const deleteNoteHelper = (allNotes, deleteNoteID) => {
  let notes = [...allNotes];
  const filteredNotes = notes.filter((note) => note._id !== deleteNoteID);

  return filteredNotes;
};

export const addProjectNoteHelper = (allNotes, addedNote) => {
  if (addedNote.openedProject === addedNote.project) {
    return [addedNote, ...allNotes];
  }
  return allNotes;
};
