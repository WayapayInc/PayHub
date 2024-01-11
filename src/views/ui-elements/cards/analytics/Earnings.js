import Chart from 'react-apexcharts'
import { Card, CardTitle, CardText, CardBody, Row, Col, Button } from 'reactstrap'

const Earnings = ({ success, userData }) => {
  const firstName = userData ? userData.first_name : 'N/A'
  const options = {
    chart: {
      toolbar: {
        show: false
      }
    },
    dataLabels: {
      enabled: false
    },
    legend: { show: false },
    comparedResult: [-3, 8],
    labels: ['Original Top-Up', 'Current Value'],
    stroke: { width: 0 },
    colors: ['#28c76f33', success],
    grid: {
      padding: {
        right: -20,
        bottom: -8,
        left: -20
      }
    },
    plotOptions: {
      pie: {
        // startAngle: -10,
        donut: {
          labels: {
            show: true,
            name: {
              offsetY: 15
            },
            value: {
              offsetY: -15,
              formatter(val) {
                return `${parseInt(val)} %`
              }
            },
            total: {
              show: true,
              offsetY: 5,
              label: 'Spent',
              formatter(w) {
                return '40%'
              }
            }
          }
        }
      }
    },
    responsive: [
      {
        breakpoint: 1325,
        options: {
          chart: {
            height: 100
          }
        }
      },
      {
        breakpoint: 1200,
        options: {
          chart: {
            height: 120
          }
        }
      },
      {
        breakpoint: 1065,
        options: {
          chart: {
            height: 100
          }
        }
      },
      {
        breakpoint: 992,
        options: {
          chart: {
            height: 120
          }
        }
      }
    ]
  }

  return (
    <Card className='earnings-card'>
      <CardBody>
        <Row>
          <Col xs='6'>
            <h5>Hey {firstName} 👋</h5>
            <CardText className='font-small-3'>You current balance is :</CardText>
            <h3 className='mb-75 mt-2 pt-50'>
              <a href='/' onClick={e => e.preventDefault()}>
                $ 1800
              </a>
            </h3>
            <Button.Ripple color='primary'>Top Up</Button.Ripple>
          </Col>
          <Col xs='6'>
            <Chart options={options} series={[53, 16, 31]} type='donut' height={120} />
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}

export default Earnings
