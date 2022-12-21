import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux"
import { AppDispatch, RootState } from "../redux"

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector