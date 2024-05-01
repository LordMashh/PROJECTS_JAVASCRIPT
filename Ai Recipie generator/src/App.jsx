import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import OpenAI from "openai";
import './App.css'
// import "dotenv/config";
// import "dotenv"

function App() {
  const [count, setCount] = useState(0)
  let api = "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"
  const openai = new OpenAI({
    apiKey: api,
    dangerouslyAllowBrowser: true ,
  });
  
  async function main() {
    // const completion = await openai.chat.completions.create({
    //   messages: [{"role": "system", "content": "You are a helpful assistant."},
    //       {"role": "user", "content": "Who won the world series in 2020?"},
    //       {"role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020."},
    //       {"role": "user", "content": "Where was it played?"}],
    //   model: "gpt-3.5-turbo",
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          "role": "user",
          "content": "generate a receipe of palak panner for 5 serves"
        }
      ],
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    console.log(completion);
  
    console.log(completion.choices[0]);
  }
  main();
  return (
    <>
Mayank



    </>
  )
}

export default App
