import { useRef } from "react";

const PincodeForm = ({setPincode}) => {

    const pincode = useRef();
    const handleBlur = () =>{
        setPincode(pincode.current.value);
    }
  return (
    <>
      <div className="px-2 w-full flex justify-center">
        <input type="text" className="rounded" onBlur={handleBlur} ref={pincode} placeholder="Enter Pincode" />
      </div>
    </>
  );
};

export default PincodeForm;
