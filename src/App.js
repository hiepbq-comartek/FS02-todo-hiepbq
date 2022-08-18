import { useState,useRef } from 'react';
import './App.css';

function App() {
  let time = new Date();
   const [content,setContent] = useState()
   const[newDate,setNewdate]= useState()
   const [adds,setAdd] = useState([{
    content:'',
    date:''
   }])
   const heandleadd = ()=>{
    setNewdate(time)
    setAdd(
      [
        ...adds,
        {          
          content: content,
          date: newDate
        }
      ]
      
    )
    console.log(adds)
    
   } 
   const deletetodo =()=>{
   setAdd(
    [
      ...adds,
      {
        
      }
    ]
   )
   }
   const oketodo =()=>{
    setAdd(
      [
        ...adds,
        {
          
        }
      ]
     )
   }
  return (
    <div id='app-block'>
     <div>
      <span id='texttodo'>To do list</span>
      <input
        onChange={e => setContent(e.target.value)} 
       />
      <button onClick={heandleadd} id='button_add'>add</button>
     </div>
     <table className="table">
  <thead>
    <tr>
      <th scope="col">#id</th>
      <th scope="col">Content</th>
      <th scope="col">Date</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    {
      adds.map((add,index)=>{
        return(
          <tr key={index}>
          <th scope="row">{index}</th>
             <td>{add.content}</td>
             <td>{add.date}</td>
             <td>
              <button onClick={oketodo}><i className="bi bi-x-lg"></i></button>
              <button onClick={deletetodo}><i className="bi bi-check"></i></button>
             </td>
        </tr>
        )
      })
    }
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
  </tbody>
  </table>
    </div>
  );
}

export default App;
