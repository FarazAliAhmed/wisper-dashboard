import React, { useState, useEffect } from 'react'
import { useAppState } from '../context/appContext'
import {
    Card,
    Form,
    FormGroup,
    Label,
    Input,
    Row,
    Col,
    CardBody,
    Button,
    UncontrolledAlert,
    Table
} from "reactstrap";

import {
    setMaintenanceNotice,
    clearMaintenanceNotice,
    enterNetworkMaintenance,
    exitNetworkMaintenance
} from '../services/Admin.Services/controlService'
import AdminNotifier from './AdminNotifier';

const AdminControls = () => {

    const { maintenance, setMaintenance } = useAppState()

    const [noticeType, setNoticeType] = useState("warning")
    const [message, setMessage] = useState("")
    const [serverResp, setResp] = useState("none")

    useEffect(() => {
        if(maintenance){
            setNoticeType(maintenance["notice"] ? maintenance["notice"].split(":::")[0] : "warning")
            setMessage(maintenance["notice"] ? maintenance["notice"].split(":::")[1] : "")
        }
    }, [maintenance])

    const handleChange = (e) => {
        setMessage(e.target.value)
    }

    const handleNoticeType = (e) => {
        setNoticeType(e.target.value)
    }

    const saveNotice = () => {
        const resp = setMaintenanceNotice(`${noticeType}:::${message}`)
        setMaintenance({...maintenance, notice: `${noticeType}:::${message}`})
        if(!!resp) setResp(true)
    }

    const clearNotice = () => {
        const resp = clearMaintenanceNotice()
        setMaintenance({...maintenance, notice: null})
        if(!!resp) setResp(true)
        setMessage("")
        setNoticeType("warning")
    }

    const setNetworkMaintenance = (network, status) => {
        setMaintenance({...maintenance, [network]: status})
        if(status){
            enterNetworkMaintenance(network)
        }else{
            exitNetworkMaintenance(network)
        }
    }

    return(
        <Card>
            <Row>
            {serverResp !== "none" && (
                <>
                {serverResp ? (
                    <UncontrolledAlert dismissible color="success">
                    Updated Successfully
                    </UncontrolledAlert>
        
                ) : (
                    <UncontrolledAlert dismissible color="danger">
                    Failed to make Update
                    </UncontrolledAlert>
                )}
                </>
            )}
                <Col md={12}>
                    <div className='mt-3'>
                        <h5>Notification Message</h5>
                        <AdminNotifier maintenance={maintenance} />
                    </div>
                    <div>
                        <Form className="mb-4">
                            <Row form>
                                <Col md={7}>
                                    <FormGroup>
                                    <Input
                                        value={message}
                                        id="message"
                                        name="message"
                                        onChange={handleChange}
                                        type="text"
                                    />
                                    </FormGroup>
                                </Col>
                                <Col md={2}>
                                    <FormGroup>
                                        <Input
                                            onChange={handleNoticeType}
                                            name="notice-type"
                                            value={noticeType}
                                            className="mb-3"
                                            type="select"
                                        >
                                            <option selected value="success">
                                            Success
                                            </option>
                                            <option value="warning">Warning</option>
                                            <option value="error">Error</option>
                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <Button onClick={saveNotice} className="mx-2" color="primary">
                                        Save
                                    </Button>
                                    <Button onClick={clearNotice} className="mx-2" color="danger">
                                        Clear
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </Col>
                <Col md={12}>
                    <div className='mt-3'>
                        <h5>Maintenance Mode</h5>
                    </div>
                    <div>
                <Table
                  className="no-wrap mt-3 align-middle"
                  responsive
                  borderless
                >
                  <thead>
                    <tr>
                        <th>S/N</th>
                        <th>Network</th>
                        <th>Status</th>
                        <th>Maintenance</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-top">
                        <td>1</td>
                        <td>
                            <h6 className="mb-0">MTN SME</h6>
                        </td>
                        <td>
                            {maintenance["mtn_sme"] ?
                                <span className="p-2 bg-danger rounded-circle d-inline-block ms-3"></span>
                                :
                                <span className="p-2 bg-success rounded-circle d-inline-block ms-3"></span>
                            }
                        </td>
                        <td>
                            {maintenance["mtn_sme"] ? 
                                <Button onClick={() => setNetworkMaintenance("mtn_sme", false)} color="success">
                                    <strong>Exit</strong>
                                </Button>
                                    :
                                <Button onClick={() => setNetworkMaintenance("mtn_sme", true)} color="warning">
                                    <strong>Enter</strong>
                                </Button>       
                            }
                        </td>
                    </tr>
                    <tr className="border-top">
                        <td>2</td>
                        <td>
                            <h6 className="mb-0">MTN GIFTING</h6>
                        </td>
                        <td>
                            {maintenance["mtn_gifting"] ?
                                <span className="p-2 bg-danger rounded-circle d-inline-block ms-3"></span>
                                :
                                <span className="p-2 bg-success rounded-circle d-inline-block ms-3"></span>
                            }
                        </td>
                        <td>
                            {maintenance["mtn_gifting"] ? 
                                <Button onClick={() => setNetworkMaintenance("mtn_gifting", false)} color="success">
                                    <strong>Exit</strong>
                                </Button>
                                    :
                                <Button onClick={() => setNetworkMaintenance("mtn_gifting", true)} color="warning">
                                    <strong>Enter</strong>
                                </Button>       
                            }
                        </td>
                    </tr>
                    <tr className="border-top">
                        <td>3</td>
                        <td>
                            <h6 className="mb-0">AIRTEL</h6>
                        </td>
                        <td>
                            {maintenance["airtel"] ?
                                <span className="p-2 bg-danger rounded-circle d-inline-block ms-3"></span>
                                :
                                <span className="p-2 bg-success rounded-circle d-inline-block ms-3"></span>
                            }
                        </td>
                        <td>
                            {maintenance["airtel"] ? 
                                <Button onClick={() => setNetworkMaintenance("airtel", false)} color="success">
                                    <strong>Exit</strong>
                                </Button>
                                    :
                                <Button onClick={() => setNetworkMaintenance("airtel", true)} color="warning">
                                    <strong>Enter</strong>
                                </Button>       
                            }
                        </td>
                    </tr>
                    <tr className="border-top">
                        <td>4</td>
                        <td>
                            <h6 className="mb-0">GLO</h6>
                        </td>
                        <td>
                            {maintenance["glo"] ?
                                <span className="p-2 bg-danger rounded-circle d-inline-block ms-3"></span>
                                :
                                <span className="p-2 bg-success rounded-circle d-inline-block ms-3"></span>
                            }
                        </td>
                        <td>
                            {maintenance["glo"] ? 
                                <Button onClick={() => setNetworkMaintenance("glo", false)} color="success">
                                    <strong>Exit</strong>
                                </Button>
                                    :
                                <Button onClick={() => setNetworkMaintenance("glo", true)} color="warning">
                                    <strong>Enter</strong>
                                </Button>       
                            }
                        </td>
                    </tr>
                    <tr className="border-top">
                        <td>5</td>
                        <td>
                            <h6 className="mb-0">9MOBILE</h6>
                        </td>
                        <td>
                            {maintenance["9mobile"] ?
                                <span className="p-2 bg-danger rounded-circle d-inline-block ms-3"></span>
                                :
                                <span className="p-2 bg-success rounded-circle d-inline-block ms-3"></span>
                            }
                        </td>
                        <td>
                            {maintenance["9mobile"] ? 
                                <Button onClick={() => setNetworkMaintenance("9mobile", false)} color="success">
                                    <strong>Exit</strong>
                                </Button>
                                    :
                                <Button onClick={() => setNetworkMaintenance("9mobile", true)} color="warning">
                                    <strong>Enter</strong>
                                </Button>       
                            }
                        </td>
                    </tr>
                  </tbody>
                </Table>
                    </div>
                </Col>
            </Row>
        </Card>
    )
}

export default AdminControls;