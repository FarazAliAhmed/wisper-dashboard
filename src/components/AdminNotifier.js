import React, { useEffect, useState } from 'react'
import {
    Card,
    CardBody,
} from 'reactstrap'

const typeMap = {
    success: "notice-success",
    warning: "notice-warning",
    error: "notice-error"
}

function AdminNotifier({maintenance}){
    const [noticeType, setNoticeType] = useState("warning");
    const [message, setMessage] = useState(null);

    useEffect(() => {
        setNoticeType(maintenance["notice"]?.split(":::")[0] || "warning")
        setMessage(maintenance["notice"]?.split(":::")[1] || null)
    }, [maintenance])

    return(
        <Card className={`shadow-none ${typeMap[noticeType]}`}>
            <CardBody>
                <div className="py-2 border-bottom fw-bold">{message}</div>
            </CardBody>
        </Card>
    )
}

export default AdminNotifier;