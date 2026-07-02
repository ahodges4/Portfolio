import React, { useState } from "react";
import mockFetch from "../../mockApi";

export default function FileTranscript() {
    
    const [selectedFile, setSelectedFile] = useState(null);
    const [statusMessage, setStatusMessage] = useState("");

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', selectedFile);
        const response = await mockFetch('http://127.0.0.1:5000/generateTranscriptFromFile', {
            method: 'POST',
            body : formData,
        });
        const data = await response.json();
        console.log(data);
        setStatusMessage(data.message || "File processed (demo mode)");
    };
    
    
    return(
        <div className="FileTranscript--Div">
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileSelect} />
                <button type="submit">Upload</button>
            </form>
            {statusMessage && <div className="FileTranscript--Status">{statusMessage}</div>}
        </div>
    );
}