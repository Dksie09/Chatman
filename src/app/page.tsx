"use client";
import { useState } from "react";

export default function Home() {
  const [theInput, setTheInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Yo, this is Chatman! How can I help you today?",
    },
  ]);

  const Submit = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      callGetResponse();
    }
  };

  const callGetResponse = async () => {
    setIsLoading(true);
    let temp = messages;
    temp.push({ role: "user", content: theInput });
    setMessages(temp);
    setTheInput("");
    console.log("Calling OpenAI...");

    const response = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ messages }),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.content);

    setMessages((prevMessages) => [...prevMessages, output]);
    setIsLoading(false);
  };

  return (
    <div className="relative min-h-screen flex flex-col py-20 items-center justify-between px-24">
      <div className="absolute inset-0 bg-custom-bg bg-cover bg-center filter blur-md"></div>
      <main className="relative flex flex-col items-center justify-between w-full h-full">
        {/* Your content here */}
        <h1 className="text-7xl font-black font-sans text-outline-black">
          The Chatman
        </h1>

        <div className="flex  h-[35rem] w-[40rem] flex-col items-center bg-white rounded-xl">
          <div className=" h-full flex flex-col gap-2 overflow-y-auto py-8 px-3 w-full">
            <div className=" h-full flex flex-col gap-2 overflow-y-auto py-8 px-3 w-full">
              {messages.map((e) => {
                return (
                  <div
                    key={e.content}
                    className={`w-max max-w-[18rem] rounded-md px-4 py-3 h-min ${
                      e.role === "assistant"
                        ? "self-start  bg-gray-200 text-gray-800"
                        : "self-end  bg-pink-500 text-gray-50"
                    } `}
                  >
                    {e.content}
                  </div>
                );
              })}

              {isLoading ? (
                <div className="self-start  bg-gray-200 text-gray-800 w-max max-w-[18rem] rounded-md px-4 py-3 h-min">
                  *thinking*
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="relative gap-2 w-[80%] bottom-4 flex justify-center">
            <textarea
              placeholder="Type your message here..."
              value={theInput}
              onChange={(event) => setTheInput(event.target.value)}
              className="w-[85%] h-12 px-8 py-3
          resize-none overflow-y-auto text-black bg-white border rounded-full border-black outline-none"
              onKeyDown={Submit}
            />
            <button
              onClick={callGetResponse}
              className="w-[15%] bg-pink-500 px-4 py-2 border rounded-full border-black"
            >
              send
            </button>
          </div>
        </div>

        <div></div>
      </main>
    </div>
  );
}
