// get user media none
const link = "https://api-nodejs-todolist.herokuapp.com";
// upload img oke
export let uploadimg = (img, name) => {
  const formData = new FormData();

  formData.append("avatar", img, name);
  const option = {
    method: "POST",
    headers: {
      // "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: formData,
    redirect: "follow",
  };
  fetch("https://api-nodejs-todolist.herokuapp.com/user/me/avatar", option)
  .then((data)=>console.log(data))
    .then((data) => (data.success ? alert("Thêm ảnh thành công") : alert("lỗi")))
    .catch((error) => console.log(error));
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
    .then((data) => (data.success ? alert("sửa thành công") : alert("lỗi")));
};

// put taskbyCompleted oke
export let PutTaskbyCompleted = (data, id, setusecheck) => {
  const option = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  fetch(`https://api-nodejs-todolist.herokuapp.com/task/true`, option)
    .then((res) => res.json())
    .then((data) => setusecheck(data.completed))
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
//get Get Task by Pagination
export let gettaskbtpag = () => {
  const option = {
    method: "Get",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
  fetch(
    "https://api-nodejs-todolist.herokuapp.com/task?limit=2&skip=10",
    option
  )
    .then((res) => res.json())
    .then((data) => console.log(data));
};
export let deleteimg = () => {
  const option = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
  fetch(
    "https://api-nodejs-todolist.herokuapp.com/user/me/avatar",
    option
  ).then(
    (data) => console.log(data)
    // data.success === "true"
    //   ? alert("ảnh chưa bị xóa")
    //   : alert("ảnh đã xóa thành công")
  );
};
export let seletecedit = () => {
  const option = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
  fetch(
    "https://api-nodejs-todolist.herokuapp.com/task?limit=2&skip=10",
    option
  ).then(
    (data) => console.log(data)
    // data.success === "true"
    //   ? alert("ảnh chưa bị xóa")
    //   : alert("ảnh đã xóa thành công")
  );
};
