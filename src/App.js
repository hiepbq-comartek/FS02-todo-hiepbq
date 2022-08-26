import "./App.css";
import { useState, useReducer, useEffect, useLayoutEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Updateprofile from "./update";
import {  deleteimg } from "./server/data";
import Page from "./page";
import Loading from "./Loading";
import Putmethort from "./putmethotbyid"

const init = {
  job: "",
  jobs: [],
};
const Set = "Set";
const Add = "Add";
const Deletes = "Deletes"; 
const SetJob = (payload) => {
  return {
    type: Set,
    payload,
  };
};
const AddJob = (payload) => {
  return {
    type: Add,
    payload,
  };
};
const deleteJob = (payload) => {
  return {
    type: Deletes,
    payload,
  };
};

// data
function App() {
  const [timg, setimg] = useState({});
  const [profile, setprofile] = useState({});
  const [data, setData] = useState([]);
  const [idcheck,setidcheck] = useState(false)
  const [interFace, setinterFace] = useState([]);
  const [loading, setloading] = useState(true);
  //
  const navigate = useNavigate();
  // delete
  const deletejob = (e) => {
    setloading(true)
    const option = {
      method: "delete",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    fetch(`https://api-nodejs-todolist.herokuapp.com/task/${e} `, option)
      .then((res) => res.json())
      .then((data) => setloading(!data.success));
  };
  // delete img
  useEffect(() => {
    const option = {
      method: "get",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    fetch(
      "https://api-nodejs-todolist.herokuapp.com/task?completed=true",
      option
    )
      .then((res) => res.json())
      .then((data) =>data);
  }, []);
  const Reducer = (state, action) => {
    let newSate;
    switch (action.type) {
      case Set:
        return {
          ...state,
          job: action.payload,
        };
      case Add:
        newSate = {
          ...state,
          jobs: [...state.jobs, action.payload],
          job: "",
        };
        break;
      case Deletes:
        const newJobss = [...state.jobs];
        newJobss.splice(action.payload, 1);
        newSate = {
          ...state,
          jobs: newJobss,
        };
        break;
      default:
        new Error("job detail");
    }
    return newSate;
  };
  // post api
  const handleadd = (data) => {
    dispatch(AddJob(job));
    setloading(true)
    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    };
    fetch("https://api-nodejs-todolist.herokuapp.com/task", option)
    .then(
      (response) => response.json()
    )
    .then((data) => setloading(!data.success))
    .then((data)=>data)
  };
  const [state, dispatch] = useReducer(Reducer, init);
  const { job, } = state;
  //

  function handlesiginout() {
    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(),
    };
    // login out
    fetch("https://api-nodejs-todolist.herokuapp.com/user/logout", option)
      .then((response) => response.json())
      .then((data) =>
        data.success === "true" ? navigate("/home") : navigate("/")
      )
      .then(localStorage.clear());
  }
  const str = {
    description: job,
  };
  //get Api
  useEffect(() => {
    const option = {
      method: "get",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    fetch("https://api-nodejs-todolist.herokuapp.com/task", option)
      .then((res) => res.json())
      // .then((data)=> )
      .then((data) =>{data.data ? setloading(false) : setloading(true);return(setData(data.data))}  )
      .then((test) => test)
  }, [data]);

  const sr = {
    completed: true,
  };

  // get profileuser
  useEffect(() => {
    const option = {
      method: "get",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    fetch(`https://api-nodejs-todolist.herokuapp.com/user/me`, option)
      .then((res) => res.json())
      .then((data) => setprofile(data));
  }, []);
  //getimguser
  useEffect(() => {
    const option = {
      method: "get",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    fetch(
      `https://api-nodejs-todolist.herokuapp.com/user/${profile._id}/avatar`,
      option
    ).then((data) => setimg(data));
  }, [profile]);
  console.log(idcheck)
  return (
    <div className="container mt-100">
      {loading && <Loading />}
      <span id="hello">Xin chào {profile.name} </span>
      <span id="email">email: {profile.email}</span>
      <div id="imguser">
        <img id="img_user" src={timg.url} />
        <button onClick={() => deleteimg()} id="deleimg">
          Xóa ảnh
        </button>
      </div>
      <input
        className="inpt_job"
        value={job}
        onChange={(e) => {
          dispatch(SetJob(e.target.value));
        }}
      />
      <div id="blockprofilde">
        <span></span>
        {<Updateprofile />}
        <a id="butsignout" onClick={handlesiginout}>
          Đăng xuất
        </a>
      </div>
      <button id="butsub" onClick={() => handleadd(str)}>
        submit
      </button>
      <table className="table m-20">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">content</th>
            <th scope="col">date</th>
            <th scope="col">action</th>
          </tr>
        </thead>
        <tbody>
          {interFace !== undefined ? (
            interFace.map((datam, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{datam.description}</td>
                  <td>{datam.updatedAt}</td>
                  <td>
                  <button
                      id="deletetask"
                      onClick={()=>{setidcheck(datam._id)}}
                    >
                      Action
                    </button>
                    <button
                      id="deletetask"
                      onClick={() => deletejob(datam._id)}
                    >
                      Delete
                    </button>
                    <Putmethort setidcheck={setidcheck} idcheck={idcheck} id={datam._id}/>
                  </td>
                </tr>
              );
            })
          ) : (
            <></>
          )}
        </tbody>
      </table>
      <Page data={data} setinerface={setinterFace} load={setloading} />
    </div>
  );
}

export default App;
