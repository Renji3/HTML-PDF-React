import React, {useState, useRef, useEffect} from 'react';
import { PDFExport } from '@progress/kendo-react-pdf';
import "./App.css";

import PDFPage from "./PDFPage.js";

import {useContainerSize} from "./hooks/useWindowSize.js"

//USE THIS if you want to use SVGs since normal SVG are not supported
import Icon from "./Components/Icon.js"

const pdfStandardHeight = 842;
const pdfStandardWidth = 595;

function App() {
  let appRef = useRef();
  let resume = useRef();
  let [ saveRatio, setSaveRatio ] = useState(null);

  let dimensions = useContainerSize(appRef);

  let pdfWidth = dimensions.width - dimensions.width * 0.05;
  let scaleRatio = pdfWidth / pdfStandardWidth  ;
  let pdfHeight = ( saveRatio || scaleRatio ) * pdfStandardHeight;
  function transformScale( reset ){
    setSaveRatio(reset ? null : 1);
  }

  async function save(){
    await resume.current.save()
    setTimeout(function() { transformScale(true); }, 1000);
  }

  let prevRatio = useRef(saveRatio);
  useEffect( () => {
    if (prevRatio.current == null && saveRatio == 1){
      save()
    }
    prevRatio.current = saveRatio;
  }, [saveRatio])

  let styles = {
    App:{
      display: "flex",
      alignItems: "center",
      flexGrow: 1,
      flexDirection: "column",
      justifyContent: "flex-start",
      maxWidth: "100vw",
    },
    buttonStyle: {
      margin: "10px",
    },
    resizeContainer: {
      display: "flex",
      alignItems: "center",
      marginBottom: "20px",

      position: "relative",
      top: 0,
      left: 0,
      transform: "scale(" + ( saveRatio || scaleRatio )  + ")",
      transformOrigin: "top",
    },
    pdfContainer: {
      height: pdfStandardHeight,
      width: pdfStandardWidth,
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
    },
    pageContainer: {
      height: pdfStandardHeight + "px",
      width: pdfStandardWidth + "px",
      display: "block",
      boxShadow: '3px 3px 3px #000',
      overflowX: 'hidden',
      overflowY: 'hidden',
      backgroundColor: "white",
    },
    pageBreak: {
      marginTop: "10px",
    },
  }

  let pdfPages = [ (<PDFPage />), ]

  
  return (
    <div ref={appRef} style={{ ...styles.App,  }} className="App">
      <button style={{ ...styles.buttonStyle }} onClick={() => { transformScale() }}>Save</button>
      <div style = {{ ...styles.resizeContainer }}>
        <div style={ {...styles.pdfContainer, } }>
          <PDFExport 
            paperSize="A4"
            forcePageBreak=".page-break"
            fileName="Some.pdf"
            author="Some Author"
            creator="Some Creator"
            keywords="Some Keywords"
            subject=""
            title=""
            producer=""

            ref={resume}
          >
            { pdfPages.map( page => (
              <div><div style={styles.pageContainer}><PDFPage /></div><div style={{ ...styles.pageBreak }} /></div>
            ) ) }
          </PDFExport>
        </div>
      </div>
    </div>
  );
}


export default App;
