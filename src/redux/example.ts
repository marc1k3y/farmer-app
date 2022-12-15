import { createSlice, Slice } from "@reduxjs/toolkit"

const TestSlice: Slice = createSlice({
  name: "test",
  initialState: {
    count: 0,
    todos: ["some do", "need to do"]
  },
  reducers: {
    increment(state) {
      state.count = state.count + 1
    },
    decrement(state) {
      state.count = state.count - 1
    },
    addToDo(state, action) {
      state.todos.push(action.payload)
    },
    removeLastToDo(state) {
      state.todos.pop()
    }
  }
})

export default TestSlice.reducer
export const { increment, decrement, addToDo, removeLastToDo } = TestSlice.actions