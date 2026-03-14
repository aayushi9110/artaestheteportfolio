import { useEffect } from 'react';

const Loader = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      const loader = document.getElementById('loader');
      if (loader) {
        loader.classList.add('gone');
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="loader">
      <div className="ld-logo">Art Aesthete</div>
      <div className="ld-sub">Interior Design · Fine Art</div>
      <div className="ld-bar">
        <div className="ld-fill"></div>
      </div>
    </div>
  );
};

export default Loader;
