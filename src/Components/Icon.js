import React, {useState, useRef, useEffect} from "react"

import canvg, {presets} from 'canvg';
import ReactDOMServer from 'react-dom/server';

function Icon(props){
  let canvasRef = useRef(null);
  let canvLoaded = useRef(false);
  let icon = useRef(null);
  
  let size = props.size || "15px";

  let convertSVGToImage = async (htmlString) => {
    // if FontAwesome, run this next part
    htmlString = ReactDOMServer.renderToStaticMarkup( props.icon );    // for both FontAwesome and regular SVG:
    if (canvasRef.current != null ){
      const ctx = canvasRef.current.getContext('2d');
      let canv = await canvg.fromString(ctx, htmlString);
      canv.resize( 1000, 1000  );
      canv.start();
      icon.current = canvasRef.current.toDataURL("image/png");
      canvLoaded.current = true;
    }
  }
  useEffect( () => {
    convertSVGToImage(); 
  }, [])

  return(
    <div> 
      {!canvLoaded.current && 
        <canvas style={{ width: size, height: size, }} ref={canvasRef} style={{ display: false }}/>
      }
      {canvLoaded.current &&
        <img style={{ width: size, height: size, }}alt={ props.name || "icon" } src={icon.current}/>
      }
    </div>
  )
}

export default Icon
