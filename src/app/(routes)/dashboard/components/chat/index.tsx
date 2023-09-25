
'use client'

import AIParagraph from "@/app/_components/AIParagraph";
import { useChat } from "ai/react";
import { useState } from "react";


export default function Chat() {
const [ref, setRef] = useState<HTMLFormElement | null>(null)
const {messages, handleSubmit, handleInputChange, input} = useChat({
    api: '/chat',
  })

return(
    <div className="flex flex-col mx-auto mt-10 w-5/12">
    <AIParagraph messages={messages} />
    <form ref={(ref)=>{setRef(ref)}} className="text-center" onSubmit={handleSubmit}>
          <textarea
            className="border border-black border-opacity-20 p-3 rounded-md bg-white font-mono text-gray-500 w-full h-4/5"
            value={input}
            onChange={handleInputChange}
            placeholder="Say something..."
            maxLength={800}
            rows={1}
            onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    ref?.requestSubmit()
                }
            }}
          />
         <button type="submit" className="bg-blue-500 p-2 mt-3 rounded-sm w-full">Send</button>
       </form>
        
    </div>
)
}