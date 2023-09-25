'use client' 

import {useChat} from 'ai/react'
import { useEffect, useRef } from 'react'


export default function Home() {
  const {messages, handleSubmit, handleInputChange, input} = useChat({
    api: '/lang',
    headers: {
      "session-id": '123', 
    }
  })

  const chatParagraphRef = useRef<HTMLParagraphElement>(null)


  useEffect(()=>{
      chatParagraphRef.current?.scrollIntoView(false)
  }, [messages.length])



  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 ">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <p ref={chatParagraphRef} className="fixed overflow-y-auto max-h-96 left-0 top-0 w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          {messages.map((message) => (
            <div key={message.id}>
             <div className={message.role === "user" ? "font-bold" : "pb-5"}>{message.content}</div>
            </div>
          ))}
        </p>
        </div>
        <div className="flex justify-center">
        <form onSubmit={handleSubmit}>
        <label>
          Say something ooo...
          <input
            className="border border-gray-300 rounded-md p-2 m-2 w-96"
            value={input}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Send</button>
      </form>
        </div>
    </main>
  )
}
