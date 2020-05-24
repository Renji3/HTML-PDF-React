import { useState, useEffect, useRef } from 'react';

export default function useWindowSize() {
  let [dimensions, setDimension] = useState( { width: document.body.clientWidth, height: document.body.clientWidth} );

    useEffect ( () => {
        setDimension({width:  document.body.clientWidth, height: document.body.clientHeight })
        window.addEventListener('resize', (data) => {setDimension({width:  document.body.clientWidth, height: document.body.clientHeight })}); 
    }, [] )

  return dimensions;
}

export function useContainerSize( containerRef ) {
  let [dimensions, setDimension] = useState( { width: 0, height: 0} );

  useEffect ( () => {
    if (containerRef.current){
      setDimension({width:  containerRef.current.offsetWidth , height: containerRef.current.offsetHeight })
      window.addEventListener('resize', (data) => {setDimension({width:  containerRef.current.offsetWidth , height: containerRef.current.offsetHeight })}); 
    }
  }, [containerRef.current] )

  return dimensions;
}
