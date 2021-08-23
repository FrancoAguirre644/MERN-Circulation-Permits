import { useContext, useEffect, useRef, useState } from 'react';
import { DataContext } from '../../store/GlobalState';
import { Form } from 'react-bootstrap'
import { generatePDFDPermit } from '../../services/ReportGeneratorDPermit'
import { Redirect } from 'react-router-dom' 

const ReportBetweenDates = () => {

    const { state } = useContext(DataContext)

    const { auth, dailyPermits } = state

    const [dailyPermitsResults, setDailyPermitsResults] = useState([])

    const dateFromRef = useRef()
    const dateToRef = useRef()

    useEffect(() => {
        setDailyPermitsResults(dailyPermits)
    }, [dailyPermits])

    const filterBetweenDates = (e) => {
        e.preventDefault()

        let startDate = new Date(dateFromRef.current.value)
        let endDate = new Date(dateToRef.current.value)

        let filterDailyPermits = dailyPermits.filter(element =>
            new Date(element.date) < endDate
            && new Date(element.date) > startDate
        );

        setDailyPermitsResults(filterDailyPermits)
    }

    if(!auth.user || auth.user.profile !== 'auditoria') return  <Redirect to="/" />;

    return (
        <>
            <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <label>
                            Bring Active Permits between Date and Date.
                        </label>
                        <hr />
                        <form onSubmit={filterBetweenDates}>
                            <div className="row">
                                <div className="col-md-6">
                                    <Form.Group>
                                        <div className="input-group">
                                            <Form.Control type="date" className="form-control"
                                                ref={dateFromRef} required />
                                        </div>
                                    </Form.Group>
                                </div>
                                <div className="col-md-6">
                                    <Form.Group>
                                        <div className="input-group">
                                            <Form.Control type="date" className="form-control"
                                                ref={dateToRef} required />
                                        </div>
                                    </Form.Group>
                                </div>
                                <div className="col-md-12">
                                    <button className="btn btn-dark btn-icon-text mt-2 p-2 w-100">
                                        Search
                                    </button>
                                </div>
                            </div>
                        </form>

                        {
                            dailyPermitsResults.length > 0 && (
                                <button className="btn btn-success btn-icon-text mt-2 p-2 w-100"
                                    onClick={() => 
                                    generatePDFDPermit(
                                        dailyPermitsResults,
                                        `Bring Permits between Date and Date (${dateFromRef.current.value} AND ${dateToRef.current.value}).`
                                    )}
                                >
                                    <i className="mdi mdi-printer btn-icon-append"></i>
                                    Print
                                </button>
                            )
                        }

                    </div>
                </div>
            </div>
            <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th> Date </th>
                                        <th> Person </th>
                                        <th> From </th>
                                        <th> To </th>
                                        <th> Reason </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        dailyPermitsResults.map(dailyPermit => (
                                            <tr key={dailyPermit._id}>
                                                <td> {new Date(dailyPermit.date).toLocaleDateString()} </td>
                                                <td className="text-capitalize">
                                                    {dailyPermit.person.firstName + " " +
                                                        dailyPermit.person.lastName}
                                                </td>
                                                <td> {dailyPermit.from.site} </td>
                                                <td> {dailyPermit.to.site} </td>
                                                <td className="text-capitalize"> {dailyPermit.reason} </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ReportBetweenDates