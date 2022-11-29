export default function ChartsComponent({chartsState}){
    return(
        <div id="charts" style={{
            width: window.parent.innerWidth,
            height: window.parent.innerHeight,
            backgroundColor: 'whitesmoke',
            display: 'flex',
            flexDirection: 'column',
            left: window.parent.innerWidth,
            top:0,
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden'
        }}>
        {chartsState.chartsText}
      </div>
    )
}