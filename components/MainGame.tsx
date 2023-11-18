import HoleComponent from "@/uikit/components/hole";
import MouseComponent from "@/uikit/components/mouse";
import { useEffect, useState } from "react";

const MainGame = () => {
  const [indice, setCurrentIndex] = useState(0);
  const [secondAppear, setSecondAppear] = useState(4000);
  const [score, setScore] = useState(0);

  const getCardGameList = () => {
    const availableHoles = Array.from({ length: 9 }, (_, i) => i);
    return availableHoles;
  };

  const getRandomIndice = () => {
    const randomIndex = Math.floor(Math.random() * cardGameList.length);

    return randomIndex;
  };

  const handleInput = (value: string) => {
    setSecondAppear(Number(value));
  };

  const handleHammer = (type: CardRenderType, index: number) => {
    console.log(type, index);
    if (type === "mouse") {
      if (index === indice) {
        setScore((prev) => prev + 1);
      }
    }
  };

  const cardGameList = getCardGameList();

  useEffect(() => {
    let appearIdTimeout: NodeJS.Timeout | null = null;
    const interval = setInterval(() => {
      if (indice == -1) {
        const indice = getRandomIndice();
        setCurrentIndex(indice);
      } else {
        setCurrentIndex(-1);
        appearIdTimeout = setTimeout(() => {
          setCurrentIndex(getRandomIndice());
        }, 2000);
      }
    }, secondAppear);

    return () => {
      appearIdTimeout && clearTimeout(appearIdTimeout!);
      interval && clearInterval(interval);
    };
  }, [indice, secondAppear]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        width: "150px",
      }}
    >
      <p>Score: {score}</p>
      <input
        style={{ marginBottom: 10 }}
        onChange={(e) => handleInput(e.currentTarget.value)}
      />
      {cardGameList.map((item, index) => (
        <div
          style={{
            borderStyle: "solid",
            borderWidth: "2px",
            borderColor: "black",
            width: 45,
          }}
          key={index}
        >
          <CardGame
            index={item}
            onTap={handleHammer}
            type={item === indice ? "mouse" : "hole"}
          />
        </div>
      ))}
    </div>
  );
};

type CardRenderType = "hole" | "mouse";

interface CardInterface {
  type: CardRenderType;
  index: number;
  onTap: (type: CardRenderType, index: number) => void;
}

const CardGame = ({ type, onTap, index }: CardInterface) => {
  return (
    <div onClick={() => onTap(type, index)}>
      {type === "hole" ? <HoleComponent /> : <MouseComponent />}
    </div>
  );
};
export default MainGame;
