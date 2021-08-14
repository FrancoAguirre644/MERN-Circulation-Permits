import { useContext } from 'react';
import { DataContext } from '../../store/GlobalState'
import { Link } from 'react-router-dom'

const Index = () => {

    const { state, dispatch } = useContext(DataContext)

    const { users } = state

    return (
        <div className="col-lg-12 grid-margin stretch-card">

            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">
                        Users <Link to="users/create">
                            <button type="button" className="btn btn-outline-success btn-icon-text ml-1" 
                                style={{ float: 'right' }}>Print
                                <i className="mdi mdi-printer btn-icon-append"></i>
                            </button>
                            <button type="button" className="btn btn-outline-info btn-icon-text"
                                style={{ float: 'right' }}>
                                Create <i className="mdi mdi-account-plus btn-icon-append"></i>
                            </button>
                        </Link>
                    </h4>
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th> User </th>
                                    <th> Created </th>
                                    <th> First name </th>
                                    <th> Email </th>
                                    <th> Profile </th>
                                    <th> Actions </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users.map(user => (
                                        <tr key={user._id}>
                                            <td className="py-1">
                                                <img src={"/assets/images/faces/face1.jpg"} alt="user icon" />
                                            </td>
                                            <td> {new Date(user.createdAt).toLocaleDateString()} </td>
                                            <td className="text-capitalize"> {user.username} </td>
                                            <td>
                                                {user.email}
                                            </td>
                                            <td className="text-capitalize"> {user.profile} </td>
                                            <td>
                                                <Link to={`users/${user._id}`}>
                                                    <i className="mdi mdi-tooltip-edit mr-3"
                                                        style={{ cursor: 'pointer' }}>
                                                    </i>
                                                </Link>
                                                <i className="mdi mdi-delete"
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={() => dispatch({
                                                        type: 'ADD_MODAL',
                                                        payload: [{ data: users, id: user._id, title: user.username, type: 'ADD_USERS', show: true }]
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