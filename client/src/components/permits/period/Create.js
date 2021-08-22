import { useContext, useRef, useState } from 'react';
import { DataContext } from '../../../store/GlobalState';
import { Form } from 'react-bootstrap';
import { validatePeriodPermit } from '../../../utils/valid'
import { postData } from '../../../utils/fetchData';

const Create = () => {

    const { state, dispatch } = useContext(DataContext)

    const { sites, persons, vehicles } = state

    const [personDocument, setPersonDocument] = useState('')

    const [periodPermit, setPeriodPermit] = useState({
        personId: '',
        fromSiteId: '',
        toSiteId: '',
        vehicleId: '',
        days: null,
        vacations: false,
    })

    const refCompleteName = useRef()

    const handleChangeInput = e => {
        const { name, value } = e.target
        setPeriodPermit({ ...periodPermit, [name]: value })
    }

    const searchPerson = () => {
        const person = persons.find(p => p.document === personDocument)

        if (!person) {
            refCompleteName.current.value = ""
            setPeriodPermit({ ...periodPermit, 'personId': '' })
            return dispatch({ type: 'NOTIFY', payload: { error: 'Person not exists', show: true } })
        }

        setPeriodPermit({ ...periodPermit, 'personId': person._id })

        refCompleteName.current.value = person.lastName + " " + person.firstName

    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errorMsg = validatePeriodPermit(periodPermit.personId, periodPermit.fromSiteId,
            periodPermit.toSiteId, periodPermit.vehicleId, periodPermit.days)

        if (errorMsg) return dispatch({ type: 'NOTIFY', payload: { error: errorMsg, show: true } })

        const res = await postData('periodPermits', periodPermit)
        if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err, show: true } })

        //dispatch({ type: "ADD_PERSONS", payload: [...persons, res.newPerson] })

        //dispatch({ type: 'NOTIFY', payload: { success: res.msg } }) 

    }


    return (
        <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
                <div className="card-body">
                    Period Permit
                    <hr />
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-6">
                                <Form.Group>
                                    <div className="input-group">
                                        <Form.Control type="text" className="form-control"
                                            value={personDocument} onChange={(e) => setPersonDocument(e.target.value)}
                                            name="personId" placeholder="Document" />
                                        <div className="input-group-prepend" onClick={() => searchPerson()}>
                                            <span className="input-group-text" style={{ cursor: 'pointer' }}>
                                                <i className="mdi mdi-account-search"></i>
                                            </span>
                                        </div>
                                    </div>
                                </Form.Group>
                            </div>
                            <div className="col-md-6">
                                <Form.Group>
                                    <Form.Control type="text" className="form-control" disabled ref={refCompleteName}
                                        name="personId" placeholder="Complete name" />
                                </Form.Group>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <Form.Group>
                                    <div className="input-group">
                                        <select className="form-control" value={periodPermit.fromSiteId}
                                            name="fromSiteId" onChange={handleChangeInput} >
                                            <option value="" selected disabled>Select from side</option>
                                            {
                                                sites.map(site => (
                                                    <option value={site._id} key={site._id}>{site.site}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </Form.Group>
                            </div>
                            <div className="col-md-6">
                                <Form.Group>
                                    <div className="input-group">
                                        <select className="form-control" value={periodPermit.toSiteId}
                                            name="toSiteId" onChange={handleChangeInput}>
                                            <option value="" selected disabled>Select to side</option>
                                            {
                                                sites.map(site => (
                                                    <option value={site._id} key={site._id}>{site.site}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </Form.Group>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3">
                                <Form.Group>
                                    <div className="input-group">
                                        <Form.Control type="number" className="form-control" onChange={handleChangeInput}
                                            value={periodPermit.days} name="days" placeholder="Days" />
                                    </div>
                                </Form.Group>
                            </div>
                            <div className="col-md-3">
                                <Form.Group>
                                    <div class="form-check">
                                        <label class="form-check-label">
                                            <input type="checkbox" class="form-check-input"
                                                value={periodPermit.vacations} name="vacations"
                                                checked={periodPermit.vacations}
                                                onChange={handleChangeInput}
                                            />
                                            <i class="input-helper"></i>Are vacations?
                                        </label>
                                    </div>
                                </Form.Group>
                            </div>
                            <div className="col-md-3">
                                <Form.Group>
                                    <div className="input-group">
                                        <select className="form-control" value={periodPermit.vehicleId}
                                            name="vehicleId" onChange={handleChangeInput} >
                                            <option value="" selected disabled>Select vehicle</option>
                                            {
                                                vehicles.map(vehicle => (
                                                    <option value={vehicle._id} key={vehicle._id}>{vehicle.patent}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </Form.Group>
                            </div>
                            <div className="col-md-3">
                                <Form.Group>
                                    <div className="input-group">
                                        <Form.Control type="date" className="form-control" />
                                    </div>
                                </Form.Group>
                            </div>
                        </div>
                        <button className="btn btn-primary w-100">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Create