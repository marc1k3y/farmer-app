import { ChangeEvent } from "react"
import { useAppDispatch, useAppSelector } from "../../../hooks/redux"
import { setPrice, setQuantity, setDescription } from "../../../redux/slice/modalSlice"

const floatRegex = new RegExp(/(^\d*\.?\d*$)/)
const intRegex = new RegExp(/(^\d*$)/)

const PriceInput = () => {
  const dispatch = useAppDispatch()
  const { price } = useAppSelector(state => state.modal)

  function changeHandler(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.value.match(floatRegex)) {
      dispatch(setPrice(e.target.value))
    }
  }
  return (
    <input
      type="text"
      value={price || ""}
      onChange={(e) => changeHandler(e)} />
  )
}

const QuantityInput = () => {
  const dispatch = useAppDispatch()
  const { quantity } = useAppSelector(state => state.modal)

  function changeHandler(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.value.match(intRegex)) {
      dispatch(setQuantity(e.target.value))
    }
  }
  return (
    <input
      type="text"
      value={quantity || ""}
      onChange={(e) => changeHandler(e)} />
  )
}

const DecriptionInput = ({ rows = 2 }) => {
  const dispatch = useAppDispatch()
  const { description } = useAppSelector(state => state.modal)

  function changeHandler(e: ChangeEvent<HTMLTextAreaElement>) {
    dispatch(setDescription(e.target.value))
  }
  return (
    <textarea
      rows={rows}
      cols={20}
      value={description || ""}
      onChange={(e) => changeHandler(e)} />
  )
}

export { PriceInput, QuantityInput, DecriptionInput }