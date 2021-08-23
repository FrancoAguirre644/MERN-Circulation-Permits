import { useContext, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { DataContext } from '../../store/GlobalState';
import { postData } from '../../utils/fetchData';
import { validateRegister } from '../../utils/valid'

const Create = () => {

    const { state, dispatch } = useContext(DataContext)

    const { auth, users, profiles } = state

    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        cf_password: '',
        profile: ''
    })

    const router = useHistory()

    const handleChangeInput = e => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errorMsg = validateRegister(user.username, user.email, user.password, user.cf_password)

        if (errorMsg) return dispatch({ type: 'NOTIFY', payload: { error: errorMsg, show: true } })

        const res = await postData('users', user, auth.token)
        if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })

        dispatch({ type: "ADD_USERS", payload: [...users, res.newUser] })

        dispatch({ type: 'NOTIFY', payload: { success: res.msg } })

        router.push('/users')

    }

    if(!auth.user || auth.user.profile !== 'admin') return null;

    return (
        <div className="row justify-content-center">


            <div className="col-md-6 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Create User</h4>
                        <hr />
                        <form className="forms-sample" onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-6">
                                    <Form.Group>
                                        <label htmlFor="exampleInputUsername1">Username</label>
                                        <Form.Control type="text" name="username" value={user.username}
                                            placeholder="Username" onChange={handleChangeInput} />
                                    </Form.Group>
                                </div>
                                <div className="col-md-6">
                                    <Form.Group>
                                        <label htmlFor="exampleInputUsername1">Profile</label>
                                        <select className="form-control" name="profile" value={user.profile} required
                                            onChange={handleChangeInput}>
                                            <option value="" selected disabled>Select Profile</option>
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
                                <Form.Control type="email" className="form-control" name="email"
                                    value={user.email} placeholder="Email"
                                    onChange={handleChangeInput} />
                            </Form.Group>
                            <Form.Group>
                                <label htmlFor="exampleInputPassword1">Password</label>
                                <Form.Control type="password" className="form-control" name="password"
                                    value={user.password} placeholder="Password"
                                    onChange={handleChangeInput} />
                            </Form.Group>
                            <Form.Group>
                                <label htmlFor="exampleInputConfirmPassword1">Confirm Password</label>
                                <Form.Control type="password" className="form-control" name="cf_password"
                                    value={user.cf_password} placeholder=" Confirm Password"
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