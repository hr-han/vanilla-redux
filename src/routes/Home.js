import React, { useState } from "react";
import { connect } from "react-redux";
import { actionCreator } from "../store";
import ToDo from "../components/ToDo";

function Home({ toDos, addToDo }) {
  const [text, setText] = useState("");
  function onChange(e) {
    setText(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();
    addToDo(text);
    setText("");
  }

  return (
    <>
      <h1>To Do</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={text}
          onChange={onChange}
        />
        <button>Add</button>
      </form>
      <ul>
        {toDos.map((todo) => (
          <ToDo key={todo.id} {...todo} />
        ))}
      </ul>
    </>
  );
}
// mapStateToProps !!
// state : store에서 받은 state
// ownProps : react-router 에서 받는 props
// => 안되는듯 component자체에서 props를 제어할수 있기때문에 여기에선 자세히 보지않고 넘어감
// => react-router-dom v6 이상부터는 지원안됨 useParams hook으로 대체사용가능

// redux state를 home component의 prop로 전달
function mapStateToProps(state) {
  return { toDos: state };
}

// redux dispatch(실행fn)을 home component의 prop로 전달
function mapDispatchToProps(dispatch) {
  // return { dispatch };
  return {
    addToDo: (text) =>
      dispatch(actionCreator.addTodo(text)),
    deleteToDo: (id) =>
      dispatch(actionCreator.deleteTodo(id)),
  };
}

// 컴포넌트에 연결
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

// mapStateToProps는 hooks에서 useSelector, redux에서는 getState
// mapDispatchToProps는 hooks에서 useDispatch, redux에서는 dispatch
