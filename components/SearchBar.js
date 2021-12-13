import React, { useState } from "react";
import axios from "axios";

import PincodeForm from "./PincodeForm";
import DateForm from "./DateForm";
import PrintData from "./PrintData";

const SearchBar = (props) => {
  const { states } = props;

  const [searchType, setSearchType] = useState("0");
  const [pincode, setPincode] = useState(0);
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessions, setSessions] = useState(null);

  const handleChange = (e) => {
    e.preventDefault();
    setSearchType(e.target.value);
  };

  const handleClick = async () => {
    if (date !== 0 && pincode !== 0) {
      let date_format = date.split("-").reverse().join("-");
      try {
        setLoading(true);
        let result = await axios.get(
          `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pincode}&date=${date_format}`
        );
        setSessions(result.data);
        console.log(result.data);
        setLoading(false)
      } catch (err) {
        console.log(err);
        setLoading(false)
      } finally {
      }
    }
  };

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-lg shadow-md py-3 px-5 md:flex w-auto">
        <div className="sm:w-full items-center space-x-2 md:text-center">
          <label className="font-semibold"> Search type </label>
          <select className="rounded" onChange={handleChange}>
            <option value="0"> Pincode </option>
            <option value="1"> District </option>
          </select>
        </div>
        <div className="md:flex  sm:w-full py-auto">
          {searchType !== "0" ? (
            <>{/* <DistrictForm /> */}</>
          ) : (
            <>
              <PincodeForm setPincode={setPincode} />
            </>
          )}
        </div>
        <div className="flex justify-center w-full">
          <DateForm setDate={setDate} />
        </div>
        <div className="flex justify-center md:py-2">
          <button
            onClick={handleClick}
            className="bg-green-700 py-2 px-4 uppercase tracking-wide shadow-md rounded-lg border-gray-200 font-semibold text-white"
          >
            {" "}
            Search{" "}
          </button>
        </div>
      </div>

      {loading ? (
        <div
          className="flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3"
          role="alert"
        >
          <svg
            className="fill-current w-4 h-4 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" />
          </svg>
          <p>Loading..., please wait</p>
        </div>
      ) : null}

      {sessions ? <PrintData sessions={sessions.sessions} /> : null}
    </>
  );
};

export default SearchBar;
