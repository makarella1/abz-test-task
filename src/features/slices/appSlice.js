import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  page: 1,
  isRegistered: false,
};

//This app slice will manage the global state: pages, registration
const appSlice = createSlice({
  name: 'usersPageSlice',
  initialState,
  reducers: {
    setNextPage(state) {
      state.page += 1;
    },
    resetPages(state) {
      state.page = initialState.page;
    },
    setRegistration(state, action) {
      state.isRegistered = action.payload.registered;
    },
  },
});

export const { setNextPage, resetPages, setRegistration } = appSlice.actions;
export default appSlice.reducer;
