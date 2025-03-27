import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const ThemeSwitcher = () => {
  const theme = useSelector((state) => state.userReducer.theme);

  useEffect(() => {
    document.documentElement.classList.remove(
      'theme-blue', 
      'theme-green', 
      'theme-red', 
      'theme-purple'
    );

    document.documentElement.classList.add(`theme-${theme}`);
  }, [theme]);

  return null; 
};

export default ThemeSwitcher;