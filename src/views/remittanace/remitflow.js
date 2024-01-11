import { useRef, useState } from 'react'
import Wizard from '@components/wizard'
import { ArrowRight } from 'react-feather'
import Address from './steps-with-validation/Address'
import SocialLinks from './steps-with-validation/BeneficiaryList'
import PersonalInfo from './steps-with-validation/PersonalInfo'
import AccountDetails from './steps-with-validation/AccountDetails'

const WizardHorizontal = () => {
  const [stepper, setStepper] = useState(null)
  const ref = useRef(null)

  const steps = [
    {
      id: 'account-details',
      title: 'Get Quotation',
      subtitle: 'Enter tranfer details',
      content: <AccountDetails stepper={stepper} type='wizard-horizontal'/>
    },
    {
      id: 'Beneficiary Information',
      title: 'Beneficiary Information',
      subtitle: 'Add Recipient Info',
      content: <PersonalInfo stepper={stepper} type='wizard-horizontal'/> 
    },
    {
      id: 'step-address',
      title: 'Summary',
      subtitle: 'Confirm transfer details',
      content: <Address stepper={stepper} type='wizard-horizontal' />

    }
    // {
    //   id: 'social-links',
    //   title: 'Social Links',
    //   subtitle: 'Add Social Links',
    //   content: <SocialLinks stepper={stepper} type='wizard-horizontal' 
          // sharedData={sharedData}// Pass shared data as a prop
      // updateSharedData={setSharedData} // Pass update function as a pro
      // />
    // }
  ]
  // const handleStepChange = (step) => {
  //   console.log('Step changed', step)
  // }

  return (
    <div className='horizontal-wizard'>
      <Wizard instance={el => setStepper(el)} ref={ref} steps={steps} /> 
    </div>
  )
}

export default WizardHorizontal
