import * as yup from 'yup'
import { Fragment, useState, useEffect } from 'react'
import classnames from 'classnames'
import Select, {components, createFilter} from 'react-select'
import { isObjEmpty } from '@utils'
import { useForm, watch} from 'react-hook-form'
import { ArrowLeft, ArrowRight, Circle, Twitter, Linkedin } from 'react-feather'
import { yupResolver } from '@hookform/resolvers/yup'
import { Form, Card, CardHeader, CardTitle, CardBody, Media, Label, Input, FormGroup, Row, Col, Button} from 'reactstrap'
import Timeline from '@components/timeline'
import axios from 'axios'
// import flags from '@app/config/constats'
import flags from './flags'
const AccountDetails = ({ stepper, type, sharedData, updateSharedData }) => {
  const QuotationSchema = yup.object().shape({
    [`source-amount-${type}`]: yup.number().required(),
    [`destination-currency-${type}`] : yup.object().shape({

    }).required()
    // [`destination-currency-${type}`]: yup.string().email().required(),
    // [`transfer-method-${type}`]: yup.string().required(),
    // [`payment-partner-${type}`]: yup.string().required()
  })
  const apiUrl = process.env.REACT_APP_API_URL
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Token ${localStorage.getItem('token')}`
  }

  const { register, errors, handleSubmit, trigger, watch:watchFormFields} = useForm({
    resolver: yupResolver(QuotationSchema)
  })
  const watchedFields = watchFormFields([
    `source-amount-${type}`,
    // `source-currency-${type}`,
    // `destination-amount-${type}`,
    `destination-currency-${type}`,
    `transfer-method-${type}`,
    `payment-partner-${type}`
  ])
  // const [countriesList, setCountriesList] = useState([])

  const [senderAmount, setSenderAmount] = useState()
  const [flagsArray, setFlagsArray] = useState([])
  // const [recipientAmount, setRecipientAmount] = useState('')
  // const [fromCurrency, setFromCurrency] = useState(flags[1])
  const [defaultFlag, setDefaultFlag] = useState(flags[58])
  const defaultSourceFlag = flags[119]
  const [payer, setPayer] = useState()
  const [toCurrency, setToCurrency] = useState(defaultFlag)
  const [selectedValue, setSelectedValue] = useState(defaultFlag)
  const [serviceType, setServiceType] = useState(1)
  const [paymentPartners, setpaymentPartners] = useState([])
  const [receiveMethods, setReceiveMethods] = useState([])
  const [quotationData, setQuotationData] = useState({})
  const [showCustomDiv, setShowCustomDiv] = useState(false)

  
  const getPaymentPartner = async () => {
    try {
      // const partnerResponse = await axios.get(`${apiUrl}remit/payers/${serviceType}/${toCurrency.Code}`, {headers})
      const partnerResponse = await axios.get(`${apiUrl}remit/payers/${serviceType}/${selectedValue.IsoCode}/`, {headers})
      if (partnerResponse && partnerResponse.data) {
        const partners = partnerResponse.data.data.map(partner => ({
          value:partner.id,
          label: partner.name

        }))
        setpaymentPartners(partners)
        return true
      } else {
        throw new Error()
      }
    } catch (error) {
      console.log("GetPayment Method Errors", error)
      Error('Failed to fetch Partners')
    }
  }
  //Handle GetPayment method
  const getReceiveMethods = async () => {
    try {

      const pymntmthdResponse = await axios.get(`${apiUrl}remit/services/${selectedValue.IsoCode}/`, {headers})
      if (pymntmthdResponse && pymntmthdResponse.data) {
        const receiveMethods = []
        // const pymnmethods = pymntmthdResponse.data.data
        const paymentMethodOptions = pymntmthdResponse.data.data.map(method => ({
          label:method.name, value:method.id
        }))
        // pymnmethods.map(method => {
        //   receiveMethods.push({label:pymnmethods.name, value:pymnmethods._id})
        //   console.log("RECEIVE METHODS", receiveMethods)
        // })
        setReceiveMethods(paymentMethodOptions)

        getPaymentPartner()
        
        return true
      } else {
        throw new Error()
      }
    } catch (error) {
        Error('Failed to fetch Payment Methods')
    }
  }
  const getQuotation = async (amount) => {
    try {
      // check if there are any validation errors
      // senderAmount = watchedFields[`source-amount-${type}`]
      if (Number(amount) > 1) {
        // trigger()
        console.log(payer, selectedValue.IsoCode, amount)
        //Create a quotation 
        const formData = {
          mode : "SOURCE_AMOUNT",
          payer_id : payer,
          amount : watchedFields[`source-amount-${type}`],
          destination_currency: selectedValue.Code
        }
        // Make an API call to quotation API
        const quotationResponse = await axios.post(`${apiUrl}remit/quotation/`, formData, {headers})
        console.log("QUOTATION RESPONSE", quotationResponse)
         // Handle the API response
        if (!('errors' in quotationResponse.data.data)) {
          setQuotationData(quotationResponse.data.data)
          setShowCustomDiv(true)
          return true
        } else {
          setShowCustomDiv(false)
          }
      }
    } catch (err) {}
  }

  
  const getCountriesList = async () => {
    try {
      const countries = await axios.get(`${apiUrl}remit/countries/`, {headers})

      if (countries && countries.data) {

        const countryOptions = countries.data.data.map(method => ({
          value: method.iso_code,
          label: method.name
        }))

        const filteredFlags = flags.filter((e) => {
          const flag = countryOptions.map((i) => {
            e.IsoCode = i.value
            return i
          }).find(f => f.label === e.CountryName)
          return flag
        }) 
        setFlagsArray(filteredFlags)  
        setDefaultFlag(filteredFlags.find(f => f.IsoCode === "KEN"))

        getReceiveMethods()
             
      } else {
        throw new Error()
      }
      } catch (error) {
        console.log(error)
        console.log("Error in getting Countries List")
        Error('Failed to fetch Country list')
        }
  }
  const handleAmountChange = (e) => {
    console.log(watchedFields[`source-amount-${type}`])
    setSenderAmount(watchedFields[`source-amount-${type}`])
  }
  const handleServiceChange = (e) => {
    console.log("Service ID", e["value"])
    setServiceType(e["value"])
  }
  const handleCurrencyChange = (e, type) => {
    console.log('Outside the if statements ->', e)
    // const currency = e.target.value
    if (type === 'to') {
      // Extract the value of e every time the users picks another option from the dropdown
      setToCurrency(e)
    } else {
        // setToCurrency(e["CountryName"])
        console.log('Currency', toCurrency)
    }
    // setExchangeRate(1.2)
    // setRecipientAmount((senderAmount * exchangeRate).toFixed(2))
  }
  const handlePayerChange = (e) => {
    // Update the selected payer
    console.log("Payer", e["value"], typeof e["value"])
    setPayer(e["value"])
  }

  const OptionComponent = ({ data, ...props }) => {
    return (
      <components.Option {...props}>
        <img src={data.Flag} className='mr-50' alt={data.Code}  size={14} 
        //Make image round/ circular
        // style={{borderRadius:"5px"}}
        style={{ borderRadius: '50%', width: '30px', height: '30px' }}
        />
        {data.Code}
      </components.Option>
    )
  }

  const SingleValueComponent = ({data, ...props}) => (
    <components.SingleValue {...props}>
      {/* Render your custom component here */}
      <img src={data.Flag } className='mr-50' alt={data.Code}  size={14} 
        //Make image round/ circular
        // style={{borderRadius:"5px"}}
        style={{ borderRadius: '50%', width: '30px', height: '30px' }}
        />
        

      {data.Code}
    </components.SingleValue>
  )
  useEffect(() => {
    setShowCustomDiv(false)

    // Fetch currencies from API
    getCountriesList()
    //Get quotation from API
    if (watchedFields[`source-amount-${type}`]  !== '' && payer !== undefined) {
      getQuotation(watchedFields[`source-amount-${type}`])
    } else {
      setShowCustomDiv(false)
    }
    // getQuotation(watchedFields[`source-amount-${type}`])
      // setShowCustomDiv(false)
  }, [watchedFields[`source-amount-${type}`], toCurrency, selectedValue, serviceType, payer])


  const onSubmit = () => {
    try {
      // async request which may result to error
      console.log("Form submitted 🎈")
      // Update the shared data
      //check if quotation data has an object payer with a key name
      
      if (typeof quotationData.payer.service === "object") {
        updateSharedData((prevData) => ({
          ...prevData,
          quotation : quotationData
        }))
        stepper.next()
      } else {
        alert('Please select a valid Payer')
      } 
    } catch (error) {
        console.error("An error occurred:", error)
      }
  }

  const onSubmits = () => {
    try {
      // ... your asynchronous code ...
      console.log("Form submitted")
      trigger()
      
      if (isObjEmpty(errors)) {
        console.log(isObjEmpty(errors))
        console.log(stepper)
        stepper.next()
      }
    } catch (error) {
      console.error("An error occurred:", error)
    }
  }

  return (
    <Fragment>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <FormGroup tag={Col} md='4'>
            <Label className='form-label' for={`source-amount-${type}`}>
              Source Amount
            </Label>
            <Input
              type="number"
              name={`source-amount-${type}`}
              id={`source-amount-${type}`}
              innerRef={register({ required: true })}
              className={classnames({ 'is-invalid': errors[`source-amount-${type}`] })}
            />
          </FormGroup>
          <FormGroup tag={Col} md='2' style={{ marginLeft: '-30px' }}>
            <Label className='form-label' for={`source-currency-${type}`}>
              Source Country
            </Label>
            <Select
              // options={countriesList}
              className='react-select'
              id={`source-currency-${type}`}
              innerRef={register({required:false})}
              // value={toCurrency}
              classNamePrefix='USD'
              type = "from"
              name={`source-currency-${type}`}
              isDisabled = {true}
              // defaultValue = {}
              components={{
                Option: OptionComponent,
                Placeholder: ({ ...props }) => <SingleValueComponent data={defaultSourceFlag} {...props} />
              }}
            />
          </FormGroup>
          <FormGroup tag={Col} md='4'>
          <Label className='form-label' for={`destination-amount-${type}`}>
              Destination Amount
            </Label>
            <Input
              type='destination'
              readOnly={true}
              disabled={true}
              name={`destination-amount-${type}`}
              // placeholder={ Object.keys(quotationData).length === 0 ? 'Enter Destination Amount' : quotationData.destination.amount}
              placeholder={ 
                Object.keys(quotationData).length === 0 ? 'Enter Destination Amount' : quotationData.destination.amount}
              id={`destination-amount-${type}`}
              // innerRef={register({ required: false })}
              // className={classnames({ 'is-invalid': errors[`destination-amount-${type}`] && triggerCount > 0 })}
            />

          </FormGroup>
          <FormGroup tag={Col} md='2' style={{ marginLeft: '-30px' }}>
            <Label className='form-label' for={`destination-currency-${type}`}>
              Destination Country
            </Label>
            <Select
              name={`destination-currency-${type}`}
              type="destination-currency"
              id={`destination-currency-${type}`}
              // <option value="saab">Saab 95</option>
              options={flagsArray}
              value = {selectedValue.IsoCode}
              // defaultValue={toCurrency || null}
              innerRef={register({ required: true })}
              className={classnames({ 'is-invalid': errors[`destination-currency-${type}`] })}
              classNamePrefix='select'
              onChange={(e) => handleCurrencyChange(e, 'to')}
              components={{
                Option: OptionComponent,
                SingleValue : ({ ...props }) => <SingleValueComponent data={selectedValue} {...props} />,
                Placeholder: ({ ...props }) => <SingleValueComponent data={toCurrency} {...props} />
              }}
              filterOption={createFilter({ignoreAccents: false, ignoreCase: true})}
            />
            
          </FormGroup>
        </Row>
        <Row>
          {showCustomDiv ? ( // Conditionally render the custom div
            <div className='form-group form-password-toggle col-md-6 w-full border-b-2 border-slate-200 my-2.5'>
                <CardHeader>
                  <CardTitle tag='h4'>Quotation</CardTitle>
                </CardHeader>
                <CardBody>
                <div className='d-flex justify-content-between mb-1'>
                  <div className='d-flex align-items-center'>
                    <Circle size={15} className='text-primary' />
                    <span className='font-weight-bold ml-75'>Exhange Rate</span>
                  </div>
                  <span>{quotationData.wholesale_fx_rate} {toCurrency.IsoCode}</span>
                </div>
                <div className='d-flex justify-content-between mb-1'>
                  <div className='d-flex align-items-center'>
                    <Circle size={15} className='text-info' />
                    <span className='font-weight-bold ml-75'>Fee</span>
                  </div>
                  <span>{quotationData.fee.amount} {quotationData.fee.currency}</span>
                </div>
                
                <div className='d-flex justify-content-between'>
                  <div className='d-flex align-items-center'>
                    <Circle size={15} className='text-danger' />
                    <span className='font-weight-bold ml-75'>Deductable Amount</span>
                  </div>
                  <span> USD</span>
                </div>
                </CardBody>
            </div>  
            ) : (
              <div className='form-group form-password-toggle col-md-12 w-full border-b-2 border-slate-200 my-2.5'>
                <p>Enter source amount to get current exchange rate.</p>
              </div>
            )}
          <div className='form-group form-password-toggle col-md-12'>
            <Label className='form-label' for='transfer-method-val'>
              Receive Method
            </Label>
            <Select
              name={`transfer-method-${type}`}
              type="receive"
              innerRef={register({required:false})}
              id={`transfer-method-${type}`}
              options={receiveMethods}
              className={classnames({ 'is-invalid': errors[`transfer-method-${type}`] })}
              onChange={(e) => handleServiceChange(e)}

            />
          </div>
          <div className='form-group form-password-toggle col-md-12'>
            <Label className='form-label' for='payment-partner-val'>
              Payment Partner
            </Label>
            <Select
              name={`payment-partner-${type}`}
              type="paymentsPartners"
              innerRef={register({required:false})}
              id={`payment-partner-${type}`}
              options={paymentPartners}
              onChange={(e) => handlePayerChange(e)}
              className={classnames({ 'is-invalid': errors[`payment-partner-${type}`] })}
              
            />
          </div>
        </Row>
        <br></br>
        <br></br>
        <div className='d-flex justify-content-between'>
          <Button.Ripple color='secondary' className='btn-prev' outline disabled>
            <ArrowLeft size={14} className='align-middle mr-sm-25 mr-0'></ArrowLeft>
            <span className='align-middle d-sm-inline-block d-none'>Previous</span>
          </Button.Ripple>
          <Button.Ripple type='submit' color='primary' className='btn-next' onClick={onSubmit}>
            <span className='align-middle d-sm-inline-block d-none'>Next</span>
            <ArrowRight size={14} className='align-middle ml-sm-25 ml-0'></ArrowRight>
          </Button.Ripple>
        </div>
      </Form>
    </Fragment>
  )
}

export default AccountDetails
