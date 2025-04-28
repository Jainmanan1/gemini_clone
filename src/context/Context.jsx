import { createContext, useState } from "react";
import runChat from "../config/gemini";


export const Context = createContext();

const ContextProvider = (prop) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompt, setPrevPrompt] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("")

    const delayPara=(index,nextWord)=>{
         setTimeout(function(){
               setResultData(prev=>  prev+nextWord);
         }, 75*index)
    }
    const onSent = async (prompt) => {
        setResultData("")
        setLoading(true)
        setShowResult(true)
        setRecentPrompt(input)
        setPrevPrompt(prev=>[...prev,input])
        try{
        const response = await runChat(input);
        let responseArray= response.split('**');
        let newResponse="" ;
        for(let i=0;i<responseArray.length;i++){
            if(i % 2 === 0){
                newResponse+= responseArray[i]
            }
            else{
                newResponse +="<b>"+ responseArray[i]+"</b>"
            }
        }
        let newResponse2= newResponse.split("*").join("</br>")
        let newResponseArray = newResponse2.split(" ")
        for(let i=0; i<newResponseArray.length; i++){
            const nextWord= newResponseArray[i]
            delayPara(i,nextWord+" ")
        }

        } catch(error){
            console.error("Error in onSent:",error);
            setResultData("The server is currently overloaded. Please try again later.")
        } finally{
        setLoading(false)
        setInput("")
        }
        
    };

    const contextValue = {
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



    return (
        <Context.Provider value={contextValue}>
            {prop.children}
        </Context.Provider>
    )
}
export default ContextProvider;