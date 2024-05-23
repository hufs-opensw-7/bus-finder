import React, { useEffect } from "react";

export function PlayingGame() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "./2048.js"; // 2048.js 파일 경로
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <table id="table"></table>
      <div id="score"></div>
    </div>
  );
}
