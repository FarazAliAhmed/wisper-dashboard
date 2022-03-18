import React, {useState, useEffect} from 'react'
import { UncontrolledAlert, Button, Form, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, FormText, FormFeedback, Label } from 'reactstrap'
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3'
import { useUser } from '../context/userContext'

const { REACT_APP_FLUTTERWAVE_PUBLIC_KEY } = process.env
// const REACT_APP_FLUTTERWAVE_PUBLIC_KEY = process.env.REACT_APP_FLUTTERWAVE_TEST_PUBLIC_KEY



const PaymentButton = () => {

    const { user } = useUser()
    const [show, setShow] = useState(false)
    const [price, setPrice] = useState()
    const [invalid, setInvalid] = useState(true)
    const [notification, setNotification] = useState(null)

    console.log(user)
    useEffect(() => {
        if (parseInt(price) < 1000){
            setInvalid(true)
        }else {
            setInvalid(false)
        }
    }, [price])

    const paymentConfig = {
        public_key: REACT_APP_FLUTTERWAVE_PUBLIC_KEY,
        tx_ref: "trx-" + Math.floor(Math.random() * 10000000000000000),
        amount: price,
        currency: "NGN",
        payment_options: "card, mobilemoney, banktransfer, ussd",
        customer: {
            name: user.name,
            phone_number: user.mobile_number,
            email: user.email,
            user_id: user._id
        },
        customizations: {
            title: 'Fund Account',
            description: 'Payment into your Wisper reseller Account',
          },
    }
    
    const initiatePayment  = useFlutterwave(paymentConfig)

    const makePayment = () => {
        if(!invalid) {
            initiatePayment({callback: onSuccess, onClose});
        }
    }

    const onSuccess = (response) => {
        closePaymentModal()
        setShow(false)
        setNotification(`Payment Successful. Refresh to see updated Balance`)
        // const paymentObject = {
        //     business_name: user.name,
        //     business_id: user._id,
        //     amount: price,
        //     payment_ref: paymentConfig.reference,
        // }
        // addPayment(paymentObject).then((response) => {
        // })
    }

    const onClose = () => {
        setShow(false)
    }

    const toggleShow = () => {
        setShow(!show)
    }

    const setAmount = (e) => {
        setPrice(e.target.value)
    }

    return(
        <>
            <>
              { notification ?
                <UncontrolledAlert dismissible color="success">
                  {notification}
                </UncontrolledAlert>
                :
                ""
              }
            </>
            <Button className="fund-button" onClick={toggleShow}>Fund Account</Button>
            <Modal
                centered
                isOpen={show}
                toggle={toggleShow}
            >
                <ModalHeader toggle={toggleShow}>
                    Fund Wallet
                </ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="price">
                                Enter amount
                            </Label>
                            <Input type="number" id="price" name="price" onChange={setAmount} invalid={invalid} />
                            <FormFeedback>
                                Amount must be at least ₦1,000
                            </FormFeedback>
                            <FormText>
                                Enter an amount to fund wallet with
                            </FormText>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                <Button
                    disabled={invalid}
                    color="primary"
                    onClick={makePayment}
                >
                    Proceed
                </Button>
                {' '}
                <Button onClick={toggleShow}>
                    Cancel
                </Button>
                </ModalFooter>
            </Modal>
        </>
    );
}

export default PaymentButton