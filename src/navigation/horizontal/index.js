import { Mail, Home } from 'react-feather'

export default [
  {
    id: 'home',
    title: 'Home',
    icon: <Home size={20} />,
    navLink: '/home'
  },
  {
    id: 'sendMoneyPage',
    title: 'Send Money',
    icon: <Mail size={20} />,
    navLink: '/send-money'
  }
]
