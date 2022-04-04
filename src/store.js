import { compose, createStore } from "redux";
import {
  configureStore,
  createAction,
  createReducer,
  createSlice,
} from "@reduxjs/toolkit";
import { toHaveDescription } from "@testing-library/jest-dom/dist/matchers";

// const addToDo = createAction("ADD");
// const deleteToDo = createAction("DEL");

// // 첫번째 arg [] 초기값
// const reducer = createReducer([], {
//   // mutate 가능한것처럼보이지만
//   // 뒤에서 리덕스 툴킷이 해주는 것임 (immer)
//   [addToDo]: (state, action) => {
//     state.push({ text: action.payload, id: Date.now() });
//   },
//   // filter는 mutate가 아니라 새로운 array를 리털하기때문에 return 을 해줘야함
//   [deleteToDo]: (state, action) =>
//     state.filter((todo) => todo.id !== action.payload),
// });

const toDos = createSlice({
  name: "toDosReducer",
  initialState: [],
  reducers: {
    add: (state, action) => {
      state.push({ text: action.payload, id: Date.now() });
    },
    remove: (state, action) =>
      state.filter((todo) => todo.id !== action.payload),
  },
});

// dev toolkit 사용위해
// toolkit 사용안할경우
// const store = createStore(
//   reducer,
//   compose(
//     window.__REDUX_DEVTOOLS_EXTENSION__ &&
//       window.__REDUX_DEVTOOLS_EXTENSION__()
//   )
// );

// toolkit 사용할경우
const store = configureStore({ reducer: toDos.reducer });

// export const actionCreator = {
//   addToDo,
//   deleteToDo,
// };

// createSlice에서 action까지 만들어줌
export const { add, remove } = toDos.actions;

export default store;
