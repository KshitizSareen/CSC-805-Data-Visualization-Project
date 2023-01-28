import Button from 'react-bootstrap/Button';
export const InputButton = ({label, onClick,style})=>{
    return(
        <Button style={{
            alignSelf: 'center',
            ...style
          }} as="a" variant="primary" onClick={onClick}>
                      {label}
        </Button>
    )
}