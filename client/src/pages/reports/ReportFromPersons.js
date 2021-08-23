import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../store/GlobalState';
import { generatePDFDPermit } from '../../services/ReportGeneratorDPermit'
import { Modal } from 'react-bootstrap'
import QR from '../../components/QR'

const ReportFromPersons = () => {

    const { state } = useContext(DataContext)

    const { persons, dailyPermits } = state

    const [dailyPermitsResults, setDailyPermitsResults] = useState([])

    const [show, setShow] = useState(false)

    const [qrLink, setQrLink] = useState('')

    const handleClose = () => setShow(false)
    const handleShow = (dailyPermit) => {
        setQrLink(dailyPermit.qr)
        setShow(true)
    }

    useEffect(() => {
        setDailyPermitsResults(dailyPermits)
    }, [dailyPermits])

    const handleChangeInput = ({ target }) => {
        const filterDailyPermits = dailyPermits.filter(element =>
            element.person._id === target.value
        );

        setDailyPermitsResults(filterDailyPermits)
    }

    return (
        <>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>QR</Modal.Title>
                </Modal.Header>
                <Modal.Body className="row justify-content-center">
                    <QR value={qrLink} />
                </Modal.Body>
                <Modal.Footer></Modal.Footer>
            </Modal>

            <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <label>
                            Bring Permit per Person.
                        </label>
                        <hr />
                        <select className="form-control" name="person" onChange={handleChangeInput}>
                            <option value="" selected disabled>Select Person</option>
                            {
                                persons.map(person => (
                                    <option value={person._id} key={person._id}>
                                        {person.firstName + " " + person.lastName + " - " + person.document}
                                    </option>
                                ))
                            }
                        </select>

                        {
                            dailyPermitsResults.length > 0 && (
                                <button className="btn btn-success btn-icon-text mt-2 p-2 w-100"
                                    onClick={() =>
                                        generatePDFDPermit(
                                            dailyPermitsResults,
                                            `Bring Permit per Person.`
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
                                        <th> QR </th>
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
                                                <td>
                                                    <div class="badge badge-outline-success"
                                                        style={{ 'cursor': 'pointer' }}
                                                        onClick={() => handleShow(dailyPermit)}
                                                    >
                                                        Approved
                                                    </div>
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
        </>
    )
}

export default ReportFromPersons