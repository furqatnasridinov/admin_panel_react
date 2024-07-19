import React, { useState, useEffect } from 'react';


const DocumentViewer = ({ fileUrl }) => {
  const googleDocsViewerUrl = `https://docs.google.com/gview?url=${fileUrl}&embedded=true`;

  return (
    <iframe
      src={googleDocsViewerUrl}
      style={{ width: '100%', height: '500px' }}
      frameBorder="0"
    ></iframe>
  );
};

export default function MyGymsPageCrm() {
 
  const fileUrl = 'https://myfit-russia.ru/doc/test.docx';

  return (
    <div>
      <DocumentViewer fileUrl={fileUrl} />
    </div>
  );
}