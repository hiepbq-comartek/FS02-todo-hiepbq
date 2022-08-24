import React from "react";
const Pagenumber = ({ compage, totalpage }) => {
  const Pagenumber = [];
  for (let i = 1; i <= Math.ceil(totalpage / compage); i++) {
    Pagenumber.push(i);
  }
  console.log(Pagenumber);
  return (
    <nav>
      <ul className="pagination">
        {Pagenumber.map((number) => (
          <li key={number} className="pag-item">
            <a href="#" className="page-link">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
export default Pagenumber;
