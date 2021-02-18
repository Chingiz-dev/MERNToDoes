import React from "react";

export const Todo = (props) => {
  const { todo } = props;
  return (
    <div>
      <div>{todo.todoTitle}</div>
      <div>{todo.todoBody}</div>
    </div>
  );
};
