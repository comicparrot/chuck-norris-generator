import { useEffect, useState } from 'react'
import SideBar from './SideBar'
import './App.css'
import './style.css'
import {Filter} from "bad-words";

function App() {

  const [categories, setCategories] = useState([])
  const [joke, setJoke] = useState("")
  

  useEffect(() => {
      fetch("https://api.chucknorris.io/jokes/categories")
          .then(res => res.json()).then(arr => setCategories(arr)); 

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

  return (
    <>

      <div className='mb-3'> 
        <h1>Chuck Norris Joke Generator</h1>
      </div>

      <div className='row ' >

        <div className='col-4'>
          <SideBar categories1 = {categories.slice(0,categories.length /2)} onclick={buttonClick}></SideBar>
        </div>
        
        <div className="col-4 border border-1 border-dark rounded d-flex align-items-center justify-content-center">
           <h2 id='textContent'>{joke}</h2>
        </div>

        <div className='col-4'>
          <SideBar categories1 = {categories.slice(categories.length / 2)} onclick={buttonClick}></SideBar>
        </div>
      </div>

    </>
  )
}

export default App
