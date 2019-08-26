//TODO: STEP 1 - Import the useState hook.
import React, { useState, useEffect } from "react";
import "./App.css";
import BottomRow from "./BottomRow";

function App() {
  //TODO: STEP 2 - Establish your applictaion's state with some useState hooks.  You'll need one for the home score and another for the away score.
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [seconds, setSeconds] = useState(900);
  const [isActive, setIsActive] = useState(false);
  const [possession, setPossession] = useState(null);
  const [quarter, setQuarter] = useState(1);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds - 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const handleScore = (team, score) => {
    if (team === 'home') {
      setHomeScore(homeScore + score);
    } else {
      setAwayScore(awayScore + score);
    }
  }

  const toggle = () => {
    setIsActive(!isActive);
  }

  const updateQuarter = () => {
    if (quarter < 4) {
      setQuarter(quarter + 1);
    }
  }

  return (
    <div className="container">
      <section className="scoreboard">
        <div className="topRow">
          <div onClick={() => setPossession('home')} className="home">
            <h2 className="home__name">Lions</h2>

            {/* TODO STEP 3 - We need to change the hardcoded values in these divs to accept dynamic values from our state. */}

            <div className="home__score">{possession === 'home' ? `${homeScore} 🏈` : homeScore}</div>
          </div>
          <div className="timer">{Math.floor(seconds/60)}:{seconds % 60 === 0 ? '00' : seconds % 60}</div>
          <div onClick={() => setPossession('away')} className="away">
            <h2 className="away__name">Tigers</h2>
            <div className="away__score">{possession === 'away'? `${awayScore} 🏈` : awayScore}</div>
          </div>
        </div>
        <BottomRow quarter={quarter}/>
      </section>
      <section className="buttons">
        <div className="homeButtons">
          {/* TODO STEP 4 - Now we need to attach our state setter functions to click listeners. */}
          <button onClick={() => handleScore('home', 7)} className="homeButtons__touchdown">Home Touchdown</button>
          <button onClick={() => handleScore('home', 3)} className="homeButtons__fieldGoal">Home Field Goal</button>
        </div>
        <div className="clock">
          <button onClick={toggle}>{isActive ? 'Stop Clock' : 'Start Clock'}</button>
          <button onClick={updateQuarter}>Q</button>
        </div>
        <div className="awayButtons">
          <button onClick={() => handleScore('away', 7)} className="awayButtons__touchdown">Away Touchdown</button>
          <button onClick={() => handleScore('away', 3)} className="awayButtons__fieldGoal">Away Field Goal</button>
        </div>
      </section>
    </div>
  );
}

export default App;
