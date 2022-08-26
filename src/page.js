import React, { useEffect, useState, memo } from "react";

function Page({ data, setinerface,load }) {
  const [pagenum, setpagenum] = useState(0);
  const [skip, setskip] = useState(1);

  useEffect(() => {
    setskip(pagenum * 10 + 1);

    const option = {
      method: "get",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    fetch(
      `https://api-nodejs-todolist.herokuapp.com/task?limit=10&skip=${skip}`,
      option
    )
      .then((res) => res.json())
      .then((datas) => setinerface(datas.data));
  }, [data]);
  const numberpage = [];
  if (data !== undefined) {
    for (let i = 1; i <= Math.ceil((data.length -10) / 10); i++) {
      numberpage.push(i);
    }
  }
  // console.log(numberpage)
  return (
    <nav>
      <ul className="pagination">
        {numberpage.map((num) => (
          <li key={num} className="page-item">
            <a
              onClick={() => {
                setpagenum(num);
              }}
              className="page-link"
            >
              {num}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
export default memo(Page);
