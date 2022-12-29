import React,{ useEffect, useState, useRef } from 'react'
import Talk from 'talkjs'

function Chat() {
  const [talkLoaded, markTalkLoaded] = useState(false);
  Talk.ready.then(() => markTalkLoaded(true));


  return (
    <div>Chat</div>
  )
}

export default Chat