import React,{Fragment, useState, useEffect} from "react";
import ReactDOM from "react-dom";
import InputField from "./components/InputField";
import "../css/styles.css";

const App = () => {
    
    const [newTask,setnewTask] = useState("");

    const [tasksRemaining, setTasksRemaining] = useState("");

    const [tasksCompleted, setTasksCompleted] = useState("");

   const onInputChange = event => {
        setnewTask(event.target.value);
    }
    
    const [tasks,setTasks] = useState([
        {task: "Wash the car",isComplete:false},
        {task: "Do Gardening",isComplete:true},
        {task: "Buy Groceries",isComplete:false}
    ])

     useEffect(() => { 
        setTasksRemaining(tasks.filter(task => !task.isComplete).length) 
        });

      useEffect(() => { 
        setTasksCompleted(tasks.filter(task => task.isComplete).length) 
      });

    const addTask = () => {
        const taskObject = {
            task : newTask,
            isComplete:false
        };
       //setTasks(tasks.concat(taskObject)) //method 1
       setTasks([...tasks,taskObject]); //method 2
    }

    const toggleTask = (index) => {
        setTasks(
            tasks.map((task,taskIndex) => {
                if(taskIndex === index) {
                    return {
                        ...task,
                        isComplete: !task.isComplete,
                       };
                }
                return task;
            })
        )
    }

   
const deleteTask = (index) => {
        const newdeleteTask = [...tasks];
        newdeleteTask.splice(index, 1);
        setTasks(newdeleteTask);
    }

return (
    <Fragment>
        <h1 className ="heading">ToDoList App</h1>
        <InputField newTask={newTask} onInputChange = {onInputChange} addTask = {addTask}
        />
          
        <ul>
                {tasks.map((taskObject,index) => {
                 
                 const clickedTask = () => {
                     toggleTask(index);
                 }
                
                 return ( 
                    
                    <p  key={index} className="task">
                        {taskObject.task}  <button onClick = {clickedTask} className="tick"> {taskObject.isComplete?  "✔️" :"⏲️"}</button>
                        <button className="tick" onClick = {() => deleteTask(index)} >🗑️</button>
                      </p> 
                    
                    );
                })}
            </ul>
           <button className="header">Pending tasks ({tasksRemaining})</button> 
            <button className="header">Completed tasks ({tasksCompleted})</button>
        </Fragment>
    );}
            
ReactDOM.render(<App />,document.querySelector("#app-root"));