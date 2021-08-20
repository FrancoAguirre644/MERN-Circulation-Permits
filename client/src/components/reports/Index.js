import { Link } from 'react-router-dom'

const Index = () => {
    return (
        <div className="col-md-12 grid-margin stretch-card">
            <div className="card">
                <div className="card-body">
                    <div className="d-flex flex-row justify-content-between">
                        <h4 className="card-title mb-1">Reports</h4>
                        <p className="text-muted mb-1">Your data status</p>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="preview-list">
                                <div className="preview-item border-bottom">
                                    <div className="preview-thumbnail">
                                        <div className="preview-icon bg-primary">
                                            <i className="mdi mdi-file-document"></i>
                                        </div>
                                    </div>
                                    <div className="preview-item-content d-sm-flex flex-grow">
                                        <div className="flex-grow">
                                            <Link to="/reports/from/persons" style={{ 'color': 'inherit' }}>
                                                <h6 className="preview-subject">Bring Permit per Person</h6>
                                            </Link>
                                            <p className="text-muted mb-0">Broadcast web app mockup</p>
                                        </div>
                                        <div className="mr-auto text-sm-right pt-2 pt-sm-0">
                                            <p className="text-muted">15 minutes ago</p>
                                            <p className="text-muted mb-0">30 tasks, 5 issues </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="preview-item border-bottom">
                                    <div className="preview-thumbnail">
                                        <div className="preview-icon bg-success">
                                            <i className="mdi mdi-file-document"></i>
                                        </div>
                                    </div>
                                    <div className="preview-item-content d-sm-flex flex-grow">
                                        <div className="flex-grow">
                                            <Link to="reports/between/dates" style={{ 'color': 'inherit' }}>
                                                <h6 className="preview-subject">Bring Active Permits between Date and Date.</h6>
                                            </Link>
                                            <p className="text-muted mb-0">Upload new design</p>
                                        </div>
                                        <div className="mr-auto text-sm-right pt-2 pt-sm-0">
                                            <p className="text-muted">1 hour ago</p>
                                            <p className="text-muted mb-0">23 tasks, 5 issues </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="preview-item border-bottom">
                                    <div className="preview-thumbnail">
                                        <div className="preview-icon bg-info">
                                            <i className="mdi mdi-file-document"></i>
                                        </div>
                                    </div>
                                    <div className="preview-item-content d-sm-flex flex-grow">
                                        <div className="flex-grow">
                                            <Link to="/reports/between/dates/sites"
                                                style={{ 'color': 'inherit' }}>
                                                <h6 className="preview-subject">Bring Active permits between Date and Date that depart / arrive at a certain place</h6>
                                            </Link>
                                            <p className="text-muted mb-0">New project discussion</p>
                                        </div>
                                        <div className="mr-auto text-sm-right pt-2 pt-sm-0">
                                            <p className="text-muted">35 minutes ago</p>
                                            <p className="text-muted mb-0">15 tasks, 2 issues</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index