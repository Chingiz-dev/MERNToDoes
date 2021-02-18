import { useContext, useEffect, useState, useCallback } from "react";
import { GroupTodo } from "../components/GroupTodo";
import { useHttp } from "../hooks/http.hook";
import { Loader } from "../components/Loader";
import { AuthContext } from "../context/AuthContext";

export const TodosPage = () => {
  const { request, loading } = useHttp();
  const token = useContext(AuthContext);
  const [IU, setIU] = useState([]);
  const [InotU, setInotU] = useState([]);
  const [notIU, setNotIU] = useState([]);
  const [notInotU, setNotInotU] = useState([]);

  const getAllTodos = useCallback(async () => {
    const totalData = await request("/api/todo/", "GET", null, {
      Authorization: `Bearer ${token.token}`,
    });
    const IU = totalData.filter((data) => data.todoType === "IU");
    setIU(IU);
    const InotU = totalData.filter((data) => data.todoType === "InotU");
    setInotU(InotU);
    const notIU = totalData.filter((data) => data.todoType === "notIU");
    setNotIU(notIU);
    const notInotU = totalData.filter((data) => data.todoType === "notInotU");
    setNotInotU(notInotU);
  }, [request, token]);

  useEffect(() => {
    getAllTodos();
  }, [getAllTodos]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <h2>Todos page</h2>
      <GroupTodo groupName="Important and Urgent" todoArray={IU} key="IU" />
      <GroupTodo
        groupName="Not Important but Urgent"
        todoArray={notIU}
        key="notIU"
      />
      <GroupTodo
        groupName="Important but not Urgent"
        todoArray={InotU}
        ket="InotU"
      />
      <GroupTodo
        groupName="Not Important and not Urgent"
        todoArray={notInotU}
        key="notInotU"
      />
    </div>
  );
};
