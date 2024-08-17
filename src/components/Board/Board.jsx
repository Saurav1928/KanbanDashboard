import React, { useState } from "react"
import Card from "../Card/Card"
import "./Board.css"
import { MoreHorizontal } from "react-feather"
import Editable from "../Editable/Editable"
import Dropdown from "../Dropdown/Dropdown"

function Board(props) {
  // console.log("PROPS: ", props)
  const [showDropDown, setShowDropDown] = useState(false)

  return (
    <div className="board">
      <div className="board_top">
        <p className="board_top_title">
          {props.board?.title} &nbsp; <span> {props.board?.cards?.length}</span>
        </p>
        <div className="board_top_more">
          <MoreHorizontal onClick={() => setShowDropDown(!showDropDown)} />
          {showDropDown && (
            <Dropdown onClose={() => setShowDropDown(false)}>
              <div className="board_dropdown">
                <p
                  onClick={() => {
                    // console.log("Removed")
                    props.removeBoard(props.board?.id)
                  }}
                >
                  Delete Board
                </p>
              </div>
            </Dropdown>
          )}
        </div>
      </div>
      <div className="board_cards custom-scroll">
        {props.board?.cards?.map((item) => (
          <Card
            key={item?.id}
            card={item}
            board_id={props.board?.id}
            removeCard={props.removeCard}
            handleDragEnd={props.handleDragEnd}
            handleDragEnter={props.handleDragEnter}
            updateCard={props.updateCard}
          />
        ))}
        <Editable
          text="Add Card"
          placeholder="Enter Card Title..."
          onSubmit={(value) => props.addCard(value, props.board?.id)}
        />
      </div>
    </div>
  )
}

export default Board
