import { Toast, Row, Col } from 'react-bootstrap'

const ToastCustom = ({ msg, handleShow, bgColor }) => {

    return (
        <Row>
            <Col xs={6}>
                <Toast className={`toast show position-fixed text-light ${bgColor}`}
                    style={{ top: '500px', right: '5px', zIndex: 9, maxWidth: '280px' }}
                    delay={3000} autohide>
                    <Toast.Header className="bg-dark text-light">
                        <img
                            src="holder.js/20x20?text=%20"
                            className="rounded me-2"
                            alt=""
                        />
                        <strong className="me-auto">{msg.title}</strong>
                    </Toast.Header>
                    <Toast.Body>{msg.msg}</Toast.Body>
                </Toast>
            </Col>
        </Row>
    )
}

export default ToastCustom