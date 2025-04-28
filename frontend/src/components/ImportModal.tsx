import { useState } from "react";
import ProcessShipments from "./ProcessShipments";
import MyDropzone from "./Dropzone";
import { toast } from "sonner";

type ImportModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ImportModal = ({ isOpen, onClose }: ImportModalProps) => {
  const [showProcessView, setShowProcessView] = useState(false);

  const [file, setFile] = useState<File | null>(null);

  if (!isOpen) return null;

  if (file && showProcessView) {
    return (
      <ProcessShipments
        file={file}
        onCancel={() => setShowProcessView(false)}
      />
    );
  }

  const handleFileUpload = async (file: File) => {
    setFile(file);
    toast.success("File selected successfully");
  };

  const handleCancel = () => {
    setFile(null);
    setShowProcessView(false);
    onClose();
  };
  const handleProcessShipments = () => {
    if (!file) {
      toast.error("Please upload a file first");
      return;
    }
    setShowProcessView(true);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 cs-max-width">
        <h2 className="text-xl mb-4">Upload Necessary documents</h2>

        <MyDropzone onFile={handleFileUpload}>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4">
            <div className="flex flex-col items-center">
              <svg
                className="w-12 h-12 text-gray-400 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <p className="text-gray-600 mb-2">
                Click or drag file to this area to upload
              </p>
              <p className="text-gray-400 text-sm">
                Please upload all necessary permits and certificates for this
                customer. Ensure files are in PDF format for optimal
                compatibility.
              </p>
              <button className="mt-4 px-4 py-2 bg-black text-white rounded">
                Browse File
              </button>
            </div>
          </div>
        </MyDropzone>

        <div className="mb-6">
          <h3 className="text-sm font-medium mb-2">Uploaded Files</h3>
          <div className="bg-gray-100 p-3 rounded">
            <div className="flex items-center text-gray-500">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              {file ? (
                <span className="font-bold text-blue-600">{file.name}</span>
              ) : (
                <span>No File Uploaded yet</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={handleCancel}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleProcessShipments}
            disabled={!file}
            className={`px-4 py-2 bg-black text-white rounded-lg  ${!file ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-800"}`}
          >
            Process Shipments
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImportModal;
