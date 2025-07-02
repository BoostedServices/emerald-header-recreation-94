
import { useEffect, useRef } from 'react';

export const usePageAnimation = () => {
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!hasAnimated.current) {
      hasAnimated.current = true;
      
      // Add animation classes to elements with data-animate attribute
      const animatedElements = document.querySelectorAll('[data-animate]');
      
      animatedElements.forEach((element, index) => {
        const animationType = element.getAttribute('data-animate');
        const delay = element.getAttribute('data-delay') || (index * 100);
        
        // Remove any existing animation classes
        element.classList.remove(
          'animate-fade-in-up',
          'animate-fade-in-left', 
          'animate-fade-in-right',
          'animate-scale-in',
          'animate-slide-in-down'
        );
        
        // Add the animation class
        if (animationType) {
          element.classList.add(`animate-${animationType}`);
          
          // Add delay class if specified
          if (delay) {
            const delayClass = `animate-delay-${Math.min(parseInt(delay.toString()), 800)}`;
            element.classList.add(delayClass);
          }
        }
      });
    }
  }, []);
};
