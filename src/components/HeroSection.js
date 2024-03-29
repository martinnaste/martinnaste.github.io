import React, { useState, useEffect } from 'react';
import '../App.css';
import Gamebox from './Gamebox';
import './HeroSection.css';

const ICONLIST = ["fab fa-js-square", "fas fa-code", "fas fa-code-branch", "fab fa-node-js", "fab fa-free-code-camp", "fas fa-terminal", "fab fa-css3", "fab fa-html5", "fab fa-ethereum", "fab fa-react", "fab fa-python", "fab fa-java"];

function HeroSection() {
  const [showShip, setShowShip] = useState(true);
  const [shipOn, setShipOn] = useState(false);
  const [projectsButton, setProjectsButton] = useState(false);

  const clickMe = "<--- Click Me!"

  // Styling the initial flake  with animation duration randomness
  const myStyle = {"animationDuration":`${Math.floor((Math.random() * (7+1 -4)) +4)}s`}

  const showItems = () => {
    if(window.innerWidth >= 1024 && window.innerHeight >= 800){
      setShowShip(true)
    } else {
      setShowShip(false)
    }

    if(window.innerHeight >= 850 ){
      setProjectsButton(true)
    } else {
      setProjectsButton(false)
    }
  }; 

  const play = () => {
    setShipOn(!shipOn)
    if(shipOn){
      runFlakes();
    }
  }

  useEffect(() => {
    showItems();
  })

  useEffect(() => {
    async function getRecords(){
      const response = await fetch(`https://website-server.mpartynec.repl.co/leaderboard`);
  
      if (!response.ok) {
        console.log("Error with loading leaderboard.");
        return;
      }

      // const loadedRecords = await response.json();
      console.log("Loaded the data all good");
    }
    getRecords()
  }, [])

  window.addEventListener('resize', showItems);

  return (
    <>
      {
        shipOn ? <Gamebox clickShip={play} shipOn={shipOn}/>
        :
        <div id='hero-con' className='hero-container'>
        {/* <img className='bg' src={require("../assets/images/background.png")} alt='MN'/> */}
        <div className="snow-container">
          {/* randomly selecting an icon as the classname for the flake, from the ICONLIST list */}
          <i className={`${ICONLIST[Math.floor(Math.random() * ICONLIST.length)]} flake`} style={{...myStyle}}></i>
        </div>
        <div className="text-container">
          <h1 className='heading'>Martin Nastevski</h1>
          <p className='subheading' id='fewd'>[Front End Web Developer]<i id='icon-fewd'className='fas fa-code'></i></p>
          <p className='subheading' id='be'>[Blockchain Enthusiast]<i id='icon-be'className='fab fa-ethereum'></i></p>
          <p id='info'>This is my website portfolio showcasing what I have built, the technologies I have used, and what I am interested in. Please scroll down!</p>
        </div>
        {projectsButton && <div className='btns'>
          <a className='btn' href='#projects'>Projects</a>
        </div> }
        {showShip && <div className='ship-container'>
          <img className='ship' src={require("../assets/images/ship-blue.png")} alt='ship' onClick={play}></img>
          <h1 className='click-me'>{clickMe}</h1>
        </div> }
      </div>
      }
    </>
  );
}

function createFlake() {
  // cloning the flake node
  const flake = document.querySelector(".flake");
  // console.log(flake);
  const container = document.querySelector(".snow-container");
  if(typeof(flake) !== 'undefined' && flake !== null){
    const clone = flake.cloneNode(true);

    // creating left padding
    clone.style.paddingLeft = Math.random() * 10 + "vh";

    // animation duration between 3-5
    clone.className = ICONLIST[Math.floor(Math.random() * ICONLIST.length)] + " flake";
    clone.style.animationDuration = Math.floor((Math.random() * (7+1 -4)) +4) + "s"; //Math.random() * 5 + 3 + "s";
    clone.style.opacity = Math.random() * 1;
    
    container.append(clone); // adding clone flake to container
  }
}

// to create more flakes decrease 100
var rate;
if(window.innerWidth <= 960){
  rate = 200;
} else {
  rate = 100;
}

const pathname = window.location.pathname
if(pathname === '/'){
  runFlakes();
}

function runFlakes() {
  const s = setInterval(createFlake, rate);

  setTimeout(() => {
    clearInterval(s);
  }, 3000); // flake creation stops after 3000 milliseconds or 3s
}

export default HeroSection;
