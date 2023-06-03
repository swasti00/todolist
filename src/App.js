
import { useRef, useState } from 'react';
import './App.css';

function App() {
  const [toDoList, setToDoList] = useState([]);
  const [currentTask, setCurrentTask] = useState("") 

  const inputTask = useRef(null)

  const deleteTask = (tasktodelete) => {
      setToDoList(toDoList.filter((task) => {
        return task.task !== tasktodelete
      }))
  }

  const completeTask = (tasktocomplete) => {
      setToDoList(toDoList.map((task) => {
        return task.task === tasktocomplete ? 
        {task:tasktocomplete,completed:true} : 
        {task:task.task,completed:task.completed ? true : false}
      }))
  }

  const addTask = () => {
    if (currentTask === "") {
      return
    } else {
      setToDoList([...toDoList,{ task: currentTask, completed: false }])
      inputTask.current.value = ""
      setCurrentTask("")
    }
  }
  return (
    <div className="App">
      <h1>To DO List</h1>
      <div>
        <input ref={inputTask} required type="text" placeholder="Task..." onChange={(event) => {setCurrentTask(event.target.value)}} />
        <button onClick={addTask}>Add</button>
      </div>
      <br />
      <hr />
      <ul>
        {toDoList.map((val,key) => {
          return (
              <div className='task'>
                <li key={key}>{val.task}</li>
                <button onClick={() => {completeTask(val.task)}}>Completed</button>
                <button onClick={() => {deleteTask(val.task)}}>X</button>
                {val.completed ? <h3>Task Completed !!</h3> : <h3>Not yet complete!!</h3>}
              </div>
          ) 
        })}
      </ul>
    </div>
  );
}

export default App;
