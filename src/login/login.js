import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './login.css'
function Login() {
    const apitodolist = 'https://api-nodejs-todolist.herokuapp.com/user/login'
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const navigate = useNavigate()
    // đăng nhập
    const signin = (e) => {
        e.preventDefault();
        const data = { email: email, password: password };
        const option = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }
        function loginuser(callback) {
            fetch(apitodolist, option)
                .then((response) => response.json())
                .then((callback) => {
                    navigate('/home')
                })
                .catch((error) => {
                    console.error('Error:', callback);
                });
        }
        loginuser(data)
    }
    // tạo tài khoản

    return (
        <div className="container">
            <h2>Đăng Nhập</h2>
            <form onSubmit={signin}>
                <div>
                    <div className="form-group">
                        <label for="email">Email:</label>
                        <input onChange={e => setemail(e.target.value)}
                            type="email" className="form-control" id="email" placeholder="Enter email" />
                    </div>
                    <div className="form-group">
                        <label for="pwd">Password:</label>
                        <input
                            onChange={e => setpassword(e.target.value)}
                            type="password" className="form-control" id="pwd" placeholder="Enter password" />
                    </div>
                    <div className="checkbox">
                        <label><input type="checkbox" /> Remember me</label>
                    </div>
                    <button className="btn btn-default">Đăng Nhập</button>
                </div>
            </form>
        </div>

    )
}
export default Login