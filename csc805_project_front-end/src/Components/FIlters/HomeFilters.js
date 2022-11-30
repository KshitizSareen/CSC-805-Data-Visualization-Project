import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function HomeFilters({chartsDispatch})
{

    const HousingTypesArray=[['Apartment','Condo','Manufactured','Duplex'],['Townhouse','Loft','House','Cottage/Cabin'],['Flat','In-law','Land','Assisted Living']]
    const booleanFilters=[["Cats Allowed","Dogs Allowed","Smoking Allowed"],["Wheelchair Access","Electric Vehicle Charge","Comes Furnished"]]
    return(
        <div style={{
          height: '90%',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}>
                           <p style={{
              alignSelf: 'center',
              marginBottom: '1%'
             }}>Housing Types</p>
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            marginBottom: '3%',
            width: 0.3*window.parent.innerWidth,
            justifyContent: 'space-evenly'
          }}>
            {
              HousingTypesArray.map(typeArray=>{
                return(
                  <Form style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
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
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            marginBottom: '3%',
            width: 0.3*window.parent.innerWidth,
            justifyContent: 'space-evenly'
          }}>
            {
              booleanFilters.map(typeArray=>{
                return(
                  <Form style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
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
        <Button style={{
          alignSelf: 'center'
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
                </div>
    )
}