import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const useNavbarBackground = () => {
    const location = useLocation();
    const [color, setColor] = useState("transparent");
    const [textColor, setTextColor] = useState("white");
  
    useEffect(() => {
      if (location.pathname === "/") {
        if (textColor) {
          setTextColor("gray" || "white");
        } else {
          setTextColor("white");
        }
      } else {
        setTextColor("black");
        setColor("white");
      }
    }, [location.pathname, color]);
  
    useEffect(() => {
      const changeColor = () => {
        if (window.scrollY >= 90) {
          setColor("#ffffff");
          setTextColor("#000000");
        } else {
          setColor("transparent");
          setTextColor("#ffffff");
        }
      };
      window.addEventListener("scroll", changeColor);
    }, []);

  return { color, textColor };
};

export default useNavbarBackground;
