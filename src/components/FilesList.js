import React, { useState, useEffect } from "react";
import download from "downloadjs";
import axios from "axios";
import { API_URL } from "../utils/constants";
import mammoth from "mammoth";

var options = {
  styleMap: [
      "comment-reference => sup"
  ]
};

const FilesList = () => {
  const [filesList, setFilesList] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [previewContent, setPreviewContent] = useState("");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  useEffect(() => {
    const getFilesList = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/getAllFiles`);
        setErrorMsg("");
        setFilesList(data);
      } catch (error) {
        error.response && setErrorMsg(error.response.data);
      }
    };

    getFilesList();
  }, []);

  const previewFile = async (id) => {
    try {
      const result = await axios.get(`${API_URL}/download/${id}`, {
        responseType: "blob",
      });
      const reader = new FileReader();
      reader.readAsArrayBuffer(result.data);
      reader.onload = async () => {
        const arrayBuffer = reader.result;
        const { value } = await mammoth.convertToHtml({ arrayBuffer }, options);
        setPreviewContent(value);
        setIsPreviewOpen(true);
      };
    } catch (error) {
      // Handle error
    }
  };

  const closePreview = () => {
    setIsPreviewOpen(false);
    setPreviewContent("");
  };

  return (
    <div className="files-container">
      {errorMsg && <p className="errorMsg">{errorMsg}</p>}
      <table className="files-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Preview File</th>
          </tr>
        </thead>
        <tbody>
          {filesList.length > 0 ? (
            filesList.map(({ _id, title, description }) => (
              <tr key={_id}>
                <td className="file-title">{title}</td>
                <td className="file-description">{description}</td>
                <td>
                  <button onClick={() => previewFile(_id)}>Preview</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} style={{ fontWeight: "300" }}>
                No files found. Please add some.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Render document preview if preview is open */}
      {isPreviewOpen && (
        <div className="preview-wrapper">
          <div className="preview-container">
            <button onClick={closePreview}>Close Preview</button>
            <div
              className="preview-content"
              dangerouslySetInnerHTML={{ __html: previewContent }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FilesList;
