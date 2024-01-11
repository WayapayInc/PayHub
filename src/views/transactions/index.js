import { Row, Col, Card, CardHeader, CardBody, CardTitle, CardText, CardLink } from 'reactstrap'
import { Fragment } from 'react'
import Breadcrumbs from '@components/breadcrumbs'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import TableZeroConfig from './TableZeroConfig'

const transactionsPage = () => {
    return (
        <Fragment>
            {/* <Breadcrumbs breadCrumbTitle='Transactions' breadCrumbParent='Transactions' breadCrumbActive='Data' /> */}
            <Row>
                {/* <Col sm='12'>
                <TableServerSide />
                </Col> */}
                <Col sm='12'>
                <TableZeroConfig />
                </Col>
            </Row>
        </Fragment>
    )
}
  
export default transactionsPage