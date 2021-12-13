import React, { useState } from "react";
import axios from 'axios'

import PincodeForm from "./PincodeForm";
import DateForm from "./DateForm";

const SearchBar = (props) => {
  const { states } = props;

  const [searchType, setSearchType] = useState('0');
  const [pincode, setPincode] = useState(0)
  const [date, setDate] = useState("")
  const [loading, setLoading] = useState(false)
  const [sessions, setSessions] = useState(null)

  const handleChange = (e) => {
    e.preventDefault();
    setSearchType(e.target.value);
  };

  const handleClick = async () => {

    if (date !== 0 && pincode !== 0){
        let date_format = date.split('-').reverse().join('-')
        try{
          setLoading(true)
          let result = await axios.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pincode}&date=${date_format}`)
          setSessions(result.data?.sessions)
        }catch(err){
          console.log(err)
        }finally{}

    }
  }

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
            <button onClick={handleClick} className="bg-green-700 py-2 px-4 uppercase tracking-wide shadow-md rounded-lg border-gray-200 font-semibold text-white">
          {" "}
          Search{" "}
        </button>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
