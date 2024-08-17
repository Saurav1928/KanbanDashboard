import React, { useState } from "react"
import { CheckSquare, Clock, Edit, MoreHorizontal } from "react-feather"
import Chip from "../Chips/Chip"
import "./card.css"
import Dropdown from "../Dropdown/Dropdown"
import CardInfo from "./CardInfo/CardInfo"
function Card(props) {
  
  const [showDropDown, setShowDropDown] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };
  return (
    <>
      {showModal && (
        <CardInfo
          card={props.card}
          onClose={() => setShowModal(false)}
          updateCard={props.updateCard}
          board_id={props.board_id}
        />
      )}
      <div
        className="card"
        draggable
        onDragEnter={() => {
          props.handleDragEnter(props.board_id, props.card?.id)
        }}
        onDragEnd={() => {
          props.handleDragEnd(props?.board_id, props?.card?.id)
        }}
      >
        <div className="card_top">

          <div className="card_title">{props.card?.title?.charAt(0).toUpperCase() + props.card?.title?.slice(1)}</div>
          <div className="card_top_lables">
            {/* <Chip close text="frontend" color="green" /> */}
            {props.card?.labels?.map((item, index) => (
              <Chip id={index} text={item.text} color={item.color} />
            ))}
            {/* <Chip text="backend" color="green" /> */}
          </div>
          <div className="card_top_more">
            <Edit
              style={{ height: "20px", paddingRight: "5px" }}
              onClick={() => setShowModal(true)}
            />
            <MoreHorizontal onClick={() => setShowDropDown(!showDropDown)} />
            {showDropDown && (
              <Dropdown onClose={() => setShowDropDown(false)}>
                <div className="card_dropdown">
                  <p
                    onClick={() => {
                      // console.log("Card Removed!!")
                      props.removeCard(props.board_id, props.card.id)
                    }}
                  >
                    Delete Card
                  </p>
                </div>
              </Dropdown>
            )}
          </div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", maxWidth:"350px"}}>
      {truncateText(props.card?.desc || "")}
    </div>
        <div className="card_footer">
          {props.card?.date && (
            <p>
              <Clock />
              {props.card?.date}
            </p>
          )}
          {props.card?.tasks?.length > 0 && (
            <p>
              <CheckSquare />
              {props.card?.tasks?.filter((item) => item.completed).length}/
              {props.card?.tasks?.length}
            </p>
          )}
        </div>
      </div>
    </>
  )
}

export default Card
