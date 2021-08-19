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
                                {/*
                                    dailyPermits.map(dailyPermit => (
                                        <tr key={dailyPermit._id}>
                                            <td className="py-1">
                                                <img src={"/assets/images/faces/face1.jpg"} alt="user icon" />
                                            </td>
                                            <td> {new Date(dailyPermit.createdAt).toLocaleDateString()} </td>
                                            <td className="text-capitalize"> {dailyPermit.person} </td>
                                            <td> {dailyPermit.from} </td>
                                            <td className="text-capitalize"> {dailyPermit.reason} </td>
                                        </tr>
                                    ))*/
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