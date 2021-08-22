import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../store/GlobalState';
import { generatePDFPPermit } from '../../services/ReportGeneratorPPermit'

const ReportFromVehicles = () => {

    const { state } = useContext(DataContext)

    const { vehicles, periodPermits } = state

    const [periodPermitsResults, setPeriodPermitsResults] = useState([])

    useEffect(() => {
        setPeriodPermitsResults(periodPermits)
    }, [periodPermits])

    const handleChangeInput = ({ target }) => {
        const filterPeriodPermits = periodPermits.filter(element =>
            element.vehicle._id === target.value
        );

        setPeriodPermitsResults(filterPeriodPermits)
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
                        <select className="form-control" name="person" onChange={handleChangeInput}>
                            <option value="" selected disabled>Select Vehicle</option>
                            {
                                vehicles.map(vehicle => (
                                    <option value={vehicle._id} key={vehicle._id}>
                                        {vehicle.patent}
                                    </option>
                                ))
                            }
                        </select>

                        {
                            periodPermitsResults.length > 0 && (
                                <button className="btn btn-success btn-icon-text mt-2 p-2 w-100"
                                    onClick={ () => 
                                    generatePDFPPermit(
                                        periodPermitsResults, 
                                        'Bringing Permit by Vehicle.'
                                    ) 
                                }>
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
                                        <th> Vehicle </th>
                                        <th> Days </th>
                                        <th> Vacations </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        periodPermitsResults.map(periodPermit => (
                                            <tr key={periodPermit._id}>
                                                <td> {new Date(periodPermit.date).toLocaleDateString()} </td>
                                                <td className="text-capitalize">
                                                    {periodPermit.person.firstName + " " +
                                                        periodPermit.person.lastName}
                                                </td>
                                                <td> {periodPermit.from.site} </td>
                                                <td> {periodPermit.to.site} </td>
                                                <td> {periodPermit.vehicle.patent} </td>
                                                <td> {periodPermit.days} </td>
                                                <td> {periodPermit.vacations ? 'Yes' : 'No'} </td>
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

export default ReportFromVehicles