import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Game from './pages/Game';
import Result from './pages/Result';
import { GameProvider } from './GameContext';

const APP_NAME = "pokemon-quiz-frontend"

const App = () => {
  return (
    <GameProvider>
      <Router >
        <Routes>
          <Route path={APP_NAME + '/'} element={<Home />} />
          <Route path={APP_NAME + '/game'} element={<Game />} />
          <Route path={APP_NAME + '/result'} element={<Result />} />
        </Routes>
      </Router>
    </GameProvider>
  );
};

export default App;
