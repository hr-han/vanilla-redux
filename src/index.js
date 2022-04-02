import { createStore } from "redux";

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

const addToDo = (text) => {
  return {
    type: ADD_TODO,
    text,
  };
};

const deleteToDo = (id) => {
  return {
    type: DELETE_TODO,
    id,
  };
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      // state를 직접 mutating 하지 말 것
      // new array 생성
      return [
        ...state,
        { text: action.text, id: Date.now().toString() },
      ];
    case DELETE_TODO:
      // slice는 array를 직접수정하고 filter는 new array를 생성한다.
      const newArray = state.filter(
        (toDo) => toDo.id !== action.id
      );
      return newArray;
    default:
      return state;
  }
};

const store = createStore(reducer);

const paintToDos = () => {
  const toDos = store.getState();
  ul.innerHTML = ""; // 리스트 초기화
  toDos.forEach((toDo) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.innerText = "delete";
    btn.addEventListener("click", dispatchDeleteToDo);
    li.innerText = toDo.text;
    li.id = toDo.id;
    li.appendChild(btn);
    ul.appendChild(li);
  });
};
store.subscribe(paintToDos);

const dispatchAddToDo = (text) => {
  store.dispatch(addToDo(text));
};

const dispatchDeleteToDo = (e) => {
  const id = e.target.parentNode.id;
  store.dispatch(deleteToDo(id));
};

const onSubmit = (e) => {
  e.preventDefault();
  const toDo = input.value;
  input.value = "";
  //createToDo(todo);
  dispatchAddToDo(toDo);
};

form.addEventListener("submit", onSubmit);
