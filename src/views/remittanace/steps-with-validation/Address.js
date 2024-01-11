import { Fragment, useEffect, useState } from 'react'
import classnames from 'classnames'
import { isObjEmpty } from '@utils'
import { useForm } from 'react-hook-form'
import { ArrowLeft, ArrowRight } from 'react-feather'
import { Label, FormGroup, Row, Col, Button, Form, Input, CustomInput } from 'reactstrap'
import Select, {components, createFilter} from 'react-select'
import 'react-phone-number-input/style.css'
import './../../../assets/scss/style.scss'
import PhoneInput from 'react-phone-number-input'
import axios from 'axios'

const Address = ({ stepper, type, sharedData, updateSharedData}) => {
  const { register, errors, handleSubmit, trigger, watch:watchFormFields } = useForm(
    {
      // resolver: yupResolver(QuotationSchema)
    }
  )
  // const BeneficiarySchema = yup.object().shape({})
  const beneficiaryFields = watchFormFields([
    `address-${type}`,
    `landmark-${type}`,
    `account-number-${type}`,
    `input-large-horizontal-${type}`,
    `save-beneficiary-status-${type}`,
    `phonenumber-${type}`
  ])
  const paymentReasons = [
    { value : "FAMILY_SUPPORT", label : "Family Support"},
    { value : "EDUCATION", label : "Education"},
    { value : "GIFT_AND_DONATION", label : "Gift/Donation"},
    { value : "MEDICAL_TREATMENT", label : "Medical"},
    { value : "MAINTENANCE_EXPENSES", label : "Maintenance expenses"},
    { value : "TRAVEL", label : "Travel"},
    { value : "SMALL_VALUE_REMITTANCE", label : "Small value remittance"},
    { value : "LIBERALIZED_REMITTANCE", label : "Liberalized remittance"},
    { value : "OTHER", label : "Other"},
    { value : "CONSTRUCTION_EXPENSES", label : "Contruction Expenses"},
    { value : "HOTEL_ACCOMMODATION", label : "Hotel Accomodation"},
    { value : "ADVERTISING_EXPENSES", label : "Advertising Expenses"},
    { value : "ADVISORY_FEES", label : "Advisory Fees"},
    { value : "BUSINESS_INSURANCE", label : "Business Insurance"},
    { value : "INSURANCE_CLAIMS", label : "Insurance Claims"},
    { value : "DELIVERY_FEES", label : "Delivery Fees"},
    { value : "EXPORTED_GOODS", label : "Exported Goods"},
    { value : "SERVICE_CHARGES", label : "Service Charges"},
    { value : "LOAN_PAYMENT", label : "Loan Payment"},
    { value : "OFFICE_EXPENSES", label : "Office Expences"},
    { value : "PROPERTY_PURCHASE", label : "Property Purchase"},
    { value : "PROPERTY_RENTAL", label : "Property Rental"},
    { value : "ROYALTY_FEES", label : "Royalty Fees"},
    { value : "SHARES_INVESTMENT", label : "Shares Investements"},
    { value : "FUND_INVESTMENT", label : "Fund Investement"},
    { value : "TAX_PAYMENT", label : "Tax Payment"},
    { value : "TRANSPORTATION_FEES", label : "Transport"},
    { value : "PERSONAL_TRANSFER", label : "Utility Bills"},
    { value : "SALARY_PAYMENT", label : "Salary Payment"},
    { value : "OTHER_FEES", label : "Other Fees"},
    { value : "COMPUTER_SERVICES", label : "Computer Services"},
    { value : "REWARD_PAYMENT", label : "Reward"},
    { value : "INFLUENCER_PAYMENT", label : "Influencer Payment"}
  ]
  const [isBankService, setIsBankService] = useState(false)
  const [isChecked, setIsChecked] = useState(true)
  const [reason, setReason] = useState("EDUCATION")
  const apiUrl = process.env.REACT_APP_API_URL
  
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Token ${localStorage.getItem('token')}`
  }

  const handleCheckboxChange = (event) => {
    setIsChecked(!isChecked)
    console.log("Unchecked")
  }
  
  const getService = () => {
    try {
      if (sharedData.quotation.payer.service.name === "BankAccount") {
        setIsBankService(true)
      } else {
        setIsBankService(false)
      }

    } catch {
      
    }

  }
  const handleReasonChange = (e) => {
    setReason(e["value"])
    console.log(reason)
  }
  const createBeneficiary = async () => {
    try {
      const beneficiaryData = {
        firstname : watchedFields[`address-${type}`],
        lastname : watchedFields[`landmark-${type}`],
        service: sharedData.quotation.payer.service.name,
        country_code:sharedData.quotation.payer.country_iso_code,
        payer_id : sharedData.quotation.payer.id,
        amount : sharedData.quotation.sent_amount
        // destination_currency: selectedValue.Code
      }
      console.log(beneficiaryData)
      const beneficiaryResponse = await axios.get(`${apiUrl}remit/beneficiary/`, {headers})

    } catch {

    }
  }
  const handleSaveBeneficiary = () => {
    // Assuming you have beneficiary data, replace this with your actual data
    const beneficiaryData = {
      // Your beneficiary data fields
      name: 'Beneficiary Name',
      accountNumber: 'Beneficiary Account Number'
      // Add more fields as needed
    }

    if (isChecked) {
      saveBeneficiaryToDB(beneficiaryData)
    } else {
      // Handle logic when the checkbox is not checked (optional)
      console.log('Checkbox not checked. Beneficiary not saved.')
    }
  }
  const createTransaction = async (formData) => {
    try {
      console.log(formData.amount)
      if (formData.amount > 1) {
        console.log("Transact")
        // Make an API call to quotation API
        const transactiontionResponse = await axios.post(`${apiUrl}remit/transaction/`, formData, {headers})
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
  useEffect(() => {
    getService()

  }, [sharedData])

  // const handleInputChange = (e) => {
  //   console.log()
  // }

  const onSubmit = async () => {
    try {
      trigger()
      if (isChecked) {
        const transactionData = {
            firstname : beneficiaryFields[`address-${type}`],
            lastname : beneficiaryFields[`landmark-${type}`],
            quotation_id : sharedData.quotation.id,
            payer_id : sharedData.quotation.payer.id,
            account: sharedData.account,
            servicename: sharedData.quotation.payer.service.name,
            amount : sharedData.quotation.source.amount,
            destination_currency: sharedData.quotation.destination.currency,
            country_iso_code : sharedData.quotation.payer.country_iso_code,
            purpose_of_remittance : reason
        }
        console.log(transactionData)
        const transactionResponse = await createTransaction(transactionData)
        console.log(transactionResponse)
        const transactionConfirmationData = {
          firstname : transactionResponse.data.data.beneficiary.firstname,
          lastname : transactionResponse.data.data.beneficiary.lastname,
          purpose_of_remittance : transactionResponse.data.data.purpose_of_remittance,
          transaction_id : transactionResponse.data.data.id,
          credit_party_identifier : transactionResponse.data.data.credit_party_identifier

        }
        if (isObjEmpty(errors) && transactionResponse.status === 201) {
          updateSharedData((prevData) => ({
            ...prevData,
            transaction : transactionConfirmationData
          }))
          console.log(sharedData)
          stepper.next()
        }
      } else {


      }
    } catch (e) {
      console.log(e)

    }
  }

  return (
    <Fragment>
      <div className='content-header'>
        <h5 className='mb-0'>Beneficiary</h5>
        <small>Add Beneficiary Details</small>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <FormGroup tag={Col} md='6'>
            <Label className='form-label' for={`address-${type}`}>Firstname</Label>
            <Input
              type='text'
              id={`address-${type}`}
              name={`address-${type}`}
              placeholder='Jane'
              innerRef={register({ required: true })}
              className={classnames({ 'is-invalid': errors[`address-${type}`] })}
            />
          </FormGroup>
          <FormGroup tag={Col} md='6'>
            <Label className='form-label' for={`landmark-${type}`}>
              Lastname
            </Label>
            <Input
              type='text'
              name={`landmark-${type}`}
              id={`landmark-${type}`}
              placeholder='Kin'
              innerRef={register({ required: true })}
              className={classnames({ 'is-invalid': errors[`landmark-${type}`] })}
            />
          </FormGroup>
        </Row>
        <Row>
          <FormGroup tag={Col} md='6'>
            <div> 
              <label>
                {isBankService ? 'Bank Account Number' : 'Phone Number'}
              </label>
              {isBankService ? (
                  <Input
                    type='number'
                    name={`account-number-${type}`}
                    id={`account-number-${type}`}
                    placeholder='123-457-890-544'
                    innerRef={register({ required: true })}
                    className={classnames({ 'is-invalid': errors[`account-number-${type}`] })}
                    onChange={(value) => {
                      updateSharedData((prevData) => ({
                        ...prevData,
                        account:beneficiaryFields[`account-number-${type}`]
                      }))
                    }}
                  />
              ) : (
                <Input
                    type='number'
                    name={`phonenumber-${type}`}
                    id={`phonenumber-${type}`}
                    placeholder='254-718-890-544'
                    innerRef={register({ required: true })}
                    className={classnames({ 'is-invalid': errors[`phonenumber-${type}`] })}
                    onChange={(event) => {
                      updateSharedData((prevData) => ({
                        ...prevData,
                        account:beneficiaryFields[`phonenumber-${type}`]
                      }))
                    }}
                  />
                  // <PhoneInput
                  //   name={`phonenumber-${type}`}
                  //   id={`phonenumber-${type}`}
                  //   placeholder="Enter phone number"
                  //   className='form-control'
                  //   style={{
                  //     //fontSize: '20px',
                  //     //width: '600px'
                  //     //font-size, 
                  //     // border: 'None'
                  //   }}
                    
                  //   value={beneficiaryFields[`phonenumber-${type}`] || ''}
                  //   onChange={(value) => {
                  //     updateSharedData((prevData) => ({
                  //       ...prevData,
                  //       account: value
                  //     }))
                  //   }}
                  // />
              )}
            </div>
          </FormGroup>
          <FormGroup tag={Col} md='6'>
            <Label className='form-label' for={`landmark-${type}`}>
            Note
            </Label>
            <Select
              name={`input-large-horizontal-${type}`}
              defaultValue = {paymentReasons[1]}
              type="paymentReason"
              innerRef={register({required:true})}
              id={`input-large-horizontal-${type}`}
              onChange={(e) => handleReasonChange(e)}
              options={paymentReasons}
              className={classnames({ 'is-invalid': errors[`input-large-horizontal-${type}`] })}
              filterOption={createFilter({ignoreAccents: false, ignoreCase: true})}
            />
          </FormGroup>
          <div className='form-group form-password-toggle col-md-12'>
            <CustomInput className='mb-3' inline type='checkbox' 
              name={`save-beneficiary-status-${type}`}
              id={`save-beneficiary-status-${type}`}
              innerRef={register({ required: true })}
              label='Save Beneficiary'  
              defaultChecked={true}
              onChange = {handleCheckboxChange}
           />
          </div>
        </Row>
        <div className='d-flex justify-content-between'>
          <Button.Ripple color='primary' className='btn-prev' onClick={() => stepper.previous()}>
            <ArrowLeft size={14} className='align-middle mr-sm-25 mr-0'></ArrowLeft>
            <span className='align-middle d-sm-inline-block d-none'>Previous</span>
          </Button.Ripple>
          <Button.Ripple type='submit' color='primary' className='btn-next'>
            <span className='align-middle d-sm-inline-block d-none'>Next</span>
            <ArrowRight size={14} className='align-middle ml-sm-25 ml-0'></ArrowRight>
          </Button.Ripple>
        </div>
      </Form>
    </Fragment>
  )
}

export default Address
