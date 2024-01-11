import { Card, CardHeader, CardBody, CardTitle, CardText, CardLink } from 'reactstrap'
import Remit from './remittanace'
const SecondPage = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Send Money </CardTitle>
      </CardHeader>
      <CardBody>
        <CardText>Send money to any country within minutes.</CardText>
        <CardText>     
        </CardText>
      </CardBody>
      <Remit />
    </Card>
  )
}

export default SecondPage
