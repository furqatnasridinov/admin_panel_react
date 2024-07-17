import React, { useState, useEffect } from 'react';
import DocViewer from "react-doc-viewer";

export default function MyGymsPageCrm() {
  const [doc, setDoc] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch("https://myfit-russia.ru/doc/test.docx")
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch document');
        }
        return [{ uri: "https://myfit-russia.ru/doc/test.docx" }];
      })
      .then(doc => setDoc(doc))
      .catch(error => setError(error.message));
  }, []);

  if (error) {
    return <div>Error loading document: {error}</div>;
  }

  return <DocViewer documents={doc} />;
}