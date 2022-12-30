import React from "react"
import { Apps } from "../constants"
import { useAppDispatch } from "../hooks/redux"
import { setApp } from "../redux/slice/global"

export const AppSelector = () => {
  const dispatch = useAppDispatch()
  function setAppHandler(app: string) {
    dispatch(setApp(app))
  }
  return (
    <React.Fragment>
      {(Object.keys(Apps) as Array<keyof typeof Apps>).map((key) =>
        <button
          key={key}
          onClick={() => setAppHandler(key)}>{key}</button>)}
    </React.Fragment>
  )
}