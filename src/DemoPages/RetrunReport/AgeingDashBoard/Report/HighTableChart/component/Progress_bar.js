import React from 'react'
import '../index.css'
const Progress_bar = ({ bgcolor, progress, height,data }) => {

    const Parentdiv = {
        height: height,
        width: '100%',
        backgroundColor: 'whitesmoke',
        display: 'row',
        
        // marginTop:2.5,
        marginBottom:5

        // paddingLeft:'5px'
    }
    

    const Childdiv = {
        height: '100%',
        width: `${progress}%`,
        backgroundColor: `rgb(255,204,0,0.5)`,
        marginTop:'-18%'
        // borderRadius:40,

    }
    const progresstext = {
        color: 'black',
        fontSize: "12px",
        paddingRight:'5px'
       
        // position:'absolute'
      
        // fontWeight: 900
    }

    return (
    //     <div className="container">
    //   <div className="box"></div>
    //   <div className="box overlay"></div>
    // </div>
            <div style={Parentdiv}>
                 <span style={progresstext}>{`${data}`}</span>
            <div style={Childdiv}>
            </div>
               
            </div>

    )
}

export default Progress_bar;
