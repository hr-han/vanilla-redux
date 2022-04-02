import { createStore } from "redux";

const ADD = "ADD";
const DEL = "DEL";

const addTodo = (text) => {
  return { type: ADD, text };
};

const deleteTodo = (id) => {
  return { type: DEL, id };
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD:
      return [
        ...state,
        { text: action.text, id: Date.now() },
      ];
    case DEL:
      const newArray = state.filter(
        (todo) => todo.id !== action.id
      );
      return newArray;
    default:
      return state;
  }
};

const store = createStore(reducer);

export const actionCreator = {
  addTodo,
  deleteTodo,
};

export default store;
