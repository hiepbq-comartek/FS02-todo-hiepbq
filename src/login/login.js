import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
const apitodolist = "https://api-nodejs-todolist.herokuapp.com/user/login";

export let getid = () => {
  const option = {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  fetch("https://api-nodejs-todolist.herokuapp.com/user/me", option)
    .then((response) => response.json())
    .then((e) => {
      getid(e.id);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

function Login() {
  const [id, setid] = useState();
  const apitodolist = "https://api-nodejs-todolist.herokuapp.com/user/login";
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  // đăng nhập
  const signin = (e) => {
    e.preventDefault();
    const data = { email: email, password: password };
    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    };
    function loginuser(callback) {
      fetch(apitodolist, option)
        .then((response) => response.json())
        .then((e) => {
          getid(e.id);
        })
        .then((callback) => {
          localStorage.setItem("token", callback.token);
          navigate("/home");
        })
        .catch((error) => {
          console.error("Error:", callback);
        });
    }
    loginuser(data);
  };
  // tạo tài khoản

  return (
    <div className="container">
      <h2>Đăng Nhập</h2>
      <form>
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
          <div className="checkbox">
            <label>
              <input type="checkbox" /> Remember me
            </label>
          </div>
          <button className="btn btn-default" onClick={signin}>
            Đăng Nhập
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
