import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'
import { TypeAnimation } from 'react-type-animation'
const Main = () => {
    const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context)
    const value = true;
    return (
        <div className='main'>
            <div className="nav">
                <p>Gemini</p>
                <img src={assets.user_icon} alt="" />
            </div>
            <div className='main-container'>

                {!showResult ?
                    <>
                        <div className='greet'>
                            <p><span>Hello, Dev.</span></p>
                            <p>How can i help you today?</p>
                        </div>
                        <div className="cards">

                            <div className="card">
                                <p> Suggest beautiful places to see on an upcoming road trip</p>
                                <img src={assets.compass_icon} alt="" />
                            </div>

                            <div className="card">
                                <p>Briefly summarize this concept: </p>
                                <img src={assets.bulb_icon} alt="" />
                            </div>

                            <div className="card">
                                <p> Brainstorm team bonding activies for our work retreat </p>
                                <img src={assets.message_icon} alt="" />
                            </div>

                            <div className="card">
                                <p>Improve the readability of the following code</p>
                                <img src={assets.code_icon} alt="" />
                            </div>
                        </div>
                    </> : <div className='result'>
                        <div className={`result-title-${value.toString()}`}>
                            <img src={assets.user_icon} alt="" />
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="result-data">
                            <img src={assets.gemini_icon} alt="" />
                            {loading ?
                                <div className='loader'>
                                    <hr />
                                    <hr />
                                    <hr />
                                </div>
                                :
                                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                            }

                        </div>
                    </div>

                }


                <div className='main-bottom'>
                    <div className="search-box">


                        <div className="input-wrapper">
                            <input
                                onChange={(e) => setInput(e.target.value)}
                                value={input}
                                type="text"
                            />
                            {!input && (
                                <div className="animated-placeholder">
                                    <TypeAnimation
                                        sequence={[
                                            'Enter a prompt here...',
                                            2000,
                                            'Try asking for a summary...',
                                            2000,
                                            'Need ideas for your project?',
                                            2000,
                                        ]}
                                        speed={50}
                                        repeat={Infinity}
                                    />
                                </div>
                            )}
                        </div>
                        <div>
                            <img src={assets.gallery_icon} alt="" />
                            <img src={assets.mic_icon} alt="" />
                            {input ? <img onClick={() => onSent()} src={assets.send_icon} alt="" title='Submit' /> : null}
                        </div>
                    </div>
                    <p className='bottom-info'>
                        Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Main
