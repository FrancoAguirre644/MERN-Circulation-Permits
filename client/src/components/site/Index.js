import { useContext } from 'react';
import { DataContext } from '../../store/GlobalState'
import { Link } from 'react-router-dom'

const Index = () => {

    const { state, dispatch } = useContext(DataContext)

    const { sites } = state

    return (
        <div className="col-lg-12 grid-margin stretch-card">

            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">
                        Sites 
                        <Link to="sites/create">
                            <button type="button" className="btn btn-outline-info btn-icon-text float-right">
                                Create <i className="mdi mdi-account-plus btn-icon-append"></i>
                            </button>
                        </Link>
                    </h4>
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th> Created </th>
                                    <th> Site </th>
                                    <th> Postal Code </th>
                                    <th> Actions </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    sites.map(site => (
                                        <tr key={site._id}>
                                            <td> {new Date(site.createdAt).toLocaleDateString()} </td>
                                            <td className="text-capitalize"> {site.site} </td>
                                            <td>
                                                {site.postalCode}
                                            </td>
                                            <td>
                                                <Link to={`sites/${site._id}`} className="link">
                                                    <i className="mdi mdi-tooltip-edit mr-3"
                                                        style={{ cursor: 'pointer' }}>
                                                    </i>
                                                </Link>
                                                <i className="mdi mdi-delete"
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={() => dispatch({
                                                        type: 'ADD_MODAL',
                                                        payload: [{ data: sites, id: site._id, title: site.site, type: 'ADD_SITES', show: true }]
                                                    })}>
                                                </i>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index