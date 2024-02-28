import { Fragment, useEffect, useState} from 'react'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Media, ListGroup, ListGroupItem} from 'reactstrap'
import PerfectScrollbar from 'react-perfect-scrollbar'
import classnames from 'classnames'
import Avatar from '@components/avatar'
const BeneficiaryModal = ({isOpen, toggleModal, beneficiariesList, onBeneficiarySelect, onContinue }) => {
    
    const [selectedBeneficiary, setSelectedBeneficiary] = useState(null)
    const getInitials = (firstName, lastName) => {
        const firstInitial = firstName ? firstName.charAt(0) : ''
        const lastInitial = lastName ? lastName.charAt(0) : ''
        return `${firstInitial}${lastInitial}`.toUpperCase()
    }
    const handleSelectBeneficiary = (beneficiary, index) => {
        setSelectedBeneficiary(index)
        onBeneficiarySelect(beneficiary)
    }
    
    const handleContinue = () => {
        if  (selectedBeneficiary !== null) {
            onContinue(selectedBeneficiary)
            toggleModal()
        }
    }
    return (
        <div className='demo-inline-spacing'>
            <div >
                <Modal scrollable isOpen={isOpen} toggle={toggleModal} style={{top: '25%'}}>
                    <ModalHeader toggle={toggleModal}>Select Beneficiary</ModalHeader>
                    <ModalBody>
                        <PerfectScrollbar 
                            component='ul'
                            className='media-list scrollable-container'
                            options={{ wheelPropagation: false }}
                            >
                            <ListGroup tag = 'div'>
                                {beneficiariesList.map((beneficiary, index) => (
                                    <ListGroupItem
                                    key={index}
                                    className={classnames('cursor-pointer', {
                                      active: selectedBeneficiary === index
                                    })}
                                    onClick={() => handleSelectBeneficiary(beneficiary, index)}
                                    action
                                    >
                                        {/* <a key={index}  href='/' onClick={(e) => e.preventDefault()}> */}
                                        <Media >
                                        <Media left>
                                                <Avatar
                                                content={getInitials(beneficiary.firstname, beneficiary.lastname)}
                                                color='light-primary' // Adjust color as needed
                                                />
                                                </Media>
                                                <Media body>
                                                    <h6 className='font-weight-bolder'>
                                                    {beneficiary.firstname } {beneficiary.lastname} </h6>
                                                    <small className='notification-text'>{beneficiary.account_type === 'BankAccount' ? beneficiary.account_no : beneficiary.msisdn}</small>
                                                </Media>
                                        </Media>
                                    </ListGroupItem>
                                ))}
                            </ListGroup>
                        </PerfectScrollbar>
                    </ModalBody>
                    <ModalFooter>
                    <Button color='primary' onClick={handleContinue} >
                        Continue
                    </Button>
                    </ModalFooter>
                </Modal>
                </div>
        </div>
    )
}
export default BeneficiaryModal