import { useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';
const URL = 'http://localhost/shoppingList/';

function App() {
  const [task,setTask] = useState('');
  const [tasks,setTasks] = useState([]);
  const [amount, setAmount] = useState('');

  useEffect(() => {
    axios.get(URL)
      .then((response) => {
        setTasks(response.data);
      }).catch(error => {
        alert(error.response ? error.response.data.error : error);
      });
  }, [])
  
  function save(e) {
    e.preventDefault();
    const json = JSON.stringify({description:task});
    axios.post(URL + 'add.php',json, {
      headers: {
        'Content-Type' : 'application/json'
      }
    })
    .then((response) => {
      setTasks(tasks => [...tasks,response.data]);
      setTask('');
    }).catch(error => {
      alert(error.response.data.error);
    })
  }

  function remove(id) {
    const json = JSON.stringify({id:id})
    axios.post(URL + 'delete.php', json, {
      headers: {
        'Content-type' : 'application/json'
      }
    })
    .then((response) => {
      const newListWithoutRemoved = tasks.filter((item) => item.id !== id);
      setTasks(newListWithoutRemoved);
    }).catch (error => {
      alert(error.response ? error.response.data.error : error);
    })
  }
 
  
  return (
    <div className='container'>
      <h3>Shopping list</h3>
      <form onSubmit={save}>
        <label>New item</label>
        <input value={task} placeholder='Add a new task' onChange={e => setTask(e.target.value)} />
        <input value={amount} placeholder='type amount' onChange={e => setAmount(e.target.value)} />
        <button>Add</button>
      </form>
      <ol>
        {tasks?.map(task =>(
          <li key={task.id}>
            {task.description}
          <a href='#' className='delete' onClick={() => remove(task.id)}>
            Delete
            </a>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default App;

