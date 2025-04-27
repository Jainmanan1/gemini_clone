import { createContext, useState } from "react";
import runChat from "../config/gemini";


export const Context= createContext();

const ContextProvider=(prop)=>{
      const[input,setInput]=useState("");
      const[recentPrompt,setRecentPrompt]=useState("");
      const[prevPrompt,setPrevPrompt]=useState([]);
      const[showResult,setShowResult]=useState(false);
      const[loading,setLoading]=useState(false);
      const[resultData,setResultData]=useState("")
    const onSent= async(prompt)=>{
        const response = await runChat(input);
        console.log("Response from Gemini:", response);
    }
  
    const contextValue={
        prevPrompt,
        setPrevPrompt,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
    }



    return(
        <Context.Provider value={contextValue}>
             {prop.children}
        </Context.Provider>
    )
}
export default  ContextProvider;