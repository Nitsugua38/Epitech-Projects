import { useEffect, useState } from 'react'
import "./Messages.css";

import emailIcon from './assets/email.png';
import settingsIcon from './assets/setting.png';
import stickerIcon from './assets/sticker.svg';

function Messages() {

    const [messageVisible, setMessageVisible] = useState(false);
    const [messageList, setMessageList] = useState([]);
    const [typingMsg, setTypingMsg] = useState("");




    function sendMessage() {
        if (typingMsg.trim() === "") return;

        const newMessage = {
            text: typingMsg,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessageList([...messageList, newMessage]);
        setTypingMsg("");
    }


    useEffect(() => {
        const container = document.querySelector('.AllMsgContainer');
        if (!container) return;
        container.scrollTop = container.scrollHeight;
    }, [messageList]);

    
    useEffect(() => {
        setMessageList([
            { text: "Did you apply yet?", timestamp: new Date(Date.now() - 10 * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
        ]);
    }, []);



    useEffect(() => {
        if (window.innerWidth < 768) {
            const section1 = document.querySelector('.section1');
            const section2 = document.querySelector('.section2');

            if (messageVisible) {
                section1.style.display = 'none';
                section2.style.display = 'block';
            } else {
                section1.style.display = 'block';
                section2.style.display = 'none';
            }
        }

    }, [messageVisible]);


    return (
        <>
            <div className='section1'>
                <div className='MessageTopBar'>
                    <div>Chat</div>
                    <div className='MessageTopBarIcons'>
                        <img src={settingsIcon} alt="Settings Icon"/>
                        <img src={emailIcon} alt="Email Icon"/>
                    </div>
                </div>

                <div className='MessageSearchBar'>
                    Search
                </div>

                <span className='MessageFilter'>All</span>
                <span className='MessageFilter'>Requested</span>


                <div className={`MessageItem ${messageVisible ? 'MessageActive' : ''}`} onClick={() => setMessageVisible(!messageVisible) }>
                    <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="Profile Picture"/>
                    <div className='MessageItemContent'>
                        <div className='MessagePS'>
                            <b>John Doe</b>
                            <span><i>You:&nbsp;</i> Did you apply yet?</span>
                        </div>
                        <div className='MessageRT'>
                            Sent 10m ago
                        </div>
                    </div>
                </div>

            </div>




            
            <div className='section2'>
                {messageVisible && (
                    <>
                        <div className='M2TopBar'>
                            <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="Profile Picture"/>
                            John Doe
                        </div>


                        <img className='M2CentralIMG' src="https://randomuser.me/api/portraits/men/1.jpg" alt="Profile Picture"/>
                        <div className='M2CentralTxt'>View Profile</div>

                        <div className='M2separator'></div>


                        <div className='AllMsgContainer'>
                            {messageList.map((msg, index) => (
                                <div className='OneMessage'>
                                    <span className='M2msg'>{msg.text}</span>
                                    <span className='M2timestamp'>{msg.timestamp}</span>
                                </div>
                            ))}
                        </div>


                        <div className='M2InputContainer'>
                            <button className='M2AddBtn'>+</button>
                            <button className='M2GIFBtn'>GIF</button>
                            <button className='M2StickerBtn'><img src={stickerIcon} alt="Sticker Icon"/></button>
                            <input className='M2Input' type="text" placeholder='Type a message...' value={typingMsg} onChange={(e) => setTypingMsg(e.target.value)} />
                            <button className='M2SendBtn' onClick={sendMessage}>Send</button>
                        </div>
                    </>
                )}
            </div>
            
            {
                document.addEventListener('keydown', (e) => {
                    if (e.key === "Enter" && messageVisible) {
                        sendMessage();
                    }
                })
            }
        </>
    )
}

export default Messages