import { useContext, useState } from 'react';
import { updateItem } from '../../store/Actions';
import { DataContext } from '../../store/GlobalState';
import { postData, putData } from '../../utils/fetchData';

const Index = () => {

    const { state, dispatch } = useContext(DataContext)

    const { profiles } = state

    const [name, setName] = useState('')

    const [id, setId] = useState('')

    const createProfile = async () => {
        //if (auth.user.role !== 'admin') return dispatch({ type: 'NOTIFY', payload: { error: 'Authentication is not valid.' } })

        if (!name) return dispatch({ type: 'NOTIFY', payload: { error: 'Name is required.' } })

        dispatch({ type: 'NOTIFY', payload: { loading: true } })

        let res;

        if (id) {
            res = await putData(`profiles/${id}`, { name })

            if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })
            
            dispatch(updateItem(profiles, id, res.profile, 'ADD_PROFILES')) 

        } else {
            res = await postData('profiles', { name })

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
                        <button type="button" class="btn btn-outline-info mr-2" onClick={createProfile}>{id ? "Update" : "Create"}</button>
                        <button type="button" class="btn btn-outline-success btn-icon-text">Print<i class="mdi mdi-printer btn-icon-append"></i></button>
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
                                                <i className="mdi mdi-delete" style={{ cursor: 'pointer' }}>
                                                </i>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div> {/*
                    <div key={profile._id} className="card text-capitalize">
                        <div className="card-body d-flex justify-content-between ">
                            {profile.name}

                            <div style={{ cursor: 'pointer' }}>
                                <i className="fas fa-edit mr-2 text-info"
                                    onClick={() => handleEditProfile(profile)}></i>

                                <i className="fas fa-trash-alt mr-2 text-danger"
                                    data-toggle="modal" data-target="#exampleModal"
                                ></i>
                            </div>

                        </div>

                        <hr />

                        
                    </div> */}

                </div>
            </div>
        </div>
    )
}

export default Index