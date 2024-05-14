import React, { useState, useEffect } from "react";
import download from "downloadjs";
import axios from "axios";
import { API_URL } from "../utils/constants";
import mammoth from "mammoth";

var options = {
  styleMap: [
      "comment-reference => sup",
      "u => em"
  ]
};

const FilesList = () => {
  const [filesList, setFilesList] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [previewContent, setPreviewContent] = useState("");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewFileId, setPreviewFileId] = useState(null);

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

  const downloadFile = async (id, path, mimetype) => {
    try {
      const result = await axios.get(`${API_URL}/download/${id}`, {
        responseType: "blob",
      });
      const split = path.split("/");
      const filename = split[split.length - 1];
      setErrorMsg("");
      return download(result.data, filename, mimetype);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMsg("Error while downloading file. Try again later");
      }
    }
  };

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
        setPreviewFileId(id);
      };
    } catch (error) {
      // Handle error
    }
  };

  const closePreview = () => {
    setPreviewFileId(null);
    setIsPreviewOpen(false);
    setPreviewContent("");
  };

  return (
    <div className="files-container">
      {errorMsg && <p className="errorMsg">{errorMsg}</p>}
      {filesList.length > 0 ? (
        filesList.map(({ _id, title, path, mimetype }) => (
          <div key={_id} className="file-card">
            <h3 className="file-title">{title}</h3>
            <div className="file-buttons">
              <button onClick={() => downloadFile(_id, path, mimetype)}>History</button>
              <button onClick={() => downloadFile(_id, path, mimetype)}>Download</button>
              <button onClick={() => downloadFile(_id, path, mimetype)}>Finalize</button>
              {previewFileId === _id ? (
                  <button onClick={closePreview}>Return</button>
                ) : (
                  <button onClick={() => previewFile(_id)}>Preview</button>
                )}
              {/* Add other buttons here */}
            </div>
            {previewFileId === _id && (
              <div className="preview-wrapper">
                <div className="preview-container">
                  <div
                    className="preview-content"
                    dangerouslySetInnerHTML={{ __html: previewContent }}
                  />
                </div>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No files found. Please add some.</p>
      )}
    </div>
  );
};

export default FilesList;
