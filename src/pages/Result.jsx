import React from 'react';
import { useGameContext } from '../GameContext';
import ResultCard from '../components/ResultCard';

const Result = () => {
  const { state } = useGameContext();

  return (
    <div className='flex justify-center'>
      <ResultCard />
    </div>
  );
};

export default Result;
