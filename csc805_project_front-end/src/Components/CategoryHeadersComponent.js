import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import '../styles/header.css';

export const CategoryHeadersComponent = ({ radios, Category, SetCategory }) => {
  return (
    <ButtonGroup className='buttongroup'>
      {radios.map((radio, idx) => (
        <ToggleButton
          key={idx}
          id={`radio-${idx}`}
          type="radio"
          variant={'outline-success'}
          name="radio"
          value={radio.value}
          checked={Category === radio.value}
          onChange={(e) => SetCategory(e.currentTarget.value)}
        >
          {radio.name}
        </ToggleButton>
      ))}
    </ButtonGroup>
  )
}