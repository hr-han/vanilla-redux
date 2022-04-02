import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { actionCreator } from "../store";

function ToDo({ id, text, onBtnClick }) {
  return (
    <li>
      <Link to={`/${id}`}>
        {text}
        <button onClick={onBtnClick}>DEL</button>
      </Link>
    </li>
  );
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onBtnClick: () =>
      dispatch(actionCreator.deleteTodo(ownProps.id)),
  };
}

export default connect(null, mapDispatchToProps)(ToDo);
