import React, {useRef} from "react"

const height = 842 + 1;
const width = 595 + 1;

function PDFPage(){
  let styles = {
    contaierStyle: {
      height: height,
      width: width,
    },
  }
  return(
    <div style={styles.contaierStyle}>
      Content
    </div>
  )
}

export default PDFPage
