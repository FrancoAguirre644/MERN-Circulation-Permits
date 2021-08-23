import { useContext, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { updateItem } from '../../store/Actions';
import { DataContext } from '../../store/GlobalState';
import { putData } from '../../utils/fetchData';
import { validateSite } from '../../utils/valid'

const Edit = ({ match }) => {

    const { state, dispatch } = useContext(DataContext)

    const { auth, sites } = state

    const [site, setSite] = useState({})

    const router = useHistory()

    useEffect(() => {
        const newArr = sites.filter(site => site._id === match.params.id)
        setSite(newArr[0])
    }, [sites, match])

    const handleChangeInput = e => {
        const { name, value } = e.target
        setSite({ ...site, [name]: value })
    }

    const handleSubmit = async e => {
        e.preventDefault()

        const errorMsg = validateSite(site.site, site.postalCode)

        if (errorMsg) return dispatch({ type: 'NOTIFY', payload: { error: errorMsg, show: true } })

        const res = await putData(`sites/${site._id}`, site, auth.token)
        if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })

        dispatch(updateItem(sites, site._id, res.site, 'ADD_SITES'))

        dispatch({ type: 'NOTIFY', payload: { success: res.msg } })

        router.push('/sites')
    }

    if(!auth.user || auth.user.profile !== 'admin') return null;

    return (
        <div className="row justify-content-center">
            <div className="col-md-6 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Update Site</h4>
                        <hr />
                        <form className="forms-sample" onSubmit={handleSubmit}>
                            <Form.Group>
                                <label>Site</label>
                                <Form.Control type="text" name="site" value={site.site}
                                    placeholder="Site" onChange={handleChangeInput} />
                            </Form.Group>
                            <Form.Group>
                                <label>Postal Code</label>
                                <Form.Control type="text" className="form-control" name="postalCode"
                                    value={site.postalCode} placeholder="Postal Code"
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