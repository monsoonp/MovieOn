import { useState, useEffect } from "react";
import styles from "./App.module.css"
// import Button from "./Button"

function App() {
  const [counter, setCounter] = useState(0);
  const [keyword, setKeyword] = useState("");

  //  clean up 
  const [showing, setShowing] = useState(false);
  const onSetShowing = () => setShowing((prev)=>!prev);
  function Hello() {
    useEffect(()=>{
      console.log("I'm here / created!")
      return ()=> console.log("destroyed.")
    }, [])
    return <h1>Hello</h1>;
  }

  const onClick = () => setCounter((prev)=> prev+1);
  const onChange = (event) => {setKeyword(event.target.value)};
  // console.log("I run all the time");

  useEffect(()=>{
    console.log("Call the API...");
  },[])
  
  useEffect(()=>{
      console.log("Counter checked:", counter);
  },[counter])

  useEffect(()=>{
    if (keyword !== "" && keyword.length > 5)
    {
      console.log("Search something... on keyword changes", keyword);
    }
  },[keyword])
  
  return (
    <div>
      <h1 className={styles.title}>Welcome back!</h1>
      {/* <Button text="Continue"/> */}
      <hr />
      <input value={keyword} type="text" placeholder="Search here..." onChange={onChange} />
      <h1>{counter}</h1>
      <button onClick={onClick}>click me</button>

      {/* clean up */}
      <hr />
      {showing ? <Hello />:null}
      <button onClick={onSetShowing}>{showing? "Hide":"show"}</button>
    </div>
  );
}

export default App;
