import Button from 'react-bootstrap/Button';
export const InputButton = ({children, onClick,style,label})=>{
    return(
        <Button style={{
            alignSelf: 'center',
            ...style
          }} as="a" variant="primary" onClick={onClick}>
                      {children}
                      {label !== undefined ? label : null}
        </Button>
    )
}