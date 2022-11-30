import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function HomeFilters({chartsDispatch})
{

    const HousingTypesArray=[['Apartment','Condo','House'],['Duplex','Townhouse','Loft'],['Manufactured','Cottage/Cabin','Flat'],['In-law','Land','Assisted Living']]
    return(
        <>
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            marginBottom: '3%',
            width: '90%'
          }}>
                 <p style={{
              alignSelf: 'center',
              marginBottom: '1%'
             }}>Housing Types</p>
            {
              HousingTypesArray.map(typeArray=>{
                return(
                  <Form style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '90%',
                    justifyContent: 'space-evenly'
                  }}>
                    {
                    typeArray.map(type=>{
                      return(
                        <Form.Check
                        label={type}
                        name="group1"
                        type={"checkbox"}
                      />
                      )
                    })
                  }
                  </Form>
                )
              })
            }
            </div>
    
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            marginBottom: '3%',
          }}>
                 <p style={{
              alignSelf: 'center',
              marginBottom: '1%'
             }}>Price</p>
             <div style={{
              display: 'flex',
              alignSelf: 'center',
              justifyContent: 'space-evenly',
             }}>
             <Form.Control type="number" placeholder="Minimum"  style={{
              width: '30%'
             }} />
             <Form.Control type="number" placeholder="Maximum"  style={{
              width: '30%'
             }} />
             </div>
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            marginBottom: '3%',
          }}>
                 <p style={{
              alignSelf: 'center',
              marginBottom: '1%'
             }}>Square Feet</p>
             <div style={{
              display: 'flex',
              alignSelf: 'center',
              justifyContent: 'space-evenly'
             }}>
             <Form.Control type="number" placeholder="Minimum"  style={{
              width: '30%'
             }} />
             <Form.Control type="number" placeholder="Maximum"  style={{
              width: '30%'
             }} />
             </div>
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            marginBottom: '3%',
          }}>
                 <p style={{
              alignSelf: 'center',
              marginBottom: '1%'
             }}>No. of Beds</p>
             <div style={{
              display: 'flex',
              alignSelf: 'center',
              justifyContent: 'space-evenly'
             }}>
             <Form.Control type="number" placeholder="Minimum"  style={{
              width: '30%'
             }} />
             <Form.Control type="number" placeholder="Maximum"  style={{
              width: '30%'
             }} />
             </div>
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            marginBottom: '3%',
          }}>
                 <p style={{
              alignSelf: 'center',
              marginBottom: '1%'
             }}>No. of Baths</p>
             <div style={{
              display: 'flex',
              alignSelf: 'center',
              justifyContent: 'space-evenly'
             }}>
             <Form.Control type="number" placeholder="Minimum"  style={{
              width: '30%'
             }} />
             <Form.Control type="number" placeholder="Maximum"  style={{
              width: '30%'
             }} />
             </div>
          </div>
    
          <Form style={{
            marginBottom: '3%',
            display: 'flex',
            flexDirection: 'column',
            alignSelf: 'center',
          }}>
              <Form.Check
                label="Cats Allowed"
                name="group1"
                type={"checkbox"}
              />
              <Form.Check
                label="Dogs Allowed"
                name="group1"
                type={"checkbox"}
              />
              <Form.Check
                label="Smoking Allowed"
                name="group1"
                type={"checkbox"}
              />
              <Form.Check
                label="WheelChair Access"
                name="group1"
                type={"checkbox"}
              />
              <Form.Check
                label="Electric Vehicle Charge"
                name="group1"
                type={"checkbox"}
              />
              <Form.Check
                label="Comes Furnished"
                name="group1"
                type={"checkbox"}
              />
        </Form>
        <Button style={{
          marginBottom: '3%'
        }} as="a" variant="primary" onClick={()=>{
                  window.scrollTo(0,window.parent.innerHeight)
                  chartsDispatch({
                    type: 'changeChartText'
                  })
                }} >
                    Search Homes
                </Button>
                <Button as="a" variant="primary" onClick={()=>{
                  window.scrollTo(window.parent.innerWidth,0)
                  chartsDispatch({
                    type: 'changeChartText'
                  })
                }} >
                    Visualize Charts
                </Button>
                </>
    )
}