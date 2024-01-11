import { useRef, useState } from 'react'
import Wizard from '@components/wizard'
import { ArrowRight } from 'react-feather'
import Address from './steps-with-validation/Address'
import SocialLinks from './steps-with-validation/SocialLinks'
import PersonalInfo from './steps-with-validation/PersonalInfo'
import AccountDetails from './steps-with-validation/AccountDetails'

const WizardHorizontals = () => {
  const [stepper, setStepper] = useState(null)
  const [sharedData, setSharedData] = useState({})// Shared state

  const ref = useRef(null)

  const steps = [
    {
      id: 'account-details',
      title: 'Account Details',
      subtitle: 'Enter Your Account Details.',
      content: <AccountDetails stepper={stepper} type='wizard-horizontal'
      sharedData={sharedData} // Pass shared data as a prop
      updateSharedData={setSharedData} // Pass update function as a prop
      />
    },
    {
      id: 'select-beneficiary',
      title: 'Add Recipient',
      subtitle: 'Beneficiary Info',
      content: <Address stepper={stepper} type='wizard-horizontal' 
      sharedData={sharedData} // Pass shared data as a prop
      updateSharedData={setSharedData} // Pass update function as a prop
      />
    },
    // {
    //   id: 'beneficiary-info',
    //   title: 'Beneficiary Information',
    //   subtitle: 'Choose a beneficiary',
    //   content: <PersonalInfo stepper={stepper} type='wizard-horizontal'
    //   sharedData={sharedData} // Pass shared data as a prop
    //   updateSharedData={setSharedData} // Pass update function as a prop
    //   />
    // },
    {
      id: 'confirm-transaction',
      title: 'Confirm',
      subtitle: 'Confirm transaction details',
      content: <SocialLinks stepper={stepper} type='wizard-horizontal'
      sharedData={sharedData} // Pass shared data as a prop
      // updateSharedData={setSharedData} // Pass update function as a prop
      />
    }
  ]

  return (
    <div className='horizontal-wizard'>
      <Wizard instance={el => setStepper(el)} ref={ref} steps={steps} />
    </div>
  )
}

export default WizardHorizontals
