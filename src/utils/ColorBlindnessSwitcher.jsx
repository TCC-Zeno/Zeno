import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const ColorBlindnessSwitcher = () => {
  const colorBlindness = useSelector((state) => state.userReducer.colorBlindness);

  useEffect(() => {
    document.documentElement.classList.remove(
      'colorblind-protanopia',
      'colorblind-deuteranopia',
      'colorblind-tritanopia',
      'colorblind-achromatopsia'
    );

    if (typeof colorBlindness === "string" && colorBlindness !== "Padrão") {
      document.documentElement.classList.add(`colorblind-${colorBlindness.toLowerCase()}`);
    }
  }, [colorBlindness]);

  return null;
};

export default ColorBlindnessSwitcher;