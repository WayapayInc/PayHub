import { Mail, Home, Send, AlignRight} from 'react-feather'

export default [
  {
    id: 'home',
    title: 'Home',
    icon: <Home size={20} />,
    navLink: '/dashboard'
  },
  {
    id: 'sendMoneyPage',
    title: 'Send Money',
    icon: <Send size={20} />,
    navLink: '/send-money'
  },
  {
    id: 'transactionsPage',
    title: 'Transactions',
    icon: <AlignRight size={20} />,
    navLink: '/transactions'
  }
]
