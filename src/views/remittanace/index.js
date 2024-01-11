import { Fragment } from 'react'
import { Row, Col } from 'reactstrap'
import RemitFlow from './remitflow'
import WizardModern from './WizardModern'
import WizardHorizontals  from './WizardHorizontal'
const Remit = () => {
    return (
    <Fragment>    
      <div
        style={{
        //   display: 'flex',
          marginLeft: '60px',
          marginRight: '40px',
        //   justifyContent: 'center',
        //   alignItems: 'center',
          minHeight: '100vh'// Ensure the container takes at least the full height of the viewport
        }}
      >
        {/* <RemitFlow/> */}
        <WizardHorizontals />
      </div>
    </Fragment>
    )
}
export default Remit