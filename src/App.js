import "./App.css";
import { useState, useReducer, useEffect, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  const [ischeced, setischeck] = useState(false);
  const [data, setData] = useState([]);
  let time = new Date();
  let times = `${time.getFullYear()}/${time.getMonth() + 1}/${time.getDay()}`;
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

  // useRedurce

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

  //

  //
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
        data.success == "true" ? navigate("/home") : navigate("/")
      )
      .then(localStorage.clear());
  }
  console.log(job);
  // put profile
  function putprofile(data) {
    const option = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    };
    fetch("https://api-nodejs-todolist.herokuapp.com/user/me", option)
      .then((response) => response.json())
      .then((data) => console.log(data));
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
  // Get Task by Completed
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
    console.log(ischeced);
  }, []);

  // update
  function update(e) {
    const option = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    fetch(`https://api-nodejs-todolist.herokuapp.com/task/${e}`, option)
      .then((res) => res.json())
      .then((data) => console.log(data));
  }

  return (
    <>
      <input
        value={job}
        onChange={(e) => {
          dispatch(SetJob(e.target.value));
        }}
      />
      <div id="blockprofilde">
        <img src="" />
        <span></span>
        <button>Chỉnh sửa thông tin</button>
        <button onClick={handlesiginout}>Đăng xuất</button>
      </div>
      <button onClick={() => handleadd(str)}>submit</button>
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
          {data.map((datam, index) => {
            return (
              <tr key={index}>
                <th scope="row">{index}</th>
                <td>{datam.description}</td>
                <td>{datam.updatedAt}</td>
                <td>
                  <button onClick={() => update(datam.id)}>Update</button>
                  <button onClick={() => deletejob(datam._id)}>Delete</button>
                  <input
                    onChange={() => {
                      setischeck(data._id);
                    }}
                    type="radio"
                    checked={ischeced === data._id}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default App;
