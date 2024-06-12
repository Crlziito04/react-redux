import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const DEFAULT_STATE= [
  {
    id: "1",
    name: "John Doe",
    email: "JonDoe@gmail.com",
    github: "JohnDoe",
  },
  {
    id: "2",
    name: "carlos",
    email: "carlos@gmail.com",
    github: "Crlziito04",
  },
  {
    id: "3",
    name: "zia",
    email: "zia@gmail.com",
    github: "zia123",
  },
  {
    id: "4",
    name: "Tommy",
    email: "Tomme123@gmail.com",
    github: "midudev",
  },
];

export type UserId = string;

export interface User {
  name: string;
  email: string;
  github: string;
}

export interface UserEditable {
   id: UserId
  name?: string;
  email?: string;
  github?: string;
}

export interface UserWithId extends User {
  id: UserId
}

const initialState: UserWithId[] = (() => {
  const persistedState = localStorage.getItem("redux__state")

  if (persistedState) {
    return JSON.parse(persistedState).users
  }
  return DEFAULT_STATE
})()



export const usersSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    deleteUserById: (state, action: PayloadAction<UserId>) => {
      const id = action.payload
      return state.filter(user=> user.id!==id)
    },
    addNewUser: (state, action:PayloadAction<User>) => {
      const id = crypto.randomUUID()
      return [...state,
        {id,...action.payload}
      ]
    },
    editUser: (state,action:PayloadAction<UserEditable>) => {
      const { id, ...changes } = action.payload;
      return state.map(user =>
        user.id === id ? { ...user, ...changes } : user
      );
    },
    rollbackUser: (state, action: PayloadAction<UserWithId>) => {
      const user = state.some(user => user.id === action.payload.id)
      if(!user) return [...state,action.payload]
    }
  },
  
});

export default usersSlice.reducer;

export const {addNewUser, deleteUserById,rollbackUser,editUser}=usersSlice.actions
