import React, {useState, useEffect} from 'react'
import { 
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    Form,
    ModalHeader,
    FormGroup,
    Label,
    Input,
    FormText,
    FormFeedback,
    UncontrolledAlert,
} from 'reactstrap'
import { useUser } from '../context/userContext'
import { getPlanFromId } from '../utils'

import warning from '../assets/images/logos/warning.png'
import cancel from '../assets/images/logos/cancel.png'
import checked from '../assets/images/logos/checked.png'
import loadingGIF from '../assets/images/logos/loading2.gif'




const AllocateButton = ({loading, setLoading, plan_id, phone_number, handleSubmit}) => {

    const [success, setSuccess] = useState(false)
    const [confirm, setConfirm] = useState(false)
    const [failed, setFailed] = useState(false)
    const [message, setMessage] = useState("")
    const [prevent, setPrevent] = useState(false)
    const [plan, setPlan] = useState({})

    const handleSend = () => {
        const selectedPlan = getPlanFromId(plan_id)
        setPlan(selectedPlan)
        if(plan_id && phone_number){
            setConfirm(true)
        }else{
            setPrevent(true)
        }
    }

    const handleAllocate = async () => {
        // setConfirm(false)
        const status = await handleSubmit()
        if(status.status){
            setMessage(status.message)
            setSuccess(true)
            setTimeout(() => {
                setSuccess(false)
            }, 8000)
        }else{
            setMessage(status.message)
            setFailed(true)
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
                isOpen={confirm}
                toggle={() => setConfirm(!confirm)}
            >
                <ModalBody>
                    <div className='confirm text-center'>
                        <img src={warning} width={50} className="confirm-warn" alt="warn"/>
                        <p className='text-center'>Are you sure you want to send <strong>{plan?.size}</strong> worth <strong>{plan?.amount}</strong> to <strong>{phone_number}</strong></p>
                    </div>
                </ModalBody>
                <ModalFooter className='confirm-footer'>
                <Button
                    color="primary"
                    onClick={() => {
                        setConfirm(false);
                        handleAllocate();
                    }}
                >
                    Yes, Proceed
                </Button>
                {' '}
                <Button onClick={() => setConfirm(false)}>
                    No, Cancel
                </Button>
                </ModalFooter>
            </Modal>

            {/* Processing On Data sent*/}
            <Modal
                centered
                isOpen={loading}
                // toggle={() => setLoading(!loading)}
            >
                <ModalBody>
                    <div className='confirm text-center'>
                        <img src={loadingGIF} className="allocate-loading" alt="loading"/>
                        <p>Please wait, transaction is processing.</p>
                    </div>
                </ModalBody>
                {/* <ModalFooter className='confirm-footer'>
                <Button color="secondary" onClick={() => setLoading(false)}>
                    Close
                </Button>
                </ModalFooter> */}
            </Modal>


            {/* Error On empty phone number and plan id */}
            <Modal
                centered
                isOpen={prevent}
                toggle={() => setPrevent(!prevent)}
            >
                <ModalBody>
                    <div className='confirm text-center'>
                        <img src={cancel} width={50} className="confirm-cancel" alt="confirm"/>
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
                    <div className='confirm text-center'>
                        <img src={checked} className="confirm-checked" alt="success"/>
                        <p>{message}</p>
                    </div>
                </ModalBody>
                <ModalFooter className='confirm-footer'>
                <Button color="secondary" onClick={() => setSuccess(false)}>
                    Close
                </Button>
                </ModalFooter>
            </Modal>

            {/* Failure On Data sent*/}
            <Modal
                centered
                isOpen={failed}
                toggle={() => setFailed(!failed)}
            >
                <ModalBody>
                    <div className='confirm text-center'>
                        <img src={cancel} width={50} className="confirm-cancel" alt="confirm"/>
                        <p>{message}</p>
                    </div>
                </ModalBody>
                <ModalFooter className='confirm-footer'>
                <Button color="secondary" onClick={() => setFailed(false)}>
                    Close
                </Button>
                </ModalFooter>
            </Modal>
        </>
    );
}

export default AllocateButton