import { useEffect, useState } from 'react'
import SideBar from './SideBar'
import './App.css'
import './style.css'
import {Filter} from "bad-words";

function App() {

  const [categories, setCategories] = useState<string[]>([])
  const [joke, setJoke] = useState<string>("")
  const [activeBorder, setActiveBorder] = useState<boolean[]>([]);

  useEffect(() => {
      fetch("https://api.chucknorris.io/jokes/categories")
          .then(res => res.json()).then(arr => 
            {
              setCategories(arr)
              setActiveBorder(new Array(arr.length).fill(false));
            }); 

       fetch("https://api.chucknorris.io/jokes/random").then(res => res.json()).then(obj => setJoke(obj.value))   
       
  },[]);


const buttonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  const category = event.currentTarget.id;
 
  if(category==='explicit'){
    setJoke("No explicit content allowed");
    return;
  }

  fetch(`https://api.chucknorris.io/jokes/random?category=${category}`)
    .then(res => res.json())
    .then(obj => {

      const filter = new Filter;
      const cleanJoke = filter.clean(obj.value);
      setJoke(cleanJoke)})
}

const randomJokeResult = (i:number) => {
  const category = categories[i];
 
  if(category==='explicit'){
    setJoke("No explicit content allowed");
    return;
  }

  fetch(`https://api.chucknorris.io/jokes/random?category=${category}`)
    .then(res => res.json())
    .then(obj => {

      const filter = new Filter;
      const cleanJoke = filter.clean(obj.value);
      setJoke(cleanJoke)})
}

const toggleRandomBorder = () =>{
  
  let lastIndex = -1;

  const interval =  setInterval(() => {
      const randomIndex = Math.floor(Math.random() * categories.length);
      lastIndex = randomIndex;
      setActiveBorder((prev) => 
        /*prev.map((val,index) => ( index === randomIndex ? !val : val));*/
        prev.map((_, i) => i === randomIndex)
      );
    },300)

  setTimeout(() => {
    clearInterval(interval); 
    randomJokeResult(lastIndex)}
    ,5000)

};

  return (
    <>

      <div className='mb-3'> 
        <h1>Chuck Norris Joke Generator</h1>
      </div>

      <div className='row ' >

        <div className='col-4'>
          <SideBar categories1 = {categories.slice(0,categories.length /2)} onclick={buttonClick} activeBorder ={activeBorder.slice(0,categories.length / 2)}></SideBar>
        </div>
        
        <div className="col-4 border border-1 border-dark rounded d-flex align-items-center justify-content-between flex-column p-2">
           <h2 id='textContent'>{joke}</h2>
           <button onClick={toggleRandomBorder} className='textStyle text-capitalize'>Random</button>
        </div>

        <div className='col-4'>
          <SideBar categories1 = {categories.slice(categories.length / 2)} onclick={buttonClick} activeBorder ={activeBorder.slice(categories.length / 2)}></SideBar>
        </div>
      </div>

    </>
  )
}

export default App
