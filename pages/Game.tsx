import React from "react";
import MouseGame from "../components/MouseGame";
import MainGame from "@/components/MainGame";

const Game = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <p> Hole/Hammer game </p>
      <MainGame />
    </div>
  );
};

export default Game;
