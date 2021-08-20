const TableReport = (dailyPermits) => {

    return (
        <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th> User </th>
                                    <th> Created </th>
                                    <th> First name </th>
                                    <th> Email </th>
                                    <th> Profile </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    dailyPermits.map(dailyPermit => (
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
    )
}

export default TableReport