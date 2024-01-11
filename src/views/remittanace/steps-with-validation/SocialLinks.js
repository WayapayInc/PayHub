import { Fragment } from 'react'
import classnames from 'classnames'
import { isObjEmpty } from '@utils'
import { useForm } from 'react-hook-form'
import { X, Heart, Star, ArrowLeft, ArrowRight } from 'react-feather'
import { Table, Card, CardBody, CardText, Button, Badge, InputGroup, InputGroupAddon, Input, InputGroupText } from 'reactstrap'
import '../../../@core/scss/base/pages/app-ecommerce.scss'
import axios from 'axios'

const SocialLinks = ({ stepper, type, sharedData }) => {
  const { register, errors, handleSubmit, trigger } = useForm()
  const apiUrl = process.env.REACT_APP_API_URL
  
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Token ${localStorage.getItem('token')}`
  }
  // console.log(localStorage.getItem('token'))
  const confrirmTransaction = async () => {
    const trancast_data = {
      transaction_id: sharedData.transaction.transaction_id
    }
    try {
      console.log(typeof sharedData.transaction.transaction_id)
      if ("transaction_id" in sharedData.transaction) {
        const transact_id = sharedData.transaction.transaction_id
        
        console.log("Transact")
        // Make an API call to quotation API
        const transactiontionResponse = await axios.post(`${apiUrl}remit/confirm-transaction/`, trancast_data, {headers})
        console.log("TRANSACTION RESPONSE", transactiontionResponse)
        return transactiontionResponse
        //Handle transaction success
      } else {
        console.log("Insufficient balance")
      }
    } catch (e) {
      console.log(e)

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
      if (transactionConfirmation.data.data.status_message === "CONFIRMED") {
        console.log("YAAAS")
        alert("Transaction Confirmed. We are processing the request ")
        // renderSuccess()
        // Handle Transaction Success
        //add a success animation confrimation card

        //redirect user to dashboard page

      }

    } catch (e) {
      console.log(e)

    }
  }
  return (
    // <Fragment>
    
    
    <div className='list-view product-checkout'>
      {/* <h6 className='price-title'>Transfer Details</h6> */}
      {/* <hr /> */}
      <Table responsive>
      <thead>
        <tr>
          <th>Detail</th>
          <th>Amount</th>
          {/* <th>Users</th>
          <th>Status</th>
          <th>Actions</th> */}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <span className='align-middle font-weight-bold'>Amount</span>
          </td>
          {/* <td>Peter Charles</td> */}
          <td>
            <Badge pill color='light-warning' className='mr-1'>
              5 USD
            </Badge>
          </td>
        </tr>
        <tr>
          <td>
          <span className='font-weight-bold'>Fee</span>
          </td>
          <td>
            <Badge pill color='light-danger' className='mr-1'>
            1 USD
            </Badge>
          </td>
        </tr>
        <tr>
          <td>
          <span className='font-weight-bold'>Destination Amount</span>
          </td>
          <td>
            <Badge pill color='light-success' className='mr-1'>
            757 KES
            </Badge>
          </td>
        </tr>
        </tbody>
        </Table>
        {/* <h5 className='mb-0'>Confirm</h5>
        <small>Verify transfer details</small> */}
        <div className='checkout-options'>
      <Card>
          <CardBody>
            <hr />
            <div className='price-details'>
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
                  {/* <div className='detail-amt'>123465768900</div> */}
                </li>
                {/* <li className='price-detail'>
                  <div className='detail-title'>EMI Eligibility</div>
                  <a href='/' className='detail-amt text-primary' onClick={e => e.preventDefault()}>
                    Details
                  </a>
                </li>
                <li className='price-detail'>
                  <div className='detail-title'>Delivery Charges</div>
                  <div className='detail-amt discount-amt text-success'>Free</div>
                </li> */}
              </ul>
              <hr />
              {/* <ul className='list-unstyled'>
                <li className='price-detail'>
                  <div className='detail-title detail-total'>Total</div>
                  <div className='detail-amt font-weight-bolder'>$574</div>
                </li>
              </ul> */}
              {/* <Button.Ripple
                color='primary'
                classnames='btn-next place-order'
                block
                // disabled={!products.length}
                onClick={() => stepper.next()}
              >
                Place Order
              </Button.Ripple> */}
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
          </CardBody>
        </Card>
        </div>
        </div>
  )
}

export default SocialLinks
