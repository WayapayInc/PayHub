import { Fragment, useEffect, useState } from 'react'
import classnames from 'classnames'
import { isObjEmpty } from '@utils'
import { useForm } from 'react-hook-form'
import { ArrowLeft, ArrowRight, XCircle } from 'react-feather'
import Avatar from '@components/avatar'
import { Label, FormGroup, Row, Col, Button, Form, Input, CustomInput, Media, Toast, ToastBody, ToastHeader } from 'reactstrap'
import Select, {components, createFilter} from 'react-select'
import 'react-phone-number-input/style.css'
import './../../../assets/scss/style.scss'
import BeneficiaryModal from './../../components/modal/index'
import PhoneInput from 'react-phone-number-input'
import axios from 'axios'
import {handleWarning} from './../../extensions/sweet-alert/index'
const Address = ({ stepper, type, sharedData, updateSharedData}) => {
  const { register, errors, handleSubmit, trigger, watch:watchFormFields } = useForm(
    {
      // resolver: yupResolver(QuotationSchema)
    }
  )
  const getInitials = (firstName, lastName) => {
    const firstInitial = firstName ? firstName.charAt(0) : ''
    const lastInitial = lastName ? lastName.charAt(0) : ''
    return `${firstInitial}${lastInitial}`.toUpperCase()
  }
  const getFullName = (firstName,  lastName) => `${firstName || ''} ${lastName || ''}`
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
  const [isChecked, setIsChecked] = useState()
  const [modalOpen, setModalOpen] = useState(false)
  const [reason, setReason] = useState("EDUCATION")
  const apiUrl = process.env.REACT_APP_API_URL
  const [beneficiariesList, setBeneficiaryList] = useState([])
  const [selectedBeneficiaryData, setSelectedBeneficiaryData] = useState(null)

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Token ${localStorage.getItem('token')}`
  }
  const fetchBeneficiaries = async () => {
    try {
      const serviceName = sharedData.quotation.payer.service.name
      const beneficiaryCountry = sharedData.quotation.payer.country_iso_code
      const payer =  sharedData.quotation.payer.id
      console.log(payer)
      const response = await axios.get(`${apiUrl}remit/beneficiary/`, {headers, params : {serviceName, beneficiaryCountry, payer}})
      if (response.status === 200 && response.data.length > 0) {
        const beneficiaries = response.data
        console.log(beneficiaries)
        setBeneficiaryList(beneficiaries)
      }
    } catch (error) {
      console.log(error)
    }
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
  const handleSaveBeneficiary = async() => {
    // Assuming you have beneficiary data, replace this with your actual data
    try {
      if (isChecked) {
        console.log("+++SHARED DATA++++++")
        console.log(sharedData)
        const beneficiaryData = {
          firstname : beneficiaryFields[`address-${type}`],
          lastname : beneficiaryFields[`landmark-${type}`],
          account_type: sharedData.quotation.payer.service.name,
          country_code:sharedData.quotation.payer.country_iso_code,
          payer_id : sharedData.quotation.payer.id,
          account_no : sharedData.account_no      // destination_currency: selectedValue.Code
        }
        const beneficiaryResponse = await axios.post(`${apiUrl}remit/beneficiary/`, beneficiaryData, {headers})
        if (beneficiaryResponse.status === 201) {
          console.log('Beneficiary saved successfully:', beneficiaryResponse.data)
          updateSharedData((prevData) => ({
            ...prevData,
            beneficiary :  beneficiaryData
          }))
        } else {
          console.error('Error saving beneficiary:', beneficiaryResponse.data)
        // Handle the error scenario
        }
      } else {
        console.log('Checkbox not checked. Beneficiary not saved.')
      }
    } catch (error) {
      console.error('Error saving beneficiary:', error)
      // Handle any unexpected errors
    }
  }
  const handleCheckboxChange = (event) => {
    const isCheckedBox = event.target.checked
    console.log(isCheckedBox)
    setIsChecked(isCheckedBox)
  }

  const createTransaction =  async (formData) => {
    try {
      console.log(formData.amount)
      if (formData.amount > 1) {
        console.log("Transact")
        console.log("is it updated?")
        // Make an API call to quotation API
        const transactionResponse = await axios.post(`${apiUrl}remit/transaction/`, formData, {headers})
        console.log(transactionResponse.status)
        if  (transactionResponse.status === 201) {
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
          }
            // setSharedData({...sharedData , 'transactions': [...sharedData.transactions, transactiontionResponse.data] })
        }
        if (transactionResponse.status === 400) {
          const errorMessage = transactionResponse.data.message
          console.log(errorMessage)
          handleWarning()
          console.log(transactionResponse.data)
        }
        return transactionResponse
        //Handle transaction success
      } else {
        console.log("Insufficient balance")
      }
    } catch (e) {
        handleWarning()
        console.log(e)

    }
  }
  useEffect(() => {
    getService()
    fetchBeneficiaries()

  }, [sharedData])

  const toggleModal = () => {
    console.log("+++SHARED DATA++++++")
    console.log(sharedData)
    setModalOpen(!modalOpen)
  }
  const handleBeneficiarySelect = async (beneficiaryData) => {
    console.log(beneficiaryData)
    setSelectedBeneficiaryData(beneficiaryData)
    if (beneficiaryData !== null) {
      updateSharedData((prevData) => ({
        ...prevData,
        beneficiary : beneficiaryData
      }))
      console.log("++BEN SELECT++")
      console.log(sharedData)
      const transact_data = {
        firstname : beneficiaryData.firstname,
        lastname : beneficiaryData.lastname,
        quotation_id : sharedData.quotation.id,
        payer_id : sharedData.quotation.payer.id,
        account_no: beneficiaryData.account_no,
        servicename: sharedData.quotation.payer.service.name,
        amount : sharedData.quotation.source.amount,
        destination_currency: sharedData.quotation.destination.currency,
        country_iso_code : sharedData.quotation.payer.country_iso_code,
        purpose_of_remittance : reason
      }
      console.log(transact_data)
      const transact = await createTransaction(transact_data)
      console.log("HERE IS THE TRANSACTION")
      console.log(transact)
      // console.log(transact.status)
      toggleModal()
      stepper.next()
      //call transactionapi and update the sharedData
    }
  }
  const handleContinue = (selectedBeneficiaryIndex) => {
    console.log('Selected Beneficiary Index:', selectedBeneficiaryIndex)

  }
  const handleRemoveSelectedBeneficiary = () => {
    console.log("Removing Selected Beneficiary")
    setSelectedBeneficiaryData(null)
  }
  const close = (
    <button type='button' className='ml-1 close'  onClick={handleRemoveSelectedBeneficiary}>
      <span>×</span>
    </button>
  )

  const onSubmit = async () => {
    try {
      console.log("FROM SUBMIT BUTTON")
      console.log(selectedBeneficiaryData)
      if (selectedBeneficiaryData === null) {
        const transactionData = {
            firstname : beneficiaryFields[`address-${type}`],
            lastname : beneficiaryFields[`landmark-${type}`],
            quotation_id : sharedData.quotation.id,
            payer_id : sharedData.quotation.payer.id,
            account_no: beneficiaryFields[`account-number-${type}`],
            servicename: sharedData.quotation.payer.service.name,
            amount : sharedData.quotation.source.amount,
            destination_currency: sharedData.quotation.destination.currency,
            country_iso_code : sharedData.quotation.payer.country_iso_code,
            purpose_of_remittance : reason
        }
        const transactionResponse = await createTransaction(transactionData)
        // console.log("==========")
        console.log(transactionResponse)
        // const transactionConfirmationData = {
        //   firstname : transactionResponse.data.data.beneficiary.firstname,
        //   lastname : transactionResponse.data.data.beneficiary.lastname,
        //   purpose_of_remittance : transactionResponse.data.data.purpose_of_remittance,
        //   transaction_id : transactionResponse.data.data.id,
        //   credit_party_identifier : transactionResponse.data.data.credit_party_identifier
        // }
        // if (isObjEmpty(errors) && transactionResponse.status === 201) {
        //   updateSharedData((prevData) => ({
        //     ...prevData,
        //     transaction : transactionConfirmationData
        //   }))
        //   console.log("========Beneficiary=========")
        //   console.log(sharedData)
        if (isChecked) {
          trigger()
          console.log("BENEFICIARY SAVED ON SUBMIT")
          const beneficiaryRes = handleSaveBeneficiary()
          if (beneficiaryRes.status === 201) {
            console.log("Beneficiary added successfully")
          }           
          // Handle an error that results from saving the beneficiary
        }  else {
          console.log("Button is not checked")
        }
        stepper.next()
        } else {
          stepper.next()
          console.log("Went back to previous step")
        }
      // } else {
      //   console.log("This part is what is Running")
      //   stepper.next()
      // }
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
      {/* Conditionally render the "Choose beneficiary" button */}
      { beneficiariesList.length > 0 && (
      <Button.Ripple className='mt-70 mb-0' color='secondary' size='sm' outline onClick={toggleModal}>
              Choose beneficiary
      </Button.Ripple>
      )}
      <BeneficiaryModal isOpen={modalOpen} toggleModal={toggleModal} beneficiariesList={beneficiariesList} onBeneficiarySelect = {handleBeneficiarySelect} onContinue={handleContinue} />
      {selectedBeneficiaryData && (
        <Toast>
          <ToastHeader close={close}>Beneficiary</ToastHeader>
          <Media className='align-items-center'>
            <Avatar className='ml-50 mb-1' color='light-primary' content={getInitials(selectedBeneficiaryData.firstname, selectedBeneficiaryData.lastname)} />
             {/* <Avatar img={ceo} imgHeight={38} imgWidth={38} /> */}
             <Media className='ml-50' body>
              <h6>{getFullName(selectedBeneficiaryData.firstname, selectedBeneficiaryData.lastname)}</h6>
              <span>{selectedBeneficiaryData.account_no}</span>
            </Media>
          </Media>
        </Toast>
      )}
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
                        account_no:beneficiaryFields[`account-number-${type}`]
                      }))
                    }}
                  />
              ) : (
                <Input
                    type='number'
                    name={`account-number-${type}`}
                    id={`account-number-${type}`}
                    placeholder='254-718-890-544'
                    innerRef={register({ required: true })}
                    className={classnames({ 'is-invalid': errors[`account-number-${type}`] })}
                    onChange={(event) => {
                      updateSharedData((prevData) => ({
                        ...prevData,
                        account_no:beneficiaryFields[`account-number-${type}`]
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
              innerRef={register({ required: false })}
              label='Save Beneficiary'  
              defaultChecked={false}
              onChange = {handleCheckboxChange}
           />
          </div>
        </Row>
        <div className='d-flex justify-content-between'>
          <Button.Ripple color='primary' className='btn-prev' onClick={() => stepper.previous()}>
            <ArrowLeft size={14} className='align-middle mr-sm-25 mr-0'></ArrowLeft>
            <span className='align-middle d-sm-inline-block d-none'>Previous</span>
          </Button.Ripple>
          <Button.Ripple type='submit' color='primary' className='btn-next' >
            <span className='align-middle d-sm-inline-block d-none'>Next</span>
            <ArrowRight size={14} className='align-middle ml-sm-25 ml-0'></ArrowRight>
          </Button.Ripple>
        </div>
      </Form>
    </Fragment>
  )
}

export default Address
