import { useState } from 'react';
import { Form } from 'react-bootstrap';
import CreateDailyPermit from './daily/Create';
import CreatePeriodPermit from './period/Create';

const Index = () => {

    const [chosenPermit, setChosePermit] = useState('')

    return (
        <>
            <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <Form.Group>
                            <label>
                                Select what type of permission you want to generate:
                            </label>
                            <select className="form-control" onChange={(e) => setChosePermit(e.target.value)}>
                            <option value="Daily" selected disabled>Select type of permission</option>
                                <option value="Daily">Daily Permit</option>
                                <option value="Period">Period Permit</option>
                            </select>
                        </Form.Group>
                    </div>
                </div>
            </div>

            {
                chosenPermit === 'Daily' && (
                    <CreateDailyPermit />
                )
            }

            {
                chosenPermit === 'Period' && (
                    <CreatePeriodPermit />
                )
            }

        </>
    )
}

export default Index