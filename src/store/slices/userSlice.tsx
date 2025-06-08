import { createSlice } from '@reduxjs/toolkit';

export interface UserData {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    photo_url: string;
    language_code: string;
    allows_write_to_pm: boolean;
}

const initialState = {
  data: {} as UserData
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    set(state, action: { type: string; payload: any }) {
      state.data = action.payload
    },
  },
});

export const { set } = userSlice.actions;

export default userSlice.reducer;
