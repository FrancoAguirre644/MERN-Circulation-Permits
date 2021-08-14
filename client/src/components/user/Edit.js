import { useContext, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { updateItem } from '../../store/Actions';
import { DataContext } from '../../store/GlobalState';
import { putData } from '../../utils/fetchData';

const Edit = ({ match }) => {

    const { state, dispatch } = useContext(DataContext)

    const { users, profiles } = state

    const [user, setUser] = useState({})

    const router = useHistory()

    useEffect(() => {
        const newArr = users.filter(user => user._id === match.params.id)
        setUser(newArr[0])
    }, [users, match])

    const handleChangeInput = e => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
    }

    const handleSubmit = async e => {
        e.preventDefault()

        const res = await putData(`users/${user._id}`, user)
        if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}})

        dispatch(updateItem(users, user._id, res.user, 'ADD_USERS'))

        dispatch({type: 'NOTIFY', payload: {success: res.msg}})

        router.push('/users')
    }

    return (
        <div className="row justify-content-center">
            <div className="col-md-6 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Update User</h4>
                        <form className="forms-sample" onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-6">
                                    <Form.Group>
                                        <label htmlFor="exampleInputUsername1">Username</label>
                                        <Form.Control type="text" id="exampleInputUsername1"
                                            placeholder="Username" value={user.username}
                                            onChange={handleChangeInput}
                                        />
                                    </Form.Group>
                                </div>
                                <div className="col-md-6">
                                    <Form.Group>
                                        <label htmlFor="exampleInputUsername1">Profile</label>
                                        <select className="form-control" name="profile" value={user.profile}
                                            onChange={handleChangeInput}>
                                            <option value="User">User</option>
                                            {
                                                profiles.map(profile => (
                                                    <option value={profile.name} key={profile._id}>{profile.name}</option>
                                                ))
                                            }
                                        </select>
                                    </Form.Group>
                                </div>
                            </div>
                            <Form.Group>
                                <label htmlFor="exampleInputEmail1">Email address</label>
                                <Form.Control type="email" className="form-control" id="exampleInputEmail1"
                                    placeholder="Email" value={user.email}
                                    onChange={handleChangeInput}
                                />
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