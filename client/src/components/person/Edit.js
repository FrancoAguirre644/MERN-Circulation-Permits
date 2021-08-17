import { useContext, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { updateItem } from '../../store/Actions';
import { DataContext } from '../../store/GlobalState';
import { putData } from '../../utils/fetchData';
import { validatePerson } from '../../utils/valid'

const Edit = ({ match }) => {

    const { state, dispatch } = useContext(DataContext)

    const { persons } = state

    const [person, setPerson] = useState({})

    const router = useHistory()

    useEffect(() => {
        const newArr = persons.filter(person => person._id === match.params.id)
        setPerson(newArr[0])
    }, [persons, match])

    const handleChangeInput = e => {
        const { name, value } = e.target
        setPerson({ ...person, [name]: value })
    }

    const handleSubmit = async e => {
        e.preventDefault()

        const errorMsg = validatePerson(person.firstName, person.lastName, person.document)

        if (errorMsg) return dispatch({ type: 'NOTIFY', payload: { error: errorMsg, show: true } })

        const res = await putData(`persons/${person._id}`, person)
        if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })

        dispatch(updateItem(persons, person._id, res.person, 'ADD_PERSONS'))

        dispatch({ type: 'NOTIFY', payload: { success: res.msg } })

        router.push('/persons')
    }

    return (
        <div className="row justify-content-center">
            <div className="col-md-6 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Update Person</h4>
                        <form className="forms-sample" onSubmit={handleSubmit}>
                            <Form.Group>
                                <label>Fist Name</label>
                                <Form.Control type="text" name="firstName" value={person.firstName}
                                    pattern="[a-zA-Z]*" placeholder="First Name"
                                    onChange={handleChangeInput} />
                            </Form.Group>
                            <Form.Group>
                                <label>Last Name</label>
                                <Form.Control type="text" name="lastName" value={person.lastName}
                                    pattern="[a-zA-Z]*" placeholder="Last Name"
                                    onChange={handleChangeInput} />
                            </Form.Group>
                            <Form.Group>
                                <label>Document</label>
                                <Form.Control type="text" name="document" value={person.document}
                                    pattern="[a-zA-Z]*" placeholder="Document"
                                    onChange={handleChangeInput} />
                            </Form.Group>
                            <button type="submit" className="btn btn-primary mr-2 w-100">Update</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Edit