import { useEffect, useState } from 'react'
import { getData } from '../../utils/fetchData'

const ValidationQR = ({ match }) => {

    const [permit, setPermit] = useState({})
    const [from, setFrom] = useState({})
    const [to, setTo] = useState({})
    const [person, setPerson] = useState({})
    const [err, setErr] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            const resD = await getData(`dailyPermits/validateQR/${match.params.qr}`)
            if (resD.err || !resD.dailyPermit) {
                const resP = await getData(`periodPermits/validateQR/${match.params.qr}`)
                if (resP.err || !resP.periodPermit) return setErr('Permission not found.');
                setPermit(resP.periodPermit)
                setFrom(resP.periodPermit.from)
                setTo(resP.periodPermit.to)
                setPerson(resP.periodPermit.person)
            } else {
                setPermit(resD.dailyPermit)
                setFrom(resD.dailyPermit.from)
                setTo(resD.dailyPermit.to)
                setPerson(resD.dailyPermit.person)
            }

        }

        fetchData()

    }, [match.params.qr])

    if (err) return <div className="alert alert-danger">{err}</div>

    return (
        <div>
            <div className="row justify-content-center">
                <div className="col-md-7">
                    <div className="card mb-3s">
                        <div className="row no-gutters">
                            <div className="col-md-4">
                                <svg
                                    className="bd-placeholder-img"
                                    width="100%"
                                    height="250"
                                    xmlns="http://www.w3.org/2000/svg"
                                    aria-label="Placeholder: Image"
                                    preserveAspectRatio="xMidYMid slice"
                                    role="img"
                                >
                                    <title>Placeholder</title>
                                    <rect width="100%" height="100%" fill="#868e96" />
                                    <text x="50%" y="50%" fill="#dee2e6" dy=".3em">
                                        Image
                                    </text>
                                </svg>
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">
                                        Permit
                                        <span className="float-right">
                                            #{permit._id}
                                        </span>
                                    </h5>
                                    <p className="card-text">
                                    </p>
                                    <p className="card-text">
                                        Person:
                                        <span className="float-right">
                                            {person.firstName + " " + person.lastName}
                                        </span>
                                    </p>
                                    <p className="card-text">
                                        From:
                                        <span className="float-right">
                                            {from.site}
                                        </span>
                                    </p>
                                    <p className="card-text">
                                        To:
                                        <span className="float-right">
                                            {to.site}
                                        </span>
                                    </p>
                                    <p className="card-text">
                                        <small className="text-muted">
                                            {permit.reason}
                                        </small>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ValidationQR