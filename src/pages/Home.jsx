import GameOptionCard from "../components/GameOptionCard";

const Home = () => {
    return (
        <div className="flex justify-center">
          {/* container */}
          <div className="card">
            <h1 className="flex justify-center">ポケモン英語クイズ</h1>
            <div className="flex justify-center space-x-6">
              <GameOptionCard play_mode={"180seconds"} />
              <GameOptionCard play_mode={"300seconds"} />
            </div>
          </div>
        </div>
      ); 
};

export default Home;
