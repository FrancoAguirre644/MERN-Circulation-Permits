import { useContext } from 'react';
import { DataContext } from '../../../store/GlobalState';
import { Form } from 'react-bootstrap';

const Create = () => {

    const { state } = useContext(DataContext)

    const { sites } = state

    return (
        <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
                <div className="card-body">
                    Daily Permit
                    <hr />
                    <form>
                        <Form.Group>
                            <div className="input-group">
                                <Form.Control type="text" className="form-control" placeholder="Username" />
                                <div className="input-group-prepend">
                                    <span className="input-group-text" style={{ cursor: 'pointer' }}>
                                        <i class="mdi mdi-account-search"></i>
                                    </span>
                                </div>
                            </div>
                        </Form.Group>
                        <div className="row">
                            <div className="col-md-6">
                                <Form.Group>
                                    <div className="input-group">
                                        <select className="form-control">
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
                                        <select className="form-control">
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
                                        <Form.Control type="text" className="form-control" placeholder="Reason" />
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