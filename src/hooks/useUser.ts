import { User, UserEditable, UserId, addNewUser, deleteUserById, editUser } from "../store/users/slice"
import { useAppDispatch } from "./store"

export const useUserActions=()=>{
    const dispatch = useAppDispatch()

  const DeleteUser = (id: UserId) => {
    dispatch(deleteUserById(id))
  }

  const addUser = ({name,email,github}:User) => {
    dispatch(addNewUser({name,email,github}))
  }

  const changeUser = ({id, name, email, github }: UserEditable) => {
    dispatch(editUser({id,name,email,github}))
  }
  return {DeleteUser,addUser,changeUser}
}