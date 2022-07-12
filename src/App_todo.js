import { useState } from "react";


function App() {
  const [toDo, setToDo] = useState("");
  const [toDos, setToDos] = useState([]);

  const onChange = (event) => setToDo(event.target.value);
  const onSubmit = (event) =>{ 
    event.preventDefault();
    console.log(toDo)
    if (toDo === "") {
      return;
    }
    setToDos((currentArray)=>[toDo, ...currentArray]);
    setToDo("");
  }

  console.log(toDos);

  return (
    <div>
      <h1>My Todos ({toDos.length})</h1>
      <form onSubmit={onSubmit}>
      <input value={toDo} onChange={onChange} type="text" placeholder="Write to do list"/>
      <button>Add ToDo List</button>
      </form>
      <hr />
      <ul>
        {toDos.map((item, index)=>{
          return <li key={index}>{item}</li>
        })}
      </ul>
    </div>
  )

}

export default App