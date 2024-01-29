import React from 'react'
import "./DocumentDownload.css"


const DocumentDownload = ({ doc }) => {
    const fileUrl = doc.document
    const fileName = fileUrl.split("-").pop();

    const handleDownload = () => {

        const link = document.createElement('a');
        link.href = `https://attendance.gratiatechnology.com/uploads/${fileUrl}`;
        link.download = fileName;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    return (
        <div>
            <div className='emp_all_document_preview'>
                <p>{doc.document_name}</p>
                <button onClick={handleDownload}>Preview</button>
            </div>
        </div>
    )
}

export default DocumentDownload