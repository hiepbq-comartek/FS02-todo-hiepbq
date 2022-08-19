import style from './style.module.css'
import './App.css';
import { useState } from 'react'

// data
function App() {
  let time = new Date();
  let times = `${time.getFullYear()}/${time.getMonth() + 1}/${time.getDay()}`
  console.log(times)
  const [date, setdate] = useState(times);

  const type = 'checkbox';
  const easy = {
    id: 1,
    text: 'da lam'
  }
  const medium = {
    id: 2,
    text: 'chua lam'
  }
  // const $$ = document.querySelectorAll.bind(document)
  const ivalues = [easy, medium];
  const ivalue = ivalues.map(ivalue => {
    return ivalue.text
  })
  const [ischecked, setchecked] = useState(1);
  const [isjob, setisjob] = useState();
  const [jobs, setjob] = useState([{
    data: '',
    id: '',
    text: '',
    date: times
  }])
  // heandle
  const heandleclick = () => {
    setjob([...jobs, { data: isjob, id: ischecked, text: ivalue, date: times }]);
    return jobs
  };
  const clearheandle = () => {
    setjob([...jobs,
    ])
  }
  function getAPi() {
    const option = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token')
      },
      body: JSON.stringify(input),
    }
    fetch('https://api-nodejs-todolist.herokuapp.com/user/me', option)
      .then((response) => {
        // regíter success -> save token, navigate....
        return response.json();


      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  return (
    <div id={style.todo_block} >
      <span id={style.heandle_text}>To do list react basic</span>
      <input id={style.input_add}
        placeholder='Việc cần làm'
        onChange={e => setisjob(e.target.value)}

      />
      <div id={style.input_block}>
        <ul id={style.type_block}>
          {ivalues.map((ivalue, index) => {
            return <li key={index} id={style.type_li}>
              <input
                checked={ischecked === ivalue.id}
                onChange={() => { setchecked(ivalue.id) }}
                type={type} />{ivalue.text}
            </li>
          })}
        </ul>
        <button onClick={heandleclick} id={style.headle_click}>Xác Nhận</button>
      </div>
      <span id={style.note}>Note :</span>
      <ul id={style.note_block}>
        {jobs.map((job, index) => {
          return (
            <li key={index} id={style.note_text}>
              <span id={style.text_note}>{job.data}</span>
              <div>{job.date}</div>
              <div id='lever' className={style.lever_block}>{job.text[job.id - 1]}</div>
              <div>
                <button onClick={clearheandle} className='clearjob'>Xóa</button>
              </div>
              <ion-icon id={style.icon_close} name="close-circle-outline"></ion-icon>
            </li>
          )
        })}
      </ul>
    </div>

  );
}

export default App;


