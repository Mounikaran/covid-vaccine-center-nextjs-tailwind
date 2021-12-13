import { useRef } from "react";
const DateForm = ({ setDate }) => {
    const date = useRef();
    const handleBlur = () =>{
        setDate(date.current.value);
    }
  return (
    <>
      <div className="px-2 flex w-full justify-center">
        <input
          type="date"
          className="rounded"
          onBlur={handleBlur}
          ref={date}
          placeholder=""
        />
      </div>
    </>
  );
};

export default DateForm