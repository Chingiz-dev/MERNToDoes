import React, { useContext, useState } from "react";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";

export const Todo = (props) => {
  const auth = useContext(AuthContext);
  const { request } = useHttp();
  const { todo } = props;
  const [deleted, setDeleted] = useState(false);

  const handleDeleteClick = async () => {
    try {
      const todoID = { todoID: todo._id };
      console.log(todoID);
      const data = await request("/api/todo/deleteTodo", "DELETE", todoID, {
        Authorization: `Bearer ${auth.token}`,
      });
      if (data) {
        setDeleted(true);
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  if (deleted) {
    return <div>Your ToDo just have been erased</div>;
  }

  return (
    <div>
      <details>
        <summary>{todo.todoTitle}</summary>
        <div>{todo.todoBody}</div>
        <button>done</button>
        <button>edit</button>
        <button onClick={handleDeleteClick}>delete</button>
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
