import {} from "react";
import QuotesTable from "./components/QuotesTable";
import "./App.css";
import { Toaster } from "sonner";

function App() {
  return (
    <div className="min-h-screen bg-primary">
      <div className="header">
        <div className="container mx-auto pt-8">
          <div className="flex justify-between items-center mb-6">
            <p className="user-title text-3xl leading-9 font-light ">
              Hello, John!
            </p>
            <button className="flex items-center px-4 py-2 bg-white border rounded-lg shadow-sm hover:bg-gray-50">
              <span>John </span>
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
        </div>
      </div>
      <div className="container mx-auto py-2">
        <QuotesTable />
      </div>
      <Toaster />
    </div>
  );
}

export default App;
