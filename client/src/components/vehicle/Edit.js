import { useContext, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { updateItem } from '../../store/Actions';
import { DataContext } from '../../store/GlobalState';
import { putData } from '../../utils/fetchData';
import { validateVehicle } from '../../utils/valid'

const Edit = ({ match }) => {

    const { state, dispatch } = useContext(DataContext)

    const { auth, vehicles } = state

    const [vehicle, setVehicle] = useState({})

    const router = useHistory()

    useEffect(() => {
        const newArr = vehicles.filter(vehicle => vehicle._id === match.params.id)
        setVehicle(newArr[0])
    }, [vehicles, match])

    const handleChangeInput = e => {
        const { name, value } = e.target
        setVehicle({ ...vehicle, [name]: value })
    }

    const handleSubmit = async e => {
        e.preventDefault()

        const errorMsg = validateVehicle(vehicle.patent, vehicle.brand, vehicle.model, vehicle.year)

        if (errorMsg) return dispatch({ type: 'NOTIFY', payload: { error: errorMsg, show: true } })
        
        const res = await putData(`vehicles/${vehicle._id}`, vehicle, auth.token)
        if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}})
        
        dispatch(updateItem(vehicles, vehicle._id, res.vehicle, 'ADD_VEHICLES'))

        dispatch({type: 'NOTIFY', payload: {success: res.msg}})  

        router.push('/vehicles')
    }

    if(!auth.user || auth.user.profile !== 'admin') return null;

    return (
        <div className="row justify-content-center">
            <div className="col-md-6 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Update Person</h4>
                        <hr />
                        <form className="forms-sample" onSubmit={handleSubmit}>
                            <Form.Group>
                                <label>Patent</label>
                                <Form.Control type="text" name="patent" value={vehicle.patent}
                                    placeholder="Patent" onChange={handleChangeInput} />
                            </Form.Group>
                            <Form.Group>
                                <label>Brand</label>
                                <Form.Control type="text" name="brand" value={vehicle.brand}
                                    placeholder="Brand" onChange={handleChangeInput} />
                            </Form.Group>
                            <Form.Group>
                                <label>Model</label>
                                <Form.Control type="text" name="model" value={vehicle.model}
                                    placeholder="Model" onChange={handleChangeInput} />
                            </Form.Group>
                            <Form.Group>
                                <label>Year</label>
                                <Form.Control type="text" name="year" value={vehicle.year}
                                    placeholder="Year" onChange={handleChangeInput} />
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