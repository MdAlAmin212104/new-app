import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import React from 'react';



export async function loader(){
    const text = {
        name: "text",
        description : "this is description"
    }
    return json(text)
}
const Text = () => {
    const textData = useLoaderData();
    console.log("text-date -----------------------", textData);
    return (
        <div>
            <h1>This is text data</h1>
            <p>Name: {textData.name}</p>
            <p>Description: {textData.description}</p>
        </div>
    );
};

export default Text;