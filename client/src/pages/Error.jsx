import React from "react";
import { useNavigate } from "react-router-dom";

function Error() {
  let navigate = useNavigate();

  return (
    <>
      <br />
      <div>Sorry, that page doesn't exist!</div>
      <br />
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Back to Home
      </button>
    </>
  );
}

export default Error;
