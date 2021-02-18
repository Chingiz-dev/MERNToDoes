import React from "react";
import { Todo } from "./Todo";

export const GroupTodo = (props) => {
  const { groupName, todoArray } = props;
  const renderArray = todoArray.map((todo) => {
    return <Todo key={todo._id} todo={todo} />;
  });

  return (
    <div>
      <p>{groupName}</p>
      {renderArray}
    </div>
  );
};
