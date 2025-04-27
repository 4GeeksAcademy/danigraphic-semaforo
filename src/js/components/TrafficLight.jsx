import React, { useState, useEffect } from "react";

const TrafficLight = () => {
  const [color, setColor] = useState("");
  const [autoMode, setAutoMode] = useState(false);
  const [colorsList, setColorsList] = useState(["red", "yellow", "green"]);

  // useEffect: cada 3 segundos cambia color 
  useEffect(() => {
    let interval = null;

    if (autoMode) {
      interval = setInterval(() => {
        setColor(prev => {
          const currentIndex = colorsList.indexOf(prev);
          const nextIndex = (currentIndex + 1) % colorsList.length;
          return colorsList[nextIndex];
        });
      }, 3000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval); 
  }, [autoMode, colorsList]);

  const addPurple = () => {
    if (!colorsList.includes("purple")) {
      setColorsList([...colorsList, "purple"]);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center mt-5">
      {/* Poste */}
      <div style={{ width: "10px", height: "100px", backgroundColor: "black" }}></div>

      {/* Semáforo */}
      <div style={{
        backgroundColor: "black",
        padding: "20px",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
        {colorsList.map((item, index) => (
          <div
            key={index}
            onClick={() => setColor(item)}
            className={`light ${color === item ? "selected" : ""}`}
            style={{ backgroundColor: item }}
          ></div>
        ))}
      </div>

      {/* botones de control */}
      <div className="mt-3">
        <button className="btn btn-primary m-2" onClick={() => setAutoMode(!autoMode)}>
          {autoMode ? "Detener automático" : "Iniciar automático"}
        </button>
        <button className="btn btn-secondary m-2" onClick={addPurple}>
          Agregar púrpura
        </button>
      </div>
    </div>
  );
};

export default TrafficLight;