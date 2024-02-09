import { createSlice } from "@reduxjs/toolkit";
import { User } from "../type";
import { json } from "stream/consumers";

interface Comment{
  id: number;
  text: string;
  userId: number;
  userName: string;
  userSurname: string;
  userEmail: string;

}

interface UserState{
  users:User[]
  us:User
  comments:Comment[]
}

const initialState: { users: User[]; us: User; comments: Comment[] } = {
  users: [
    {
      id: 1,
      name: "Yura",
      surname: "Baghdasaryan",
      email: "Yur@mail.com",
      password: "1468",
    },
    {
      id: 2,
      name: "Alex",
      surname: "Mukoyan",
      email: "Alex@mail.com",
      password: "4568",
    },
    {
      id: 3,
      name: "Nelli",
      surname: "Baghdasaryan",
      email: "Nelli@mail.com",
      password: "1234",
    },
  ],
  us: {} as User,
  comments: [],
};

const userSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    
   
  },
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;
