import { useContext } from 'react';
import { Modal, Button } from 'react-bootstrap'
import { deleteItem } from '../store/Actions';
import { DataContext } from '../store/GlobalState';
import { deleteData } from '../utils/fetchData';

const ModalCustom = () => {

    const { state, dispatch } = useContext(DataContext)

    const { modal, auth } = state

    const handleClose = () => dispatch({ type: 'ADD_MODAL', payload: [{ show: false }] })

    const deleteUser = (item) => {
        deleteData(`users/${item.id}`, auth.token)
            .then(res => {
                if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })

                dispatch(deleteItem(item.data, item.id, item.type))

                return dispatch({ type: 'NOTIFY', payload: { success: res.msg } })
            })
    }

    const deleteProfile = async (item) => {
        
        await deleteData(`profiles/${item.id}`)
            .then(res => {
                if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })

                dispatch(deleteItem(item.data, item.id, item.type))

                return dispatch({ type: 'NOTIFY', payload: { success: res.msg } })
            }) 
    }

    const deleteSite = async (item) => {
        
        await deleteData(`sites/${item.id}`)
            .then(res => {
                if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })

                dispatch(deleteItem(item.data, item.id, item.type))

                return dispatch({ type: 'NOTIFY', payload: { success: res.msg } })
            }) 
    }

    const handleSubmit = () => {

        if (modal.length !== 0) {

            for (const item of modal) {

                if (item.type === 'ADD_USERS') deleteUser(item)

                if (item.type === 'ADD_PROFILES') deleteProfile(item)

                if (item.type === 'ADD_SITES') deleteSite(item)

                dispatch({ type: 'ADD_MODAL', payload: [{ show: false }] })

            }

        }

    }

    return (
        <Modal show={modal[0].show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{modal.length !== 0 && modal[0].title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>Do you want to delete this item?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalCustom