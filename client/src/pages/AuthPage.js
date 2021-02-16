import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";

export const AuthPage = () => {
  const auth = useContext(AuthContext);
  const { loading, error, request, clearError } = useHttp();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (error) {
      alert(error);
    }
    clearError();
  }, [error, clearError]);

  const handleChange = (evt) => {
    setForm({
      ...form,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const data = await request("api/auth/login", "POST", { ...form });
      auth.login(data.token, data.userID);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRegister = async (evt) => {
    evt.preventDefault();
    try {
      const data = await request("api/auth/register", "POST", { ...form });
      alert("uuser created", data);
    } catch (error) {}
    setForm({
      email: "",
      password: "",
    });
  };

  return (
    <div>
      <h2>Auth page</h2>
      <form>
        <div>
          <label htmlFor="email">Enter your e-mail</label>
          <input
            type="text"
            value={form.email}
            name="email"
            onChange={handleChange}
            placeholder="E-mail"
            required={true}
          />
        </div>
        <div>
          <label htmlFor="password">Enter your password</label>
          <input
            type="password"
            value={form.password}
            name="password"
            onChange={handleChange}
            placeholder="password"
            required={true}
          />
        </div>
        <button type="submit" onClick={handleLogin} disabled={loading}>
          Login
        </button>
        <button type="submit" onClick={handleRegister} disabled={loading}>
          Register
        </button>
      </form>
    </div>
  );
};
