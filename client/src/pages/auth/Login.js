import { useContext, useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { DataContext } from '../../store/GlobalState';
import { postData } from '../../utils/fetchData';


const Login = () => {

  const initialState = { email: '', password: '' }
  const [userData, setUserData] = useState(initialState)

  const { state, dispatch } = useContext(DataContext)

  const { auth } = state

  const router = useHistory()

  const handleChangeInput = e => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
  }

  const handleSubmit = async e => {
    e.preventDefault();

    const res = await postData('auth/login', userData)

    if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })
    dispatch({ type: 'NOTIFY', payload: { success: res.msg, show: true } })

    dispatch({
      type: 'AUTH', payload: {
        token: res.token,
        user: res.user
      }
    })

    localStorage.setItem('jwt', res.token)

    router.push("/")

  }

  if (auth.user) return <Redirect to="/" />

  return (
    <div>
      <div className="d-flex align-items-center auth px-0">
        <div className="row w-100 mx-0">
          <div className="col-lg-4 mx-auto">
            <div className="card text-left py-5 px-4 px-sm-5">
              <div className="brand-logo">
              </div>
              <h6 className="font-weight-light">Sign in to continue.</h6>
              <form className="pt-3" onSubmit={handleSubmit}>
                <Form.Group className="d-flex search-field">
                  <Form.Control type="email" placeholder="Email"
                    name="email" onChange={handleChangeInput} size="lg"
                    value={userData.email} className="h-auto" />
                </Form.Group>
                <Form.Group className="d-flex search-field">
                  <Form.Control type="password" placeholder="Password"
                    name="password" onChange={handleChangeInput} size="lg"
                    value={userData.password} className="h-auto" />
                </Form.Group>
                <div className="mt-3">
                  <button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">SIGN IN</button>
                </div>
                <div className="text-center mt-4 font-weight-light">
                  Don't have an account? <Link to="/register" className="text-primary">Register</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
