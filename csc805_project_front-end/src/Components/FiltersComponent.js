import React from "react";
import Button from 'react-bootstrap/Button';

export default function FiltersComponent({chartsDispatch}){


    return(
        <div  id="filters" style={{
            width: 0.3*window.parent.innerWidth,
            height: window.parent.innerHeight,
            backgroundColor: 'whitesmoke',
            display: 'flex',
            flexDirection: 'column',
            left: 0.7*window.parent.innerWidth,
            top:0,
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden'
        }}>
            <Button as="a" variant="primary" onClick={()=>{
              window.scrollTo(window.parent.innerWidth,0)
              chartsDispatch({
                type: 'changeChartText'
              })
            }} >
                Visualize Charts
            </Button>
        </div>
    )
}