// get user media none

const link = "https://api-nodejs-todolist.herokuapp.com";
export let getimg = (id) => {
  const option = {
    method: "get",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
  fetch(`${link}/user/${id}/avatar`, option)
    .then((res) => res.json())
    .then((data) => console.log(data));
};
// upload img
export let uploadimg = (data) => {
  const option = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(data),
  };
  fetch(`${link}/user/me/avatar`, option)
    .then((response) => response.json())
    .then((data) => console.log(data));
};
// putFrpfile oke
export let putFrofile = (data) => {
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
    .then((data) =>
      data.success == true ? alert("sửa thành công") : alert("lỗi")
    );
};

// put taskbyCompleted oke
export let PutTaskbyCompleted = (data) => {
  const option = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
  fetch(`https://api-nodejs-todolist.herokuapp.com/task/${data}`, option)
    .then((res) => res.json())
    .then((data) => console.log(data));
};

//deleteuser
export let deleteuser = () => {
  const option = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
  fetch("https://api-nodejs-todolist.herokuapp.com/user/me", option)
    .then((res) => res.json())
    .then((data) =>
      data.success === "true"
        ? alert("tài khoản chưa bị xóa")
        : alert("tài khoản đã xóa thành công")
    );
};
// deleimg
export let deleimg = () => {
  const option = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
  fetch(`${link}/user/me/avatar`, option)
    .then((res) => res.json())
    .then((data) => console.log(data));
};
// Get Task by Id
export let gettaskbyid = () => {
  const option = {
    method: "Get",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
  fetch(`${link}/user/me/avatar`, option)
    .then((res) => res.json())
    .then((data) => console.log(data));
};
// Get Task by Pagination
export let gettaskbyPa = () => {
  const option = {
    method: "Get",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
  fetch(`${link}/user/me/avatar`, option)
    .then((res) => res.json())
    .then((data) => console.log(data));
};
//
