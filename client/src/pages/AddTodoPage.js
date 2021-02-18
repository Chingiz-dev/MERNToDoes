import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";
import { useHistory } from "react-router-dom";

export const AddTodoPage = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const [todoBody, setTodoBody] = useState("hello");
  const [todoTitle, setTodoTitle] = useState(" world");
  const [important, setImportant] = useState("I");
  const [urgent, setUrgent] = useState("U");
  const { error, request, clearError } = useHttp();

  useEffect(() => {
    if (error) {
      alert(error);
    }
    clearError();
  }, [error, clearError]);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const todoType = important + urgent;
      const form = { todoBody, todoTitle, todoType };
      const data = await request("/api/todo/addTodo", "POST", form, {
        Authorization: `Bearer ${auth.token}`,
      });
      console.log(data, ' - is created');
      history.push("/todos");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Ad todo page</h2>
      <form>
        <div>
          <label htmlFor="todoTitle">Todo title</label>
          <input
            id="todoTitle"
            value={todoTitle}
            onChange={(e) => setTodoTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="todoBody">Todo body</label>
          <input
            id="todoBody"
            value={todoBody}
            onChange={(e) => setTodoBody(e.target.value)}
          />
        </div>
        <div>
          <p>Is it important?</p>
          <div>
            <label htmlFor="notI">not important</label>
            <input
              type="radio"
              id="notI"
              name="important"
              value="notI"
              onChange={() => setImportant("notI")}
            />
            <label htmlFor="I">important</label>
            <input
              type="radio"
              id="I"
              name="important"
              value="I"
              defaultChecked
              onChange={() => setImportant("I")}
            />
          </div>
        </div>
        <div>
          <p>Is it Urgent?</p>
          <div>
            <label htmlFor="notU">not Urgent</label>
            <input
              type="radio"
              id="notU"
              name="urgent"
              value="notU"
              onChange={() => setUrgent("notU")}
            />
            <label htmlFor="U">Urgent</label>
            <input
              type="radio"
              id="U"
              name="urgent"
              value="U"
              defaultChecked
              onChange={() => setUrgent("U")}
            />
          </div>
        </div>
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};
