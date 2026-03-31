import { useState } from 'react'

import './ApplyPopup.css'

function ApplyPopup({isApplying, setIsApplying}) {


    return (
        <>
            <div className='popup_background'>
                <div className='popup_content'>
                    <button className='PcloseBtn' onClick={() => setIsApplying(false)}>x</button>

                    <h2>Job Title</h2>
                    <p>Company Name</p>
                    <div className='Pdate'>Posted 2 days ago</div>
                    <div className='Plocation'>Location: Remote</div>
                    <div className='Ptype'>Type: Full-time</div>
                    <div className='Psalary'>Salary: $30-50/hr</div>

                    <div className='PcvContainer'>Using:<div className='Pcv'>My Saved CV</div></div>

                    <div className='Pai'>💡 AI Suggestion
                        <div>This job looks like a great fit for you but the salary range is a bit low for this type of position.</div>
                    </div>

                    <button className='PapplyBtn' onClick={() => setIsApplying(false)}>Submit Application</button>
                </div>
            </div>
        </>
    )
}

export default ApplyPopup