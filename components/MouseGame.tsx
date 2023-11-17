import React, { useState, useEffect } from 'react';
import Hole from './Hole';
import Mouse from './Mouse';
import Hammer from './Hammer';

interface MouseGameProps {
  difficulty: 'easy' | 'normal' | 'hard';
}

const MouseGame: React.FC<MouseGameProps> = ({ difficulty }) => {
  const [score, setScore] = useState(0);
  const [mice, setMice] = useState<number[]>([]);
  const [gameActive, setGameActive] = useState(false);

  useEffect(() => {
    let mouseAppearanceInterval: NodeJS.Timeout | null = null;

    const handleMouseAppearance = () => {
      console.log('Souris apparue !');
    
      const availableHoles = Array.from({ length: 9 }, (_, i) => i); // Créer un tableau d'indices disponibles [0, 1, 2, ..., 8]
      const randomHoleIndexes: number[] = [];
    
      while (randomHoleIndexes.length < (difficulty === 'easy' ? 1 : difficulty === 'normal' ? 2 : 3)) {
        const randomIndex = Math.floor(Math.random() * availableHoles.length);
        const selectedHoleIndex = availableHoles.splice(randomIndex, 1)[0]; // Retirer un indice aléatoire des trous disponibles
    
        randomHoleIndexes.push(selectedHoleIndex);
      }
    
      console.log('Indices des trous pour les souris :', randomHoleIndexes);
    
      setMice(randomHoleIndexes);
    };

    const handleMouseDisappearance = () => {
      console.log('Souris disparue !');
      setMice([]);
    };

    if (gameActive) {
      mouseAppearanceInterval = setInterval(() => {
        handleMouseAppearance();
        setTimeout(handleMouseDisappearance, 2000);
      }, difficulty === 'easy' ? 5000 : difficulty === 'normal' ? 3000 : 2000);
    }

    return () => {
      if (mouseAppearanceInterval) {
        clearInterval(mouseAppearanceInterval);
      }
    };
  }, [difficulty, gameActive]);

  const handleHoleClick = (index: number) => {
    if (mice.includes(index)) {
      const numberOfMice = mice.filter((mouseIndex) => mouseIndex === index).length;
      console.log(`Souris(s) trouvée(s) au trou ${index} ! Score +${numberOfMice}`);
      setScore((prevScore) => prevScore + numberOfMice);
      setMice((prevMice) => prevMice.filter((mouseIndex) => mouseIndex !== index));
    } else {
      console.log(`Aucune souris trouvée au trou ${index} ! Score -1`);
      setScore((prevScore) => Math.max(prevScore - 1, 0));
    }
  };

  const handleMouseClick = () => {
    console.log('Souris cliquée ! Score +1');
    setScore((prevScore) => prevScore + 1);
    setMice([]);
  };

  const handleContinue = () => {
    console.log('Continuer le jeu');
    setScore(0);
    setGameActive(true);
    setMice([]);
  };

  const handleQuit = () => {
    const confirmQuit = window.confirm('Êtes-vous sûr de vouloir quitter le jeu ?');

    if (confirmQuit) {
      console.log('Jeu quitté');
      setGameActive(false);
    }
  };

  return (
    <div className="flex flex-wrap justify-center items-center h-screen">
      {[...Array(9)].map((_, index) => (
        <div key={index} onClick={() => handleHoleClick(index)}>
          <Hole />
          {mice.includes(index) && <Mouse onClick={handleMouseClick} />}
        </div>
      ))}
      <Hammer />
      <div className="fixed bottom-0 left-0 w-full bg-gray-200 p-4">
        <p>Score: {score}</p>
        {score >= 15 ? (
          <div>
            <p>Voulez-vous continuer ?</p>
            <button onClick={handleContinue}>Continuer</button>
            <button onClick={handleQuit}>Quitter</button>
          </div>
        ) : (
          <p>Jeu en cours...</p>
        )}
      </div>
    </div>
  );
};

export default MouseGame;
