import React, { useState } from "react"
import "./App.css"
import Board from "./components/Board/Board"
import Editable from "./components/Editable/Editable"
function App() {
  const [boards, setBoards] = useState([])
  const [target, setTarget] = useState({ bid: "", cid: "" })
  const addCard = (title, board_id) => {
    const card = {
      id: Date.now() + Math.random(),
      title,
      labels: [],
      tasks: [],
      date: "",
      desc: "",
    }
    const board_index = boards.findIndex((item) => item.id === board_id)
    if (board_index < 0) return
    const tempBoards = [...boards]
    tempBoards[board_index].cards.push(card)
    setBoards(tempBoards)
  }
  const removeCard = (board_id, card_id) => {
    const board_index = boards.findIndex((item) => item.id === board_id)
    if (board_index < 0) return
    const tempBoards = [...boards]
    tempBoards[board_index].cards = tempBoards[board_index].cards.filter(
      (item) => item.id !== card_id
    )
    setBoards(tempBoards)
  }
  const addBoard = (title) => {
    const board = {
      id: Date.now() + Math.random(),
      title,
      cards: [],
    }
    setBoards([...boards, board])
  }
  const removeBoard = (board_id) => {
    const tempBoards = boards.filter((item) => item.id !== board_id)
    setBoards(tempBoards)
  }
  const handleDragEnter = (board_id, card_id) => {
    setTarget({ bid: board_id, cid: card_id })
  }
  const handleDragEnd = (board_id, card_id) => {
    let src_bIndex, src_cIndex, target_bIndex, target_cIndex
    src_bIndex = boards?.findIndex((item) => item.id === board_id)
    if (src_bIndex < 0) return
    src_cIndex = boards[src_bIndex]?.cards?.findIndex(
      (item) => item.id === card_id
    )
    if (src_cIndex < 0) return
    target_bIndex = boards?.findIndex((item) => item.id === target.bid)
    if (target_bIndex < 0) return
    target_cIndex = boards[target_bIndex]?.cards?.findIndex(
      (item) => item.id === target.cid
    )
    if (target_cIndex < 0) return
    let tempBoards = [...boards]
    let tempCard = tempBoards[src_bIndex]?.cards[src_cIndex]
    tempBoards[src_bIndex]?.cards.splice(src_cIndex, 1)
    tempBoards[target_bIndex]?.cards.splice(target_cIndex, 0, tempCard)
    setBoards(tempBoards)
  }
  const updateCard = (board_id, card_id, card) => {
    // console.log("hii from update card");
    const board_index = boards.findIndex((item) => item.id === board_id)
    if (board_index < 0) return
    const card_index = boards[board_index]?.cards.findIndex(
      (item) => item.id === card_id
    )
    // console.log("Heelofndn")
    if (card_index < 0) return
    const tempBoards = [...boards]
    tempBoards[board_index].cards[card_index] = card
// console.log("hello from updte card:");
// console.log(tempBoards[board_index].cards[card_index]);
    setBoards(tempBoards)
  }
  return (
    <div className="app">
      <div className="app_nav">
        <h1 style={{fontSize:"2.5rem"}}>Kanban Board</h1>
      </div>

      <div className="app_outer">
        <div className="app_boards">
          {boards.map((item) => (
            <Board
              key={item.id}
              board={item}
              removeBoard={removeBoard}
              addCard={addCard}
              removeCard={removeCard}
              handleDragEnd={handleDragEnd}
              handleDragEnter={handleDragEnter}
              updateCard={updateCard}
            />
          ))}

          <div className="app_boards_board">
            <Editable
              displayClass="app_boards_board_add"
              text="Add Board"
              placeholder="Enter Board Title..."
              onSubmit={(value) => addBoard(value)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
