import { useState } from "react";
import { object, string } from "zod";
import { api } from "../utils/api";

export const tweetSchema = object({
    text: string({
        required_error: "Tweet text is required",
    }).min(10).max(280),
})

export function CreateTweet(){
    const [text, setText] = useState("");
    const [error, setError] = useState("");
    const { mutateAsync } = api.tweet.create.useMutation();
    
    async function handleSubmit(e){
        e.preventDefault();
        try{
            await tweetSchema.parse({ text });
        } catch(e){
            setError(e.message);
            return;
        }
        mutateAsync({text});
    }

    return (
        <>
            {error && JSON.stringify(error)}
            <form onSubmit={handleSubmit} className="mb-4 flex flex-col border-2 p-4 rounded-md w-full ">
                <textarea 
                className="p-4 shadow w-full"
                onChange={()=> setText(e.target.value)}/>
                <div className="mt-4 flex justify-end">
                    <button className="bg-primary text-white px-4 py-2 rounded-md" type="submit">Tweet</button>
                </div>
            </form>
        </>

    )
}