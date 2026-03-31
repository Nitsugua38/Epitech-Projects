import { useState } from 'react'

import jobVideo from "./assets/jobVideo.mp4"
import jobImage from "./assets/jobImage.jpg"
import ApplyPopup from './ApplyPopup'

function Item({ item }) {

    const [isApplying, setIsApplying] = useState(false)

    return (
        <>
            <div className='item'>

                {item == "video" && <video src={jobVideo} autoPlay muted loop playsInline></video>}

                {item == "image" && <img src={jobImage} alt='job image'></img>}

                {item == "post" && <div className='jobPost'><h2>Want to join the McDonald's family?</h2><p>Now recruiting college drop-outs and unemployed graduated students who want to kick-start their career with a dynamic position in one of our restaurants!<br/>Experience needed: none.<br/>Salary: super competitive.</p></div> }


                <div className='overlay'>
                    <div className='jobInfo'>
                        <strong>Job Title</strong>
                        <span>Company</span>
                    </div>

                    <button className='applyBtn' onClick={() => setIsApplying(true)}>Apply</button>

                    <div className='quickActions'>
                        <span>❤️</span>
                        <span>💬</span>
                        <span>📩</span>
                    </div>


                    {isApplying && <ApplyPopup isApplying={isApplying} setIsApplying={setIsApplying} />}

                </div>

            </div>
        </>
    )
}

export default Item