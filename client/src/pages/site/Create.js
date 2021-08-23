import { useContext, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { DataContext } from '../../store/GlobalState';
import { postData } from '../../utils/fetchData';
import { validateSite } from '../../utils/valid'

const Create = () => {

    const { state, dispatch } = useContext(DataContext)

    const { sites } = state

    const [site, setSite] = useState({
        site: '',
        postalCode: '',
    })

    const router = useHistory()

    const handleChangeInput = e => {
        const { name, value } = e.target
        setSite({ ...site, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errorMsg = validateSite(site.site, site.postalCode)

        if (errorMsg) return dispatch({ type: 'NOTIFY', payload: { error: errorMsg, show: true } })
        
        const res = await postData('sites', site)
        if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}})

        dispatch({ type: "ADD_SITES", payload: [...sites, res.newSite] })

        dispatch({type: 'NOTIFY', payload: {success: res.msg}}) 

        router.push('/sites')

    }

    return (
        <div className="row justify-content-center">
            <div className="col-md-6 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Create Site</h4>
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
                            <button type="submit" className="btn btn-primary mr-2 py-2 w-100">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Create