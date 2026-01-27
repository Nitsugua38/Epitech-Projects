import profilephoto from "../../common_components/assets/profile.svg"
import jobpostpic from "./assets/jobexample.png"

function NotifPost({aT}) {

    return (
        <>
            <div className='oneNotif'>                
                <img src={profilephoto} alt='profile picture' className='profilePic'></img>
                <span>{"Lorem ipsum dolor sit amet. ".repeat(getRandomInt(1, 6))}</span>
                {
                    (aT == "follows") ? <div className="followBtn">Follow</div> :
                    (aT == "jobs" || aT == "likes") ? <img src={jobpostpic} alt='post thumbnail' className='postThumb'></img> :
                    getRandomInt(0, 2) == 1 ? <div className="followBtn">Follow</div> : <img src={jobpostpic} alt='post thumbnail' className='postThumb'></img>
                }
            </div>
        </>
    )
}

export default NotifPost





function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}