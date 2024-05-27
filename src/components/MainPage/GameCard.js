import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import playingGame from "../../assets/playing_game.png";

function GameCard() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/play");
  };

  const [randomText, setRandomText] = useState("");

  useEffect(() => {
    const texts = [
      "버스",
      "빨버",
      "빵차",
      "연인"
    ];
    const randomIndex = Math.floor(Math.random() * texts.length);
    setRandomText(texts[randomIndex]);
  }, []);

  return (
    <div className="card bg-base-100 shadow-xl image-full my-8">
      <figure>
        <img src={playingGame} alt="playing game" />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-lg lg:text-xl">
        언제올지 모르는 {randomText} 기다리기 지쳤다면?
        </h2>
        <p className="text-sm lg:text-base">기다리면서 2048 한 판 해보자!</p>
        <div className="card-actions justify-end">
          <button
            className="btn btn-primary text-xs lg:text-sm"
            onClick={handleClick}
          >
            플레이하러 가기
          </button>
        </div>
      </div>
    </div>
  );
}

export default GameCard;
