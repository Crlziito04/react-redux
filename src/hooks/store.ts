import { useDispatch, useSelector } from "react-redux"
import type { TypedUseSelectorHook } from "react-redux"
import { RootState, AddDispatch } from "../store"

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useAppDispatch: ()=> AddDispatch = useDispatch