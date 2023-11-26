import React, { useEffect, useRef } from "react";

const FocusInput = () => {
  const inputRef = useRef(null);

  useEffect(() => {
    // Focus on the input element when the component mounts
    inputRef.current.focus();
  }, []);

  return (
    <div>
      <h2>Focus Input Example</h2>
      <input type="text" ref={inputRef} />
      <p>Start typing, and the input is already focused!</p>
    </div>
  );
};

export default FocusInput;
