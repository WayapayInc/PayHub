import { useRef, useState } from 'react'
import Wizard from '@components/wizard'
import Address from './steps/Address'
import SocialLinks from './steps/SocialLinks'
import PersonalInfo from './steps/PersonalInfo'
import AccountDetails from './steps/AccountDetails'
import { FileText, User, Send, Link } from 'react-feather'

const WizardModern = () => {
  const [stepper, setStepper] = useState(null)
  const ref = useRef(null)

  const steps = [
    {
      id: 'create-quotation',
      title: 'Get Quotation',
      subtitle: 'Enter transfer Details.',
      icon: <Send size={18} />,
      content: <AccountDetails stepper={stepper} type='wizard-modern' />
    },
    {
      id: 'personal-info',
      title: 'Personal Info',
      subtitle: 'Add recipient',
      icon: <User size={18} />,
      content: <PersonalInfo stepper={stepper} type='wizard-modern' />
    },
    // {
    //   id: 'select-beneficiary',
    //   title: 'Address',
    //   subtitle: 'Add Address',
    //   icon: <FileText size={18} />,
    //   content: <Address stepper={stepper} type='wizard-modern' />
    // },
    {
      id: 'transfer-summary',
      title: 'Transfer Summarry',
      subtitle: 'Confirm Transaction details',
      icon: <FileText size={18} />,
      content: <SocialLinks stepper={stepper} type='wizard-modern' />
    }
  ]

  return (
    <div className='modern-horizontal-wizard'>
      <Wizard
        type='modern-horizontal'
        ref={ref}
        steps={steps}
        instance={el => setStepper(el)}
      />
    </div>
  )
}

export default WizardModern
