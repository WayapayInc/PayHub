import { Card, CardHeader, CardBody, CardTitle, CardText, CardLink, Row, Col } from 'reactstrap'
import CardMedal from './ui-elements/cards/advance/CardMedal'
import OrdersBarChart from './ui-elements/cards/statistics/OrdersBarChart'
import ProfitLineChart from './ui-elements/cards/statistics/ProfitLineChart'
import Earnings from './ui-elements/cards/analytics/Earnings'
import StatsCard from './ui-elements/cards/statistics/StatsCard'
import CompanyTable from './dashboard/ecommerce/CompanyTable'
import { useContext, useEffect, useState} from 'react'
import {ThemeColors} from '../utility/context/ThemeColors.js'
import CardTransactions from './ui-elements/cards/advance/CardTransactions'
import { isUserLoggedIn } from '@utils'
const Home = () => {
  const { colors } = useContext(ThemeColors),
    trackBgColor = '#e9ecef'

  const [token] = useState(localStorage.getItem('token')) 
  const [userData] = useState(JSON.parse(localStorage.getItem('userData')))
  //**Component did mount */
  // const apiUrl = process.env.REACT_APP_API_URL
  // const headers = {
  //   Authorization : `Token ${token}`, // Set the Authorization header with the token
  //   "Content-Type" : "application/json"
  // }

  // useEffect(() => {
  //   axios.get('/account-setting/data').then(response => setData(response.data))
  // }, [])

  return (
    <div id='dashboard-ecommerce'>
      <Row className='match-height'>
        <Col xl='4' md='6' xs='12'>
        <Earnings success={colors.success.main} userData = {userData}/>
        </Col>
        <Col xl='8' md='6' xs='12'>
          <StatsCard cols={{ xl: '3', sm: '6' }} />
        </Col>
      </Row>
      <Row className='match-height'>
        {/* <Col lg='8' md='12'>
          <RevenueReport primary={colors.primary.main} warning={colors.warning.main} />
        </Col> */}
      </Row>
      <Row className='match-height'>
        <Col lg='12' xs='12'>
          <CompanyTable />
        </Col>
        {/* <Col lg='4' md='6' xs='12'>
          <CardMeetup />
        </Col>
        <Col lg='4' md='6' xs='12'>
          <CardBrowserStates colors={colors} trackBgColor={trackBgColor} />
        </Col>
        <Col lg='4' md='6' xs='12'>
          <GoalOverview success={colors.success.main} />
        </Col> */}
        <Col lg='4' md='6' xs='12'>
          {/* <CardTransactions token = {token}/> */}
        </Col>
      </Row>
    </div>
  )
}

export default Home
