import React, { useState } from "react";
import { X } from "react-feather";
import "./Editable.css"; // Ensure this path is correct

function Editable(props) {
  const [showEdit, setShowEdit] = useState(false);
const [inputValue, setInputValue]= useState( props.text || "");
  return (
    <div className="editable">
      {showEdit ? (
        <form
          className={`editable_edit ${props.editClass || ""}`}
          onSubmit={(event) => {
            event.preventDefault();
            if (props.onSubmit) {
              props.onSubmit(inputValue);
              setInputValue("");
            }
            setShowEdit(false);
          }}
        >
          <input
            type="text"
            required
            autoFocus
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            placeholder={props.placeholder || "Enter Title"}
          />
          <div className="editable_edit_footer">
            <button type="submit" style={{ cursor: "pointer" }}>
              {props.buttonText || "Add"}
            </button>
            <X style={{ cursor: "pointer" }} onClick={() => setShowEdit(false)} />
          </div>
        </form>
      ) : (
        <p
          onClick={() => setShowEdit(true)}
          style={{ cursor: "pointer" }}
          className={`editable_display ${props.displayClass || ""}`}
        >
          {props.text || "Add Item"}
        </p>
      )}
    </div>
  );
}

export default Editable;
