import React, {useState, useEffect} from 'react'
import { UncontrolledAlert, Button, Form, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, FormText, FormFeedback, Label } from 'reactstrap'
import { useUser } from '../context/userContext'
import { getPlanFromId } from '../utils'

import warning from '../assets/images/logos/warning.png'
import cancel from '../assets/images/logos/cancel.png'
import checked from '../assets/images/logos/checked.png'




const AllocateButton = ({loading, setLoading, plan_id, phone_number, handleSubmit}) => {

    const [success, setSuccess] = useState(false)
    const [prevent, setPrevent] = useState(false)
    const [plan, setPlan] = useState({})

    const handleSend = () => {
        const selectedPlan = getPlanFromId(plan_id)
        setPlan(selectedPlan)
        if(plan_id && phone_number){
            setLoading(!loading)
        }else{
            setPrevent(true)
        }
    }

    const handleAllocate = async () => {
        const status = await handleSubmit()
        if(status){
            setSuccess(true)
        }
    }

    return(
        <>
            {/* <Button className="fund-button">Fund Account</Button> */}
            <Button color="primary" onClick={handleSend} >
              Allocate
            </Button>

            {/* Confirm Transfer of data to phone number */}
            <Modal
                centered
                isOpen={loading}
                toggle={() => setLoading(!loading)}
            >
                {/* <ModalHeader toggle={toggleConfirm}>
                    Confirm Request
                </ModalHeader> */}
                <ModalBody>
                    <div className='confirm'>
                        <img src={warning} className="confirm-warn"/>
                        <p className='text-center'>Are you sure you want to send <strong>{plan?.size}</strong> worth <strong>{plan?.amount}</strong> to <strong>{phone_number}</strong></p>
                    </div>
                </ModalBody>
                <ModalFooter className='confirm-footer'>
                <Button
                    color="primary"
                    onClick={handleAllocate}
                >
                    Yes, Proceed
                </Button>
                {' '}
                <Button onClick={() => setLoading(false)}>
                    No, Cancel
                </Button>
                </ModalFooter>
            </Modal>

            {/* Error On empty phone number and plan id */}
            <Modal
                centered
                isOpen={prevent}
                toggle={() => setPrevent(!prevent)}
            >
                <ModalBody>
                    <div className='confirm'>
                        <img src={cancel} className="confirm-cancel"/>
                        <p>You must enter a valid phone number and data plan</p>
                    </div>
                </ModalBody>
                <ModalFooter className='confirm-footer'>
                <Button color="secondary" onClick={() => setPrevent(false)}>
                    Close
                </Button>
                </ModalFooter>
            </Modal>

            {/* Success On Data sent*/}
            <Modal
                centered
                isOpen={success}
                toggle={() => setSuccess(!success)}
            >
                <ModalBody>
                    <div className='confirm'>
                        <img src={checked} className="confirm-checked"/>
                        <p>Data transafer successful</p>
                    </div>
                </ModalBody>
                <ModalFooter className='confirm-footer'>
                <Button color="secondary" onClick={() => setSuccess(false)}>
                    Close
                </Button>
                </ModalFooter>
            </Modal>
        </>
    );
}

export default AllocateButton