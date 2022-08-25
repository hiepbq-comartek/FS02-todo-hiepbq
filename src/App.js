import "./App.css";
import { useState, useReducer, useEffect, useLayoutEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Updateprofile from "./update";
import { PutTaskbyCompleted, deleteimg } from "./server/data";
import Page from "./page";

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
  const [usecheck, setusecheck] = useState(false);
  const [profile, setprofile] = useState({});
  const [ischeced, setischeck] = useState(false);
  const [data, setData] = useState([]);
  const [interFace, setinterFace] = useState([]);

  //
  const navigate = useNavigate();
  // delete
  const deletejob = (e) => {
    const option = {
      method: "delete",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    fetch(`https://api-nodejs-todolist.herokuapp.com/task/${e} `, option)
      .then((res) => res.json())
      .then((data) => console.log(data));
  };
  // get img
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
      .then((data) => console.log(data));
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
  const handleadd = (data, callback) => {
    dispatch(AddJob(job));
    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    };
    fetch("https://api-nodejs-todolist.herokuapp.com/task", option)
      .then((response) => response.json())
      .then((data) => data);
  };
  const [state, dispatch] = useReducer(Reducer, init);
  const { job, jobs } = state;
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
      .then((data) => setData(data.data));
  }, [data]);
  const sr = {
    completed: true,
  };

  useEffect(() => {
    PutTaskbyCompleted(sr, ischeced, setusecheck);
  }, [ischeced]);
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
  return (
    <div className="container mt-100">
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
        <button id="butsignout" onClick={handlesiginout}>
          Đăng xuất
        </button>
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
          {interFace.map((datam, index) => {
            return (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{datam.description}</td>
                <td>{datam.updatedAt}</td>
                <td>
                  <button onClick={() => deletejob(datam._id)}>Delete</button>
                  <input
                    type="checkbox"
                    onChange={() => setischeck(datam._id)}
                    checked={usecheck}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Page data={data} setinerface={setinterFace} />
    </div>
  );
}

export default App;
