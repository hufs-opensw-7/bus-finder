import playingGame from '../assets/playing_game.png'

function GameCard() {
    return (
        <div className="card bg-base-100 shadow-xl image-full my-8">
            <figure><img src={playingGame} alt="playing game" /></figure>
            <div className="card-body">
            <h2 className="card-title">언제올지 모르는 빨버 기다리기 지쳤다면?</h2>
            <p>기다리면서 2048 한 판 해보자!</p>
            <div className="card-actions justify-end">
                <button className="btn btn-primary">플레이하러 가기</button>
            </div>
            </div>
        </div>
    )
};

export default GameCard;
