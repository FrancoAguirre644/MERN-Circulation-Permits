import { Toast } from 'react-bootstrap'

const ToastCustom = ({ msg, handleShow, bgColor }) => {

    return (
        <Toast className={`toast show position-fixed text-light ${bgColor}`}
            style={{ top: '500px', right: '5px', zIndex: 9, maxWidth: '280px' }}
            autohide>
            <Toast.Header className="bg-dark text-light">
                <strong className="me-auto">{msg.title}</strong>
            </Toast.Header>
            <Toast.Body>{msg.msg}</Toast.Body>
        </Toast>
    )
}

export default ToastCustom