import React, { useEffect, useRef } from "react"

function Dropdown(props) {
  const dropdownRef = useRef(null)

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef?.current?.contains(event?.target)) {
      props.onClose();
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, []) // Empty dependency array ensures this effect runs only once

  return (
    <div
      ref={dropdownRef}
      className="dropdown"
      style={{
        position: "absolute",
        top: "50%",
        right: "10px",
        zIndex:10,
      }}
    >
      {props.children}
    </div>
  )
}

export default Dropdown
