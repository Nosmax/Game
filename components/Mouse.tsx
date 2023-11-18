// Mouse.tsx
import React from "react";

const Mouse = ({ onClick }: { onClick: () => void }) => {
  return (
    <div
      style={{
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        backgroundColor: "gray",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      Souris
    </div>
  );
};

export default Mouse;
