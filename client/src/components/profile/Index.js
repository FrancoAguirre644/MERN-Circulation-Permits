import { useContext, useState } from 'react';
import { updateItem } from '../../store/Actions';
import { DataContext } from '../../store/GlobalState';
import { postData, putData } from '../../utils/fetchData';
import { generatePDFProfile } from '../../services/ReportGeneratorProfile'

const Index = () => {

    const { state, dispatch } = useContext(DataContext)

    const { auth, profiles } = state

    const [name, setName] = useState('')

    const [id, setId] = useState('')

    const createProfile = async () => {
        //if (auth.user.role !== 'admin') return dispatch({ type: 'NOTIFY', payload: { error: 'Authentication is not valid.' } })

        if (!name) return dispatch({ type: 'NOTIFY', payload: { error: 'Name is required.' } })

        dispatch({ type: 'NOTIFY', payload: { loading: true } })

        let res;

        if (id) {
            res = await putData(`profiles/${id}`, { name }, auth.token)

            if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })

            dispatch(updateItem(profiles, id, res.profile, 'ADD_PROFILES'))

        } else {
            res = await postData('profiles', { name }, auth.token)

            if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })
            dispatch({ type: "ADD_PROFILES", payload: [...profiles, res.newProfile] })
        }

        setId('')
        setName('')
        return dispatch({ type: 'NOTIFY', payload: { success: res.msg } })
    }

    const handleEditProfile = (profile) => {
        setId(profile._id)
        setName(profile.name)
    }

    if(!auth.user || auth.user.profile !== 'admin') return null;

    return (
        <div className="col-lg-12 grid-margin stretch-card">

            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">Profiles</h4>

                    <div className="row mb-2">

                        <div className="col-md-8">
                            <input type="text" className="form-control"
                                placeholder="Add new Category" value={name}
                                onChange={(e) => setName(e.target.value)} />
                        </div>

                        <div className="col-md-4">
                            <button type="button" className="btn btn-outline-info btn-icon-text mr-2"
                            style={{ 'padding': '9px' }}
                            onClick={createProfile}>{id ? "Update" : "Create"}
                                <i className="mdi mdi-account-plus btn-icon-append"></i>
                            </button>
                            <button type="button" className="btn btn-outline-success btn-icon-text"
                                style={{ 'padding': '9px' }}
                                onClick={() => generatePDFProfile(profiles)}>
                                Print<i className="mdi mdi-printer btn-icon-append"></i>
                            </button>
                        </div>
                    </div>

                    <div className="table-responsive">
                        <table className="table table-striped">
                            <tbody>
                                {
                                    profiles.map(profile => (
                                        <tr key={profile._id}>
                                            <td>{new Date(profile.createdAt).toLocaleDateString()}</td>
                                            <td>{profile.name}</td>
                                            <td>
                                                <i className="mdi mdi-tooltip-edit" style={{ cursor: 'pointer' }}
                                                    onClick={() => handleEditProfile(profile)}>
                                                </i>
                                            </td>
                                            <td>
                                                <i className="mdi mdi-delete" style={{ cursor: 'pointer' }}
                                                    data-toggle="modal" data-target="#exampleModal"
                                                    onClick={() => dispatch({
                                                        type: 'ADD_MODAL',
                                                        payload: [{ data: profiles, id: profile._id, title: profile.name, type: 'ADD_PROFILES', show: true }]
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