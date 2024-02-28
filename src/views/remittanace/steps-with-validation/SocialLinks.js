import { Fragment } from 'react'
import classnames from 'classnames'
import { isObjEmpty } from '@utils'
import { useForm } from 'react-hook-form'
import { User, Check, Star, ArrowLeft, Flag, Phone, CreditCard } from 'react-feather'
import { Table, Card, CardBody, CardText, Button, Badge, Row, Col, Input, InputGroupText } from 'reactstrap'
import '../../../@core/scss/base/pages/app-ecommerce.scss'
import axios from 'axios'
import Avatar from '@components/avatar'
import {handleSuccess, handleError} from '../../extensions/sweet-alert'

const SocialLinks = ({ stepper, type, sharedData }) => {
  const { register, errors, handleSubmit, trigger } = useForm()
  const apiUrl = process.env.REACT_APP_API_URL
  const stateNum = Math.floor(Math.random() * 6),
        states = ['light-success', 'light-danger', 'light-warning', 'light-info', 'light-primary', 'light-secondary'],
        color = states[stateNum]
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Token ${localStorage.getItem('token')}`
  }
  // const amount = 20
  console.log(sharedData)
  const sentamount = sharedData?.quotation?.sent_amount?.amount || 0
  const destinationAmount = sharedData?.quotation?.destination?.amount || 0
  const destinationCurrency = sharedData?.quotation?.destination?.currency || ''
  const fee = sharedData?.quotation?.fee?.amount || 0
  const accountNumber = sharedData?.beneficiary?.account_no || ' '
  const formattedAc = `(${accountNumber.slice(0, 3)}) ${accountNumber.slice(3, 6)}-${accountNumber.slice(6)}`
  const firstname = sharedData?.beneficiary?.firstname || ''
  const lastname = sharedData?.beneficiary?.lastname || ''
  const  service = sharedData?.quotation?.payer?.service?.name || ''
  const  payer = sharedData?.quotation?.payer?.name || ''
  const getInitials = (firstName, lastName) => {
    const firstInitial = firstName ? firstName.charAt(0) : ''
    const lastInitial = lastName ? lastName.charAt(0) : ''
    return `${firstInitial}${lastInitial}`.toUpperCase()
  }
  
  const confrirmTransaction = async () => {
    try {
      const trancast_data = {
        transaction_id: sharedData.transaction.transaction_id
      }
      console.log(trancast_data)
      console.log(typeof sharedData.transaction.transaction_id)
      if ("transaction_id" in sharedData.transaction) {
        const transact_id = sharedData.transaction.transaction_id
        
        console.log("Transact")
        // Make an API call to quotation API
        const transactionResponse = await axios.post(`${apiUrl}remit/confirm-transaction/`, trancast_data, {headers})
        console.log(transactionResponse)
        if (transactionResponse.status === 201) {
          console.log("Thos is fowarded to main function")
          return transactionResponse
        } else if (transactionResponse.status === 400) {
          console.log("TRANSACTION RESPONSE", transactionResponse)
          handleError("Something went wrong. Try again later!")
        }
        //Handle transaction success
      } else {
        console.log("Insufficient balance")
        handleError("Something went wrong. Try again later!")
      }
    } catch (e) {
      handleError(e)
      return e

    }
  }
  const renderSuccess = () => {
    return (
      <div className="content">
        <svg width="400" height="400">
          <circle
            fill="none"
            stroke="#68E534"
            stroke-width="20"
            cx="200"
            cy="200"
            r="190"
            strokeLinecap="round"
            transform="rotate(-90 200 200)"
            className="circle"
          />
          <polyline
            fill="none"
            stroke="#68E534"
            points="88,214 173,284 304,138"
            strokeWidth="24"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="tick"
          />
        </svg>
      </div>
    )
  }

  const onSubmit = async () => {
    try {
      const transactionConfirmation = await confrirmTransaction()
      console.log('Transaction Confirmed', transactionConfirmation)
      // if (transactionResponse.status === 201) {
      //   handleSuccess()
      // } else  if (transactiontionResponse.status === 400) {
      //   const errorMessage = transactiontionResponse.message
      //   handleError(errorMessage)
      // }
      if (transactionConfirmation.data.data.status_message === "CONFIRMED") {
        console.log("YAAAS")
        handleSuccess()
        //redirect user to dashboard page
      } else {
        const errorMessage = transactionConfirmation.data.data.message
        const message = "Something went wrong. Try again later"
        handleError(message)
      }

    } catch (e) {
      console.log(e)

    }
  }
  return (

    <div className='list-view product-checkout'>
      <div className='checkout-options'>
        <Card>
            <CardBody>
              {/* <hr /> */}
              <Row>
                <Col xl='6' md='6' className='d-flex flex-column border-container-lg'>
                  <div className='user-avatar-section'>
                    <div className='d-flex justify-content-start'>
                      <Avatar initials color='light-primary' className='rounded'content={getInitials(firstname, lastname)}
                        contentStyles={{
                          borderRadius: 0,
                          fontSize: 'calc(36px)',
                          width: '100%',
                          height: '100%'
                        }}
                        style={{
                          height: '120px',
                          width: '120px'
                        }}
                      />
                    </div>
                  </div>
                </Col>
                <Col xl='6' md='6' className='mt-2 mt-xl-0'>
                  <div className='user-info-wrapper'>
                    <div className='d-flex flex-wrap align-items-center'>
                      <div className='user-info-title'>
                        <User className='mr-1' size={14} />
                        <CardText tag='span' className='user-info-title font-weight-bold mb-0'>
                          Name:
                        </CardText>
                      </div>
                      <CardText className='mb-0'>
                        {sharedData !== null ? `${firstname}  ${lastname}` : 'Name'}
                      </CardText>
                    </div>
                    <div className='d-flex flex-wrap align-items-center my-50'>
                      <div className='user-info-title'>
                        <Check className='mr-1' size={14} />
                        <CardText tag='span' className='user-info-title font-weight-bold mb-0'>
                          Service:
                        </CardText>
                      </div>
                      <CardText className='text-capitalize mb-0'>
                      {service}
                      </CardText>
                    </div>
                    <div className='d-flex flex-wrap align-items-center my-50'>
                      <div className='user-info-title'>
                        <CreditCard className='mr-1' size={14} />
                        <CardText tag='span' className='user-info-title font-weight-bold mb-0'>
                         Payer :
                        </CardText>
                      </div>
                      <CardText className='text-capitalize mb-0'>
                        {payer}
                      </CardText>
                    </div>
                    <div className='d-flex flex-wrap align-items-center my-50'>
                      <div className='user-info-title'>
                        <Flag className='mr-1' size={14} />
                        <CardText tag='span' className='user-info-title font-weight-bold mb-0'>
                          Country: 
                        </CardText>
                      </div>
                      <CardText className='mb-0'>Kenya</CardText>
                    </div>
                    <div className='d-flex flex-wrap align-items-center'>
                      <div className='user-info-title'>
                        <Phone className='mr-1' size={14} />
                        <CardText tag='span' className='user-info-title font-weight-bold mb-0'>
                          Sent to:
                        </CardText>
                      </div>
                      <CardText className='mb-0'>{formattedAc}</CardText>
                    </div>
                  </div>
                </Col>
              </Row>
              {/* <div className='price-details'>
                <h6 className='price-title'>Beneficiary Details</h6>
                <ul className='list-unstyled'>
                  <li className='price-detail'>
                    <div className='detail-title'>Mercy Thira</div>
                    <div className='detail-amt'></div>
                  </li>
                  <li className='price-detail'>
                    <div className='detail-title'>Kenya</div>
                    <div className='detail-amt discount-amt text-success'>Bank Account</div>
                  </li>
                  <li className='price-detail'>
                    <div className='detail-title'>Equity Bank</div>
                    <div className='detail-amt'>12345678900</div>
                  </li>
                </ul>
              </div> */}
            </CardBody>
        </Card>
      </div>
      <Table responsive>
      <thead>
        <tr>
          <th>Detail</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
      <tr>
          <td>
          <span className='font-weight-bold'>Destination Amount</span>
          </td>
          <td>
            <Badge pill color='light-success' className='mr-1'>
            {`${destinationAmount} ${destinationCurrency}`  }
            </Badge>
          </td>
        </tr>
        <tr>
          <td>
            <span className='align-middle font-weight-bold'>Source Amount</span>
          </td>
          {/* <td>Peter Charles</td> */}
          <td>
            <Badge pill color='light-warning' className='mr-1'>
            {sentamount} USD
            </Badge>
          </td>
        </tr>
        <tr>
          <td>
          <span className='font-weight-bold'>Fee</span>
          </td>
          <td>
            <Badge pill color='light-danger' className='mr-1'>
            {fee} USD
            </Badge>
          </td>
        </tr>
        
        </tbody>
      </Table>
      <hr />
      <div className='d-flex justify-content-between'>
                  <Button.Ripple color='primary' className='btn-prev' onClick={() => stepper.previous()}>
                    <ArrowLeft size={14} className='align-middle mr-sm-25 mr-0'></ArrowLeft>
                    <span className='align-middle d-sm-inline-block d-none'>Edit</span>
                  </Button.Ripple>
                  <Button.Ripple type='submit' color='primary' className='btn-next' onClick={onSubmit}>
                    <span className='align-middle d-sm-inline-block d-none'>Confirm</span>
                    {/* <ArrowRight size={14} className='align-middle ml-sm-25 ml-0'></ArrowRight> */}
                  </Button.Ripple>
                </div>
    </div>
    
  )
}

export default SocialLinks
