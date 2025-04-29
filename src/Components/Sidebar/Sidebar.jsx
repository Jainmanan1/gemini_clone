import React, { useContext, useState } from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'
import { TypeAnimation } from 'react-type-animation';

const Sidebar = () => {
  const [extended, setExtended] = useState(false)
  const { onSent, PrevPrompt, setRecentPrompt,newChat } = useContext(Context);
  const loadPrompt = async(prompt)=>{
    setRecentPrompt(prompt);
    await onSent(prompt)
  }

  const handleMouseEnter = () => setExtended(true);
  const handleMouseLeave = () => setExtended(false);

  return (


    <div className='Sidebar' onMouseOver={handleMouseEnter} onMouseOut={handleMouseLeave}>
      <div className='top'>
        <img onClick={() => setExtended((prev) => !prev)} className="menu" src={assets.menu_icon} alt="" title='Toggle Sidebar' />
        <div onClick={()=>newChat()} className='new-chat' title='New chat'>
          <img src={assets.plus_icon} alt="" />
          {extended ? (
            <TypeAnimation
              sequence={['New Chat', 1000]}
              speed={50}
              wrapper="p"
              repeat={0}
              cursor={false}
            />
          ) : null}
        </div>
        {extended ? <div className='recent'>
          <TypeAnimation
              sequence={['Recent', 1000]}
              speed={50}
              wrapper="p"
              className="recent-title"
              repeat={Infinity}
              cursor={false}
            />
          {PrevPrompt.map((item, index) => {
            return (
              <div onClick={()=>loadPrompt(item)} className='recent-entry' key={index}>
                <img src={assets.message_icon} alt="" />
                <p>{item.length>18?item.slice(0,18) +'...':item}</p>
              </div>
            )
          })}

        </div> : null}


      </div>
      <div className="bottom">
        <div className='bottom-item recent-entry' title="Help">
          <img src={assets.question_icon} alt="" />
          {extended ? (
            <TypeAnimation
              sequence={['Help', 1000]}
              speed={50}
              wrapper="p"
              repeat={Infinity}
              cursor={false}
            />
          ) : null}
        </div>

        <div className='bottom-item recent-entry' title="Activity">
          <img src={assets.history_icon} alt="" />
          {extended ? (
            <TypeAnimation
              sequence={['Activity', 1000]}
              speed={50}
              wrapper="p"
              repeat={Infinity}
               cursor={false}   
            />
          ) : null}
        </div>

        <div className='bottom-item recent-entry' title="Settings">
          <img src={assets.setting_icon} alt="" />
          {extended ? (
            <TypeAnimation
              sequence={['Settings', 1000]}
              speed={50}
              wrapper="p"
              repeat={Infinity}
              cursor={false}

            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar
