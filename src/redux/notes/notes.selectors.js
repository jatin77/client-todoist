import { createSelector } from "reselect";

const selectNotesState = (state) => state.notes;

export const selectNotes = createSelector([selectNotesState], (notes) => notes);
