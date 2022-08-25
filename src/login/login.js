import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

function Login() {
  const apitodolist = "https://api-nodejs-todolist.herokuapp.com/user/login";
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  // đăng nhập
  const data = { email: email, password: password };
  const handlesigin = (data) => {
    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    fetch(apitodolist, option)
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("token", data.token);
        navigate("/home");
      })
      .catch((error) => {
        console.error("Error:", data);
      });
  };
  return (
    <div className="container">
      <h2>Đăng Nhập</h2>
      <div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            onChange={(e) => setemail(e.target.value)}
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="pwd">Password:</label>
          <input
            onChange={(e) => setpassword(e.target.value)}
            type="password"
            className="form-control"
            id="pwd"
            placeholder="Enter password"
          />
        </div>
        <button className="btn btn-default" onClick={() => handlesigin(data)}>
          Đăng Nhập
        </button>
      </div>
    </div>
  );
}

export default Login;
