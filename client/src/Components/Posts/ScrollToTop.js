import React, { useState, useEffect } from 'react';
//Import de l'icone de flèche via react-icon
import { FaAngleUp } from 'react-icons/fa';

const ScrollToTop = () => {
  //State qui controle la visibilité du bouton scrolltotop
  const [showTopBtn, setShowTopBtn] = useState(false);

  const visibleScroll = () => {
    // Sur true quand l'utilisateur fait défiler 500pixels
    if (window.pageYOffset > 500) {
      setShowTopBtn(true);
    } else {
      setShowTopBtn(false);
    }
  };

  //Fonction pour la gestion onClick qui ramène vers le haut
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  useEffect(() => {
    // Evenement qui définit l'état du state
    window.addEventListener('scroll', visibleScroll);
    return () => {
      window.removeEventListener('scroll', visibleScroll);
    };
  }, []);
  return (
    <div className="top-to-btm">

      {showTopBtn && (
        <FaAngleUp className="icon-position icon-style" onClick={goToTop} />
      )}
    </div>
  );
};
export default ScrollToTop;
