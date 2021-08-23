import { useContext } from 'react';
import { Toast } from 'react-bootstrap'
import { DataContext } from '../../store/GlobalState';

const ToastCustom = ({ msg, handleShow, bgColor }) => {

    const { dispatch } = useContext(DataContext)

    return (
        <Toast className={`toast show position-fixed text-light ${bgColor}`} 
            onClick={() => dispatch({ type: 'NOTIFY', payload: {} })}
            style={{ top: '500px', right: '5px', zIndex: 9, maxWidth: '280px' }}
            autohide
        >
            <Toast.Header className="bg-dark text-light">
                <strong className="me-auto">{msg.title}</strong>
            </Toast.Header>
            <Toast.Body>{msg.msg}</Toast.Body>
        </Toast>
    )
}

export default ToastCustom