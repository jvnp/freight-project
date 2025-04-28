import { useState } from "react";
import ImportModal from "./ImportModal";

type Quote = {
  ShipmentID: string;
  OriginCountry: string;
  DestinationCountry: string;
  ShipperName: string;
  ConsigneeName: string;
  Mode: string;
  DateTime: string;
};

const sampleQuotes: Quote[] = [
  {
    ShipmentID: "SH001",
    OriginCountry: "United States",
    DestinationCountry: "China",
    ShipperName: "Global Logistics Inc.",
    ConsigneeName: "Shanghai Trading Co.",
    Mode: "Sea",
    DateTime: "2024-03-15 14:30",
  },
  {
    ShipmentID: "SH002",
    OriginCountry: "Germany",
    DestinationCountry: "France",
    ShipperName: "Deutsche Shipping",
    ConsigneeName: "Paris Imports",
    Mode: "Road",
    DateTime: "2024-03-16 09:45",
  },
  {
    ShipmentID: "SH003",
    OriginCountry: "Japan",
    DestinationCountry: "South Korea",
    ShipperName: "Tokyo Freight Ltd.",
    ConsigneeName: "Seoul Distributors",
    Mode: "Air",
    DateTime: "2024-03-16 11:20",
  },
];

const QuotesTable = () => {
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  return (
    <div className="py-2">
      <div className="quotes flex justify-between items-center mb-6">
        <p className="text-4xl leading-10 font-light">Quotes</p>
        <button
          onClick={() => setIsImportModalOpen(true)}
          className="flex items-center px-4 py-2 bg-white border rounded-lg shadow-sm hover:bg-gray-50"
        >
          <svg
            width="40"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_5_758)">
              <rect width="20" height="20" fill="white" fill-opacity="0.01" />
              <g clip-path="url(#clip1_5_758)">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M4.375 7.5C4.20924 7.5 4.05027 7.56585 3.93306 7.68306C3.81585 7.80027 3.75 7.95924 3.75 8.125V18.125C3.75 18.2908 3.81585 18.4497 3.93306 18.5669C4.05027 18.6842 4.20924 18.75 4.375 18.75H15.625C15.7908 18.75 15.9497 18.6842 16.0669 18.5669C16.1842 18.4497 16.25 18.2908 16.25 18.125V8.125C16.25 7.95924 16.1842 7.80027 16.0669 7.68306C15.9497 7.56585 15.7908 7.5 15.625 7.5H13.125C12.9592 7.5 12.8003 7.43415 12.6831 7.31694C12.5658 7.19973 12.5 7.04076 12.5 6.875C12.5 6.70924 12.5658 6.55027 12.6831 6.43306C12.8003 6.31585 12.9592 6.25 13.125 6.25H15.625C16.1223 6.25 16.5992 6.44755 16.9508 6.79918C17.3025 7.15081 17.5 7.62772 17.5 8.125V18.125C17.5 18.6223 17.3025 19.0992 16.9508 19.4508C16.5992 19.8025 16.1223 20 15.625 20H4.375C3.87772 20 3.40081 19.8025 3.04917 19.4508C2.69754 19.0992 2.5 18.6223 2.5 18.125V8.125C2.5 7.62772 2.69754 7.15081 3.04917 6.79918C3.40081 6.44755 3.87772 6.25 4.375 6.25H6.875C7.04076 6.25 7.19973 6.31585 7.31694 6.43306C7.43415 6.55027 7.5 6.70924 7.5 6.875C7.5 7.04076 7.43415 7.19973 7.31694 7.31694C7.19973 7.43415 7.04076 7.5 6.875 7.5H4.375Z"
                  fill="#1E1E1E"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M9.5575 0.182503C9.61556 0.124299 9.68453 0.0781207 9.76046 0.0466127C9.83639 0.0151046 9.91779 -0.00111389 10 -0.00111389C10.0822 -0.00111389 10.1636 0.0151046 10.2395 0.0466127C10.3155 0.0781207 10.3844 0.124299 10.4425 0.182503L14.1925 3.9325C14.3099 4.04986 14.3758 4.20903 14.3758 4.375C14.3758 4.54097 14.3099 4.70015 14.1925 4.8175C14.0751 4.93486 13.916 5.00079 13.75 5.00079C13.584 5.00079 13.4249 4.93486 13.3075 4.8175L10.625 2.13375V13.125C10.625 13.2908 10.5592 13.4497 10.4419 13.5669C10.3247 13.6842 10.1658 13.75 10 13.75C9.83424 13.75 9.67527 13.6842 9.55806 13.5669C9.44085 13.4497 9.375 13.2908 9.375 13.125V2.13375L6.6925 4.8175C6.63439 4.87561 6.5654 4.92171 6.48948 4.95316C6.41356 4.98461 6.33218 5.00079 6.25 5.00079C6.08403 5.00079 5.92486 4.93486 5.8075 4.8175C5.74939 4.75939 5.70329 4.69041 5.67185 4.61448C5.6404 4.53856 5.62421 4.45718 5.62421 4.375C5.62421 4.20903 5.69014 4.04986 5.8075 3.9325L9.5575 0.182503Z"
                  fill="#1E1E1E"
                />
              </g>
            </g>
            <defs>
              <clipPath id="clip0_5_758">
                <rect width="20" height="20" fill="white" />
              </clipPath>
              <clipPath id="clip1_5_758">
                <rect width="20" height="20" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <span>Import file</span>
          <svg
            className="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead>
            <tr className="">
              <th className="border-cell p-2 text-left text-sm font-bold text-black">
                ShipmentID
              </th>
              <th className="border-cell p-2 text-left text-sm font-bold text-black">
                OriginCountry
              </th>
              <th className="border-cell p-2 text-left text-sm font-bold text-black">
                DestinationCountry
              </th>
              <th className="border-cell p-2 text-left text-sm font-bold text-black">
                ShipperName
              </th>
              <th className="border-cell p-2 text-left text-sm font-bold text-black">
                ConsigneeName
              </th>
              <th className="border-cell p-2 text-left text-sm font-bold text-black">
                Mode
              </th>
              <th className="border-cell p-2 text-left text-sm font-bold text-black">
                Date-time
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sampleQuotes.map((quote) => (
              <tr key={quote.ShipmentID} className="bg-primary">
                <td className="border-cell p-2 text-sm text-gray-900">
                  {quote.ShipmentID}
                </td>
                <td className="border-cell p-2 text-sm text-gray-900">
                  {quote.OriginCountry}
                </td>
                <td className="border-cell p-2 text-sm text-gray-900">
                  {quote.DestinationCountry}
                </td>
                <td className="border-cell p-2 text-sm text-gray-900">
                  {quote.ShipperName}
                </td>
                <td className="border-cell p-2 text-sm text-gray-900">
                  {quote.ConsigneeName}
                </td>
                <td className="border-cell p-2 text-sm text-gray-900">
                  {quote.Mode}
                </td>
                <td className="border-cell p-2 text-sm text-gray-900">
                  {quote.DateTime}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ImportModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
      />
    </div>
  );
};

export default QuotesTable;
