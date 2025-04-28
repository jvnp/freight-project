import React, { useEffect, useState } from "react";
import readXlsxFile, { type Row } from "read-excel-file";
import { toast } from "sonner";
// import type { CreateQuote as DataRow } from "backend/src/db/schema";

interface ProcessShipmentsProps {
  onCancel: () => void;
  file: File;
}

type DataRow = DataValue[];
type DataValue = {
  value: string | null;
  error: string | null;
};

const ProcessShipments = ({ onCancel, file }: ProcessShipmentsProps) => {
  const [selectedColumns, setSelectedColumns] = useState<(string | null)[]>(
    Array(7).fill(null)
  );

  const [fileRows, setFileRows] = useState<Row[]>([]);
  const [columnOptions, setColumnOptions] = useState<Row>([]);

  const [dataRows, setDataRows] = useState<DataRow[]>([]);

  useEffect(() => {
    const loadRows = async () => {
      let rows: Row[] = [];
      if (file.type !== "text/csv") {
        try {
          rows = await readXlsxFile(file);
        } catch (error) {
          toast.error("Error reading file");
          console.error("Error reading file:", error);
          return;
        }
      } else {
        rows = (await file.text())
          .split("\n")
          .map((row) => {
            if (row.trim() === "") return [];
            const columns = row.split(",");
            return columns.map((column) => column.trim()) as Row;
          })
          .filter((row) => row.length > 0);
      }
      setColumnOptions(rows.shift() || []);
      setFileRows(rows);
      setDataRows(
        Array(rows.length).fill(Array(7).fill({ value: null, error: null }))
      );
    };
    loadRows();

    return () => {
      setFileRows([]);
      setColumnOptions([]);
    };
  }, [file]);

  const handleColumnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const index = parseInt(e.target.name);
    const value = e.target.value;
    setSelectedColumns((prev) => {
      const newSelectedColumns = [...prev];
      newSelectedColumns[index] = value === "null" ? null : value;
      return newSelectedColumns;
    });

    // making data
    const columnIndex = columnOptions.indexOf(value);
    setDataRows((prev) => {
      fileRows.forEach((row, idx) => {
        const newRow = [...prev[idx]];
        newRow[index] = {
          value: row[columnIndex]?.toString() || null,
          error: null,
        };
        prev[idx] = newRow;
      });
      return [...prev];
    });
  };

  const handleProcessing = async () => {
    if (selectedColumns.every((x) => x == null)) {
      toast.error("Please select column to map to fields and process.");
      return;
    }

    const keys = [
      "shipmentId",
      "originCountry",
      "destinationCountry",
      "shipperName",
      "consigneeName",
      "mode",
      "date",
    ];

    const data = dataRows.map((arr) =>
      Object.fromEntries(
        keys.map((key, index) => [
          key,
          key == "date" ? new Date(arr[index].value!) : arr[index].value,
        ])
      )
    );

    try {
      const response = await fetch("http://localhost:5000/api/quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        if (response.status === 500) {
          const errorData = await response.json();
          toast.error(errorData.data);
          return;
        }
        throw new Error(
          "Error processing shipments. Please check your data and try again."
        );
      }

      const result = await response.json();

      if (result.status !== "ok") {
        const errorData: [{ message: string; path: string }] = result.data;
        let erroredDataRows = [...dataRows];
        errorData.forEach((error) => {
          const [idx, key] = error.path.split(".");
          const rowIndex = parseInt(idx);
          const colIndex = keys.indexOf(key);
          const newRow = [...erroredDataRows[rowIndex]];
          newRow[colIndex] = {
            value: erroredDataRows[rowIndex][colIndex].value,
            error: error.message,
          };
          erroredDataRows[rowIndex] = newRow;
        });

        setDataRows(erroredDataRows);

        throw new Error("Error processing shipments. Please check your data.");
      }

      toast.success("Shipments processed successfully");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-primary rounded-lg w-[90%] max-w-7xl max-h-[90vh] overflow-y-auto">
        <div className="title-bar bg-white p-4">
          <p className="text-lg font-medium">Upload Necessary documents</p>
        </div>

        <p className="p-4">Uploaded Files</p>

        <div className="mx-4 p-2 bg-white border border-gray-200 rounded-lg">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <svg
                className="w-5 h-5 text-gray-400"
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
              <button>
                <span className="text-sm text-blue-400">{file.name}</span>
              </button>
              <button className="ml-auto">
                <svg
                  className="w-5 h-5 text-black"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="bg-primary rounded-lg m-4 ">
          <div className="overflow-x-auto bg-primary rounded-lg">
            <table className="min-w-full">
              <thead className="bg-white">
                <tr>
                  <th className="border-cell p-2 text-left text-sm font-medium text-black">
                    ShipmentID
                  </th>
                  <th className="border-cell p-2 text-left text-sm font-medium text-black">
                    OriginCountry
                  </th>
                  <th className="border-cell p-2 text-left text-sm font-medium text-black">
                    DestinationCountry
                  </th>
                  <th className="border-cell p-2 text-left text-sm font-medium text-black">
                    ShipperName
                  </th>
                  <th className="border-cell p-2 text-left text-sm font-medium text-black">
                    ConsigneeName
                  </th>
                  <th className="border-cell p-2 text-left text-sm font-medium text-black">
                    Mode
                  </th>
                  <th className="border-cell p-2 text-left text-sm font-medium text-black">
                    Date-time
                  </th>
                </tr>
                <tr>
                  {Array(7)
                    .fill(null)
                    .map((_, index) => (
                      <th
                        key={index}
                        className="border-cell p-2 text-left text-sm font-medium text-black bg-primary"
                      >
                        <div className="relative">
                          <select
                            className="w-full bg-white border border-gray-300 rounded-md py-1 pl-2 pr-8 text-sm appearance-none"
                            value={selectedColumns[index] || "null"}
                            name={index.toString()}
                            onChange={handleColumnChange}
                          >
                            <option value="null">Select Column</option>
                            {columnOptions.map((option) => (
                              <option
                                key={option.toString()}
                                value={option.toString()}
                              >
                                {option.toString()}
                              </option>
                            ))}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg
                              className="fill-current h-4 w-4"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                          </div>
                        </div>
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody>
                {selectedColumns.every((x) => x == null) ? (
                  <tr className="border-t border-gray-200">
                    <td
                      colSpan={7}
                      className="border-cell p-2 text-sm text-gray-900 text-center"
                    >
                      Select columns to display data
                    </td>
                  </tr>
                ) : (
                  dataRows.map((row, index) => (
                    <tr key={index} className="border-t border-gray-200">
                      {row.map((col, colIndex) => (
                        <td
                          key={colIndex}
                          className={`p-2 text-sm text-gray-900 bg-primary ${col.error ? "text-red-500 bg-red-300/40" : "border-cell"}`}
                        >
                          {col.value || ""}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex justify-end space-x-4">
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
              onClick={handleProcessing}
            >
              Process Shipments
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessShipments;
