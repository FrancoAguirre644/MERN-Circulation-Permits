import { useContext, useState } from 'react';
import { Link, useHistory, Redirect } from 'react-router-dom';
import { DataContext } from '../../store/GlobalState';
import { postData } from '../../utils/fetchData';
import { validateRegister } from '../../utils/valid'

const Register = () => {

  const initialState = { username: '', email: '', password: '', cf_password: '' }
  const [userData, setUserData] = useState(initialState)
  const { username, email, password, cf_password } = userData

  const { state, dispatch } = useContext(DataContext)

  const { auth } = state

  const router = useHistory()

  const handleChangeInput = e => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
  }

  const handleSubmit = async e => {
    e.preventDefault();

    const errorMsg = validateRegister(username, email, password, cf_password);
    if (errorMsg) return dispatch({ type: 'NOTIFY', payload: { error: errorMsg, show: true } })

    const res = await postData('auth/register', userData)

    if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })

    dispatch({ type: 'NOTIFY', payload: { success: res.msg, show: true } })

    router.push("/login")

  }

  if (auth.user) return <Redirect to="/" />

  return (
    <div>
      <div className="d-flex align-items-center auth px-0 h-100">
        <div className="row w-100 mx-0">
          <div className="col-lg-4 mx-auto">
            <div className="card text-left py-5 px-4 px-sm-5">
              <h6 className="font-weight-light">Signing up is easy. It only takes a few steps</h6>
              <form className="pt-3" onSubmit={handleSubmit}>
                <div className="form-group">
                  <input type="text" className="form-control form-control-lg"
                    name="username" value={userData.username} placeholder="Username"
                    onChange={handleChangeInput} />
                </div>
                <div className="form-group">
                  <input type="email" className="form-control form-control-lg"
                    name="email" value={userData.email} placeholder="Email"
                    onChange={handleChangeInput} />
                </div>
                <div className="form-group">
                  <input type="password" className="form-control form-control-lg"
                    name="password" value={userData.password} placeholder="Password"
                    onChange={handleChangeInput} />
                </div>
                <div className="form-group">
                  <input type="password" className="form-control form-control-lg"
                    name="cf_password" value={userData.cf_password} placeholder="Confirm Password"
                    onChange={handleChangeInput} />
                </div>
                <div className="mb-4">
                  <div className="form-check">
                    <label className="form-check-label text-muted">
                      <input type="checkbox" className="form-check-input" />
                      <i className="input-helper"></i>
                      I agree to all Terms & Conditions
                    </label>
                  </div>
                </div>
                <div className="mt-3">
                  <button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">SIGN UP</button>
                </div>
                <div className="text-center mt-4 font-weight-light">
                  Already have an account? <Link to="/login" className="text-primary">Login</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
