function Updateprofile() {
  useEffect(() => {
    const option = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(str),
    };
    fetch("https://api-nodejs-todolist.herokuapp.com/user/me", option)
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);
  return (
    <div class="dropdown">
      <button
        type="button"
        class="btn btn-primary dropdown-toggle"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        data-bs-auto-close="outside"
      >
        thông tin cá nhân
      </button>
      <form class="dropdown-menu p-4">
        <div class="mb-3">
          <label for="exampleDropdownFormEmail2" class="form-label">
            Email address
          </label>
          <input
            type="text"
            class="form-control"
            id="exampleDropdownFormEmail2"
            placeholder="email@example.com"
          />
        </div>
        <div class="mb-3">
          <label for="exampleDropdownFormPassword2" class="form-label">
            Password
          </label>
          <input
            type="number"
            class="form-control"
            id="exampleDropdownFormPassword2"
            placeholder="Password"
          />
        </div>
        <div class="mb-3">
          <div class="form-check">
            <input
              type="checkbox"
              class="form-check-input"
              id="dropdownCheck2"
            />
          </div>
        </div>
        <div class="mb-3">
          <label for="exampleDropdownFormEmail2" class="form-label">
            Age
          </label>
          <input
            type="number"
            class="form-control"
            id="exampleDropdownFormEmail2"
            placeholder="Age"
          />
        </div>
        <button type="submit" class="btn btn-primary">
          Sign in
        </button>
      </form>
    </div>
  );
}
export default Updateprofile;
