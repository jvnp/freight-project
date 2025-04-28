import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

export default function MyDropzone({
  children,
  onFile,
}: {
  children: React.ReactNode;
  onFile: (acceptedFile: File) => void;
}) {
  const onDropAccepted = useCallback((acceptedFiles: File[]) => {
    onFile(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: {
      "application/vnd.ms-excel": [".xlsx"],
      "text/csv": [".csv"],
    },
    onDropRejected: () => {
      toast.error(
        "File type not accepted or too many files selected. Please try again."
      );
    },
    onDropAccepted,
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {children}
    </div>
  );
}
