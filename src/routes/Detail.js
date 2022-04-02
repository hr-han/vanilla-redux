import React from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

function Detail({ toDos }) {
  const { id } = useParams();
  const todo = toDos.find((todo) => todo.id === Number(id));
  return (
    <>
      <h1>{todo.text}</h1>
      <h5>Created at {todo.id}</h5>
    </>
  );
}

function mapStateToProps(state) {
  return { toDos: state };
}

export default connect(mapStateToProps, null)(Detail);
