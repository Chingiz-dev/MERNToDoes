import { Switch, Route, Redirect } from "react-router-dom";
import { TodosPage } from "./pages/TodosPage";
import { WayPage } from "./pages/WayPage";
import { AddTodoPage } from "./pages/AddTodoPage";
import { AuthPage } from "./pages/AuthPage";

export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/todos" exact>
          <TodosPage />
        </Route>
        <Route path="/way" exact>
          <WayPage />
        </Route>
        <Route path='/addtodo' exact >
          <AddTodoPage/>
        </Route>
        <Redirect to="/todos" />
      </Switch>
    );
  }
  return (
    <Switch>
      <Route path="/" exact>
        <AuthPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};
