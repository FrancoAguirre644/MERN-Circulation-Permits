import { useContext, useRef, useState } from 'react';
import { DataContext } from '../../../store/GlobalState';
import { Form } from 'react-bootstrap';
import { validateDailyPermit } from '../../../utils/valid'
import { postData } from '../../../utils/fetchData';

const Create = () => {

    const { state, dispatch } = useContext(DataContext)

    const { sites, persons } = state

    const [personDocument, setPersonDocument] = useState('')

    const [dailyPermit, setDailyPermit] = useState({
        personId: '',
        fromSiteId: '',
        toSiteId: '',
        reason: ''
    })

    const refCompleteName = useRef()

    const handleChangeInput = e => {
        const { name, value } = e.target
        setDailyPermit({ ...dailyPermit, [name]: value })
    }

    const searchPerson = () => {
        const person = persons.find(p => p.document === personDocument)

        if(!person) {
            refCompleteName.current.value = ""
            return dispatch({ type: 'NOTIFY', payload: { error: 'Person not exists', show: true } }) 
        }
        
        setDailyPermit({...dailyPermit, 'personId': person._id})

        refCompleteName.current.value = person.lastName + " " + person.firstName

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const errorMsg = validateDailyPermit(dailyPermit.personId, dailyPermit.fromSiteId, 
            dailyPermit.toSiteId, dailyPermit.reason)

        if (errorMsg) return dispatch({ type: 'NOTIFY', payload: { error: errorMsg, show: true } })

        const res = await postData('dailyPermits', dailyPermit)
        if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })

        //dispatch({ type: "ADD_PERSONS", payload: [...persons, res.newPerson] })

        //dispatch({ type: 'NOTIFY', payload: { success: res.msg } }) 

    }


    return (
        <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
                <div className="card-body">
                    Daily Permit
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
                                        <select className="form-control" value={dailyPermit.fromSiteId}
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
                                        <select className="form-control" value={dailyPermit.toSiteId}
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
                            <div className="col-md-8">
                                <Form.Group>
                                    <div className="input-group">
                                        <Form.Control type="text" className="form-control" onChange={handleChangeInput}
                                            value={dailyPermit.reason} name="reason" placeholder="Reason" />
                                    </div>
                                </Form.Group>
                            </div>
                            <div className="col-md-4">
                                <Form.Group>
                                    <div className="input-group">
                                        <Form.Control type="date" className="form-control" placeholder="Username" />
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