import React, {useState, useEffect} from 'react'
import { Button, Form, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, FormText, FormFeedback, Label } from 'reactstrap'
import {usePaystackPayment} from 'react-paystack'
import { useUser } from '../context/userContext'
import { addPayment } from '../services/dataService'

const { REACT_APP_PAYSTACK_PUBLIC_KEY } = process.env



const PaymentButton = () => {

    const { user } = useUser()
    const [show, setShow] = useState(false)
    const [price, setPrice] = useState()
    const [invalid, setInvalid] = useState(true)

    useEffect(() => {
        if (parseInt(price) < 1000){
            setInvalid(true)
        }else {
            setInvalid(false)
        }
    }, [price])

    const paymentConfig = {
        publicKey: REACT_APP_PAYSTACK_PUBLIC_KEY,
        reference: "trx-" + Math.floor(Math.random() * 10000000000000000),
        amount: `${price}00`,
        email: user.email,
        currency: "NGN",
        channels: ["card", "bank", "qr", "mobile_money", "bank_transfer"],
        metadata: {
            name: `${user.name}`,
            mobile_number: `${user.mobile_number}`,
            email: `${user.email}`,
            custom_fields: [
                {
                    display_name: "User Name",
                    variable_name: "user_name",
                    value: `${user.name}`,
                },
                {
                    display_name: "Mobile Number",
                    variable_name: "mobile_number",
                    value: `${user.mobile_number}`,
                },
                {
                    display_name: "Email",
                    variable_name: "email",
                    value: `${user.email}`,
                },
                {
                    display_name: "User ID",
                    variable_name: "user_id",
                    value: `${user._id}`,
                },
            ],
        },
    }
    
    const initiatePayment = usePaystackPayment(paymentConfig)

    const makePayment = () => {
        if(!invalid) initiatePayment(onSuccess, onClose);
    }

    const onSuccess = () => {
        // call backend and add payment to history
        const paymentObject = {
            business_name: user.name,
            business_id: user._id,
            amount: price,
            payment_ref: paymentConfig.reference,
        }
        addPayment(paymentObject).then(() => {
            // show alert indicating payment was addedd
        })
    }

    const onClose = () => {
        toggleShow()
    }

    const toggleShow = () => {
        setShow(!show)
    }

    const setAmount = (e) => {
        setPrice(e.target.value)
    }

    return(
        <>
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