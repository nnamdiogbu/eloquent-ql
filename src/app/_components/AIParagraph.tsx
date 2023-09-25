'use client'

import { Message } from "ai"
import { Dispatch, SetStateAction } from "react";

type paragraphContext = {
    messages: Message[];
}
export default function AIParagraph({messages}: paragraphContext){
    console.log(messages)
    return (
        <div className="flex w-full h-fit mt-3 mb-3 mx-auto p-5 border border-black border-opacity-20 rounded-md bg-white font-mono text-gray-500">{messages.map((message, id) =>(
            <p key={message.id}>
                {(message.role ==="assistant" && id === isOdd(messages.length - 1)) && (message.content)}
            </p>
        ))}</div>
    )
}

function isOdd(num: number): number {
    const isOdd = num % 2 === 1
    return isOdd ? num : -1
}