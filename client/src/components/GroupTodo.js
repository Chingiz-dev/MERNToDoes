import React from "react";
import { Todo } from "./Todo";
import st from './GroupTodo.module.css'

export const GroupTodo = (props) => {
  const { groupName, todoArray } = props;
  const renderArray = todoArray.map((todo) => {
    return <Todo key={todo._id} todo={todo} />;
  });

  return (
    <div className={st.group}>
      <p>{groupName}</p>
      {renderArray}
    </div>
  );
};
