import {type Middleware, configureStore } from "@reduxjs/toolkit";
import { rollbackUser, usersSlice } from "./users/slice";
import { toast } from 'sonner'

const persistance = (store) => (next) => (action) => {
  next(action)
 localStorage.setItem("redux__state",JSON.stringify(store.getState()));
}

const syncWithDb: Middleware = store => next => action => {
  const { type, payload } = action

  const previousState = store.getState()

  next(action)

  if (type === "users/deleteUserById") {
    const userToRemove = previousState.users.find(user => user.id === payload)
    
    fetch(`https://jsonplaceholder.typicode.com/users/${payload}`, {
    method: "DELETE",
    }).then(res => {
      if (res.ok) {
      toast.success(`Usuario ${payload} Eliminado`)
      }
      //throw new Error("Error al eliminar usuario")
    }).catch(() => {
      toast.error(`Error al borrar user ${payload}`)
      if (userToRemove){
        store.dispatch(rollbackUser(userToRemove))
      }
    console.log('error')
  })
}

}

export const store = configureStore({
  reducer: {
    users: usersSlice.reducer,
  },
  middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(persistance,syncWithDb)
});

export type RootState = ReturnType<typeof store.getState>

export type AddDispatch = typeof store.dispatch