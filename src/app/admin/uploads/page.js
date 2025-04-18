"use client"
import { useState } from 'react';

export default function Home() {
  const [file, setFile] = useState(null);
  const [uploadedPath, setUploadedPath] = useState('');

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/admin/uploads', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    setUploadedPath(data.path);
  };

  return (
    <div className="p-8">
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload} className="ml-4 bg-blue-500 text-white px-4 py-2">Upload</button>

      {uploadedPath && (
        <div className="mt-4">
          <p>Uploaded Image:</p>
          <img src={uploadedPath} alt="Uploaded" width="200" />
        </div>
      )}
    </div>
  );
}
