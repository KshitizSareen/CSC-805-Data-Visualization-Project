import Button from 'react-bootstrap/Button';
export const InputButton = ({label, onClick})=>{
    return(
        <Button style={{
            alignSelf: 'center'
          }} as="a" variant="primary" onClick={onClick}>
                      {label}
        </Button>
    )
}