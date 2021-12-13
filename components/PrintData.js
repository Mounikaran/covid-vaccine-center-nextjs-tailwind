import React, { useEffect } from "react";

function PrintData({ sessions }) {
  useEffect(() => {
    console.log(sessions);
  }, [sessions]);
  return (
    <div className="flex mb-4">
      {sessions.map((session, index) => (
        <div className="w-full sm:w-1/2 md:w-1/3 py-2" key={index}>
          <div className="bg-white shadow rounded-md p-3">
            <p className="text-xl">
              {session.block_name}, {session.district_name}
            </p>
            <p>Available vaccine : <span className="rounded-2xl px-1 bg-green-100 font-semibold">{session.vaccine}</span> </p>
            <div className="">
                <h2 className="font-bold font-sans text-xl"> Slots </h2> 
              {session.slots.map((slot, index) => (
                <p key={index} className="text-center my-1">
                  <span className="rounded-xl bg-yellow-200 px-1">{slot}</span>
                </p>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PrintData;
