// components/PdfPreviewer.jsx
import React from 'react';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import MyPdfDocument from './MyPdfDocument';

const PdfPreviewer = ({ header, experiences,skills, education }) => {
    return (
        <div>
            <h2>PDF Preview</h2>
            <PDFViewer style={{ width: '100%', height: '500px' }}>
                <MyPdfDocument header={header} experiences={experiences} skills={skills} education={education}/>
            </PDFViewer>
            <br />
            <PDFDownloadLink
                document={<MyPdfDocument header={header} experiences={experiences}  skills={skills} education={education}/>}
                fileName="resume.pdf"
            >
                <button style={{ padding: '10px', backgroundColor: 'blue', color: 'white' }}>
                    Download PDF
                </button>
            </PDFDownloadLink>
        </div>
    );
};

export default PdfPreviewer;
