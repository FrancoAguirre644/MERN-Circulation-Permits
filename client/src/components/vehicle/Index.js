import { useContext } from 'react';
import { DataContext } from '../../store/GlobalState'
import { Link } from 'react-router-dom'

const Index = () => {

    const { state, dispatch } = useContext(DataContext)

    const { vehicles } = state

    return (
        <div className="col-lg-12 grid-margin stretch-card">

            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">
                        Vehicles
                        <Link to="vehicles/create">
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
                                    <th> Patent </th>
                                    <th> Brand </th>
                                    <th> Model </th>
                                    <th> Year </th>
                                    <th> Actions </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    vehicles.map(vehicle => (
                                        <tr key={vehicle._id}>
                                            <td> {new Date(vehicle.createdAt).toLocaleDateString()} </td>
                                            <td className="text-capitalize"> {vehicle.patent} </td>
                                            <td> {vehicle.brand} </td>
                                            <td> {vehicle.model} </td>
                                            <td> {vehicle.year} </td>
                                            <td>
                                                <Link to={`vehicles/${vehicle._id}`} className="link">
                                                    <i className="mdi mdi-tooltip-edit mr-3"
                                                        style={{ cursor: 'pointer' }}>
                                                    </i>
                                                </Link>
                                                <i className="mdi mdi-delete"
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={() => dispatch({
                                                        type: 'ADD_MODAL',
                                                        payload: [{ data: vehicles, id: vehicle._id, title: `${vehicle.brand} ${vehicle.model} - ${vehicle.patent}`, type: 'ADD_VEHICLES', show: true }]
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