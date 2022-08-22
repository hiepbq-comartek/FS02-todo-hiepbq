import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function Siginup() {
  const [email, setemail] = useState("");
  const [name, setname] = useState("");
  const [age, setage] = useState("");
  const [password, setpassword] = useState("");
  const apitodolitsnewuser =
    "https://api-nodejs-todolist.herokuapp.com/user/register";
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    const input = { name: name, email: email, password: password, age: age };
    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    };
    fetch(apitodolitsnewuser, option)
      .then((response) => {
        // regíter success -> save token, navigate....
        return response.json(response);
      })

      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="container">
      <h2>Đăng Ký</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Tên:</label>
          <input
            onChange={(e) => setname(e.target.value)}
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="age">Tuổi</label>
          <input
            onChange={(e) => setage(e.target.value)}
            type="number"
            className="form-control"
            id="age"
            placeholder="Enter age"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            onChange={(e) => {
              console.log(e);
              setemail(e.target.value);
            }}
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="pwd">Mật khẩu:</label>
          <input
            onChange={(e) => setpassword(e.target.value)}
            type="password"
            className="form-control"
            placeholder="Enter password"
          />
        </div>
        <div className="form-group">
          <label htmlFor="pwd">Nhập lại mật khẩu:</label>
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
        <button className="btn btn-default">Tạo tài khoản</button>
      </form>
    </div>
  );
}
export default Siginup;
