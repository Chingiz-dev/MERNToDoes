import { useContext, useEffect, useState, useCallback } from "react";
import { GroupTodo } from "../components/GroupTodo";
import { useHttp } from "../hooks/http.hook";
import { Loader } from "../components/Loader";
import { AuthContext } from "../context/AuthContext";
import st from "./TodosPage.module.css";

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
    <div className="main_width">
      <div className={st.header}>
        <h1 className={st.h2}>Todos</h1>
      </div>
      <div className={st.container}>
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
    </div>
  );
};
