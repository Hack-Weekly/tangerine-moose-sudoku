import React, { useState } from "react";

function Menubar({ game, setGame }) {
  const [activeTab, setActiveTab] = useState("Play");
  const isPlay = activeTab === "Play";
  const isGame = Boolean(game);

  function handleTabClick(tabName) {
    setActiveTab(tabName);
  }

  function handleDifficultyClick(difficulty) {
    if (isGame) {
      setGame("");
      window.confirm("Game is already in progress, do you want to continue?");
    }
    setGame(difficulty);
  }

  return (
    <>
      <h1 className="text-white font-semibold text-lg">Choose your difficulty and start playing</h1>
      {/* <div className="tabs">
        <a
          className={`tab tab-bordered tab-md ${
            activeTab === "Play" ? "tab-active" : ""
          }`}
          onClick={() => handleTabClick("Play")}
        >
          Play 
        </a>
        <a
          className={`tab tab-bordered tab-md ${
            activeTab === "Solution" ? "tab-active" : ""
          }`}
          onClick={() => handleTabClick("Solution")}
        >
          Find Solution
        </a>
      </div> */}
      {isPlay && (
        <DifficultyButtons handleDifficultyClick={handleDifficultyClick} />
      )}
    </>
  );
}

function DifficultyButtons({ handleDifficultyClick }) {
  return (
    <div className="flex justify-center space-x-4 my-4">
      <button
        onClick={() => handleDifficultyClick("easy")}
        className="btn bg-opacity-25 hover:bg-opacity-100 hover:bg-blue-300 bg-blue-500 border-white text-white border-0 btn-primary"
      >
        Easy
      </button>
      <button
        onClick={() => handleDifficultyClick("medium")}
        className="btn bg-opacity-50 hover:bg-opacity-100 hover:bg-blue-300 bg-blue-500 border-white text-white border-0 btn-primary"
      >
        Medium
      </button>
      <button
        onClick={() => handleDifficultyClick("hard")}
        className="btn bg-opacity-75 hover:bg-opacity-100 hover:bg-blue-300 bg-blue-500 border-white text-white border-0 btn-primary"
      >
        Hard
      </button>
    </div>
  );
}

export default Menubar;
