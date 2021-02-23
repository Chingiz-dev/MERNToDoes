import React from "react";

export const Todo = (props) => {
  const { todo } = props;
  return (
    <div>
      <details>
        <summary>{todo.todoTitle}</summary>
        <div>{todo.todoBody}</div>
        <button>done</button>
        <button>edit</button>
        <button>delete</button>
        <label>
          move to
          <select>
            <option>UI</option>
            <option>IU</option>
            <option>notIU</option>
          </select>
        </label>
      </details>
    </div>
  );
};
