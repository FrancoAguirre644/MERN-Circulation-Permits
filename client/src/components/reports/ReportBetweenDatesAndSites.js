import { useContext, useRef, useState } from 'react';
import { DataContext } from '../../store/GlobalState';
import { Form } from 'react-bootstrap'

const ReportBetweenDatesAndSites = () => {

    const { state } = useContext(DataContext)

    const { dailyPermits, sites } = state

    const [dailyPermitsResults, setDailyPermitsResults] = useState([])

    const [fromSite, setFromSide] = useState('')
    const [ToSite, setToSide] = useState('')

    const dateFromRef = useRef()
    const dateToRef = useRef()

    const filterBetweenDates = (e) => {

        e.preventDefault()

        let startDate = new Date(dateFromRef.current.value)
        let endDate = new Date(dateToRef.current.value)


        const filterDailyPermits = dailyPermits.filter(element =>
            element.from._id === fromSite && element.to._id === ToSite
            && new Date(element.date) < endDate && new Date(element.date) > startDate
        );

        setDailyPermitsResults(filterDailyPermits)
    }

    return (
        <>
            <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <label>
                            Select what type of permission you want to generate:
                        </label>
                        <hr />
                        <form onSubmit={filterBetweenDates}>
                            <div className="row">
                                <div className="col-md-3">
                                    <Form.Group>
                                        <div className="input-group">
                                            <Form.Control type="date" className="form-control"
                                                ref={dateFromRef} required />
                                        </div>
                                    </Form.Group>
                                </div>
                                <div className="col-md-3">
                                    <Form.Group>
                                        <div className="input-group">
                                            <Form.Control type="date" className="form-control"
                                                ref={dateToRef} required />
                                        </div>
                                    </Form.Group>
                                </div>
                                <div className="col-md-3">
                                    <Form.Group>
                                        <select className="form-control" required
                                        onChange={(e) => setFromSide(e.target.value)} >
                                            <option value="" selected disabled>Select Person</option>
                                            {
                                                sites.map(site => (
                                                    <option value={site._id} key={site._id}>
                                                        {site.site}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                    </Form.Group>
                                </div>
                                <div className="col-md-3">
                                    <Form.Group>
                                        <select className="form-control" required
                                        onChange={(e) => setToSide(e.target.value)} >
                                            <option value="" selected disabled>Select Site</option>
                                            {
                                                sites.map(site => (
                                                    <option value={site._id} key={site._id}>
                                                        {site.site}
                                                    </option>
                                                ))
                                            }
                                        </select>
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
                                <button className="btn btn-success btn-icon-text mt-2 p-2 w-100">
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

export default ReportBetweenDatesAndSites