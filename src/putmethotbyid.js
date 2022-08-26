import { useState, useReducer, useEffect, useLayoutEffect } from "react";
function Putmethort({setidcheck,idcheck , id  }){
        const [Id ,setId] = useState();

        const heandlecheck = ()=>{
            const data = {
                completed: true
            }
            const option = {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(data),
              };
              fetch(`https://api-nodejs-todolist.herokuapp.com/task/${Id}`, option)
                .then((response) => response.json())
                .then((data) => console.log(data));
        }
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
              .then((test) => setidcheck(test.completed))
          }, [test]);
    return(
        <input type='checkbox' checked={idcheck} onChange={()=>heandlecheck(setId(id))} />
    )
}
export default Putmethort