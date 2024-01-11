import { Card, CardBody, CardText, Button } from 'reactstrap'
import medal from '@src/assets/images/illustration/badge.svg'
import Earnings from '../analytics/Earnings'
import { useContext } from 'react'
import { ThemeColors } from '../../../../utility/context/ThemeColors'
const CardMedal = () => {
  const { colors } = useContext(ThemeColors),
    trackBgColor = '#e9ecef'

  return (
    <Card className='card-congratulations-medal'>
      <CardBody>
        <h5>Hey John 👋</h5>
        <CardText className='font-small-3'>You current balance is :</CardText>
        <h3 className='mb-75 mt-2 pt-50'>
          <a href='/' onClick={e => e.preventDefault()}>
            $48.9k
          </a>
        </h3>
        <Button.Ripple color='primary'>Top Up</Button.Ripple>
        {/* <Earnings success={colors.success.main} ></Earnings> */}
        {/* <img className='congratulation-medal' src={medal} alt='Medal Pic' /> */}
      </CardBody>
    </Card>
  )
}

export default CardMedal
