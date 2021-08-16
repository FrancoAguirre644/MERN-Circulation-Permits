import { useContext } from 'react';
import { DataContext } from '../../store/GlobalState'
import { Link } from 'react-router-dom'

const Index = () => {

    const { state, dispatch } = useContext(DataContext)

    const { persons } = state

    return (
        <div className="col-lg-12 grid-margin stretch-card">

            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">
                        Persons 
                        <button type="button" className="btn btn-outline-success btn-icon-text ml-1 float-right">Print
                            <i className="mdi mdi-printer btn-icon-append"></i>
                        </button>
                        <Link to="persons/create">
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
                                    <th> First Name </th>
                                    <th> Last Name </th>
                                    <th> Document </th>
                                    <th> Actions </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    persons.map(person => (
                                        <tr key={person._id}>
                                            <td> {new Date(person.createdAt).toLocaleDateString()} </td>
                                            <td className="text-capitalize"> {person.firstName} </td>
                                            <td> {person.lastName} </td>
                                            <td> {person.document} </td>
                                            <td>
                                                <Link to={`persons/${person._id}`}>
                                                    <i className="mdi mdi-tooltip-edit mr-3"
                                                        style={{ cursor: 'pointer' }}>
                                                    </i>
                                                </Link>
                                                <i className="mdi mdi-delete"
                                                    style={{ cursor: 'pointer' }} 
                                                    onClick={() => dispatch({
                                                        type: 'ADD_MODAL',
                                                        payload: [{ data: persons, id: person._id, title: `${person.lastName} ${person.firstName}`, type: 'ADD_PERSONS', show: true }]
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