import { User, UserId, addNewUser, deleteUserById } from "../store/users/slice"
import { useAppDispatch } from "./store"

export const useUserActions=()=>{
    const dispatch = useAppDispatch()

  const DeleteUser = (id: UserId) => {
    dispatch(deleteUserById(id))
  }

  const addUser = ({name,email,github}:User) => {
    dispatch(addNewUser({name,email,github}))
  }
  return {DeleteUser,addUser}
}