import { useContext, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { DataContext } from '../../store/GlobalState';
import { postData } from '../../utils/fetchData';
import { validateVehicle } from '../../utils/valid'

const Create = () => {

    const { state, dispatch } = useContext(DataContext)

    const { vehicles } = state

    const [vehicle, setVehicle] = useState({
        patent: '',
        brand: '',
        model: '',
        year: ''
    })

    const router = useHistory()

    const handleChangeInput = e => {
        const { name, value } = e.target
        setVehicle({ ...vehicle, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errorMsg = validateVehicle(vehicle.patent, vehicle.brand, vehicle.model, vehicle.year)

        if (errorMsg) return dispatch({ type: 'NOTIFY', payload: { error: errorMsg, show: true } })
        
        const res = await postData('vehicles', vehicle)
        if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}})

        dispatch({ type: "ADD_VEHICLES", payload: [...vehicles, res.newVehicle] })

        dispatch({type: 'NOTIFY', payload: {success: res.msg}}) 

        router.push('/vehicles')

    }

    return (
        <div className="row justify-content-center">
            <div className="col-md-6 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Create Vehicle</h4>
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
                            <button type="submit" className="btn btn-primary mr-2 py-2 w-100">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Create