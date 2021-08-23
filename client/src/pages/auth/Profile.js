import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../store/GlobalState';
import { patchData } from '../../utils/fetchData';
import { validateRegister } from '../../utils/valid';

const Profile = () => {

    const { state, dispatch } = useContext(DataContext)

    const { auth } = state

    const initialState = {
        username: '',
        password: '',
        cf_password: ''
    }

    const [data, setData] = useState(initialState)
    const { username, password, cf_password } = data

    useEffect(() => {
        if (auth.user) setData({ ...data, username: auth.user.username })
    }, [auth.user, setData])

    const handleChange = e => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
    }

    const handleUpdateProfile = e => {
        e.preventDefault();

        if (password) {
            const errMsg = validateRegister(username, auth.user.email, password, cf_password)
            if (errMsg) return dispatch({ type: 'NOTIFY', payload: { error: errMsg, show: true } })

            updatePassword()
        }

    }

    const updatePassword = () => {

        patchData('auth/resetPassword', { password })
            .then(res => {
                if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.msg } })
                return dispatch({ type: 'NOTIFY', payload: { success: res.msg } })
            })
    }

    if (!auth.user) return null;

    return (
        <div className="row justify-content-center my-3">
            <div className="col-md-5">
                <div className="card shadow p-3">
                    <h3 className="text-center text-uppercase">
                        {auth.user.profile === 'user' && 'User Profile'}
                        {auth.user.profile === 'admin' && 'Admin Profile'}
                        {auth.user.profile === 'auditoria' && 'Auditoria Profile'}
                    </h3>
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" className="form-control" value={username} name="username"
                            placeholder="Your name" onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input type="text" className="form-control" disabled={true} defaultValue={auth.user.email} />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" value={password} name="password" placeholder="Your new password" onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input type="password" className="form-control" value={cf_password} name="cf_password" placeholder="Confirm your new password" onChange={handleChange} />
                    </div>

                    <button className="btn btn-info" onClick={(e) => handleUpdateProfile(e)}>Update</button>
                </div>
            </div>
        </div>
    )
}

export default Profile