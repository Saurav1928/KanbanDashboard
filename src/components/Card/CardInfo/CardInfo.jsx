import React, { useEffect, useState } from "react"
import "./CardInfo.css"
import Modal from "../../Modal/Modal"
import {
  Calendar,
  CheckSquare,
  Database,
  List,
  Tag,
  Trash,
  Type,
} from "react-feather"
import Editable from "../../Editable/Editable"
import Chip from "../../Chips/Chip"
function CardInfo(props) {
  const colors = [
    "#a8193d",
    "#4fcc25",
    "#1ebffa",
    "#8da377",
    "#9975bd",
    "#cf61a1",
    "#240959",
  ]
  const [activeColor, setActiveColor] = useState("")
  //   const { title, labels, desc, tasks, date } = props.card;
  const [values, setValues] = useState({ ...props.card })
  const calculatePercentage = () => {
    if (values.tasks?.length === 0) return 0
    const completed = values.tasks?.filter((item) => item.completed)?.length
    return (completed / values.tasks?.length) * 100 + ""
  }
  useEffect(() => {
    props.updateCard(props.board_id, props.card.id, values)
    // console.log("Updated values:")
    // console.log(values)
  }, [values])
  const addLabel = (value, color) => {
    const index = values.labels?.find((item) => item.text === value)
    if (index > -1) return -1
    const label = {
      text: value,
      color: color || "green",
    }
    setValues({ ...values, labels: [...values.labels, label] })
    setActiveColor("")
  }
  const removeLabel = (text) => {
    const tempLabels = values.labels?.filter((item) => item.text !== text)
    setValues({ ...values, labels: tempLabels })
  }
  const addTask = (value) => {
    const task = {
      id: Date.now() + Math.random(),
      text: value,
      completed: false,
    }
    setValues({ ...values, tasks: [...values.tasks, task] })
    console.log("Task added", task)
  }
  const removeTask = (taskId) => {
    // Create a new array with the task removed
    const updatedTasks = values.tasks?.filter((item) => item.id !== taskId)

    // Update state with the new array
    setValues((prevValues) => ({ ...prevValues, tasks: updatedTasks }))

    console.log("task with taskId:", taskId, " deleted")
  }
  const updateTask = (id, completed) => {
    const index = values.tasks?.findIndex((item) => item.id === id)
    if (index < 0) return
    const tempTasks = [...values.tasks]
    tempTasks[index].completed = completed
    setValues({ ...values, tasks: tempTasks })
    console.log("task id: ", id)
    console.log("Completed: ", completed)
  }
  return (
    <div>
      <Modal onClose={() => props.onClose()}>
        <div className="cardInfo">
          <div className="cardInfo_box">
            <div className="cardInfo_box_title">
              <Type />
              Title 1
            </div>
            <div className="cardInfo_box_body">
              <Editable
                text={values.title}
                default={values.title}
                placeholder="Enter Title"
                buttonText="Set Title"
                onSubmit={(value) =>
                  setValues((prevValues) => ({ ...prevValues, title: value }))
                }
              />
            </div>
          </div>
          <div className="cardInfo_box">
            <div className="cardInfo_box_title">
              <List />
              Description
            </div>
            <div className="cardInfo_box_body">
              <Editable
                text={values.desc}
                default={values.desc}
                placeholder="Your Description"
                buttonText="Set Description"
                onSubmit={(value) =>
                  setValues((prevValues) => ({ ...prevValues, desc: value }))
                }
              />
            </div>
          </div>
          <div className="cardInfo_box">
            <div className="cardInfo_box_title">
              <Calendar />
              Date
            </div>
            <div className="cardInfo_box_body">
              <input
                type="date"
                defaultValue={
                  values.date
                    ? new Date(values.date).toISOString().substring(0, 10)
                    : ""
                }
                onChange={(event) =>
                  setValues((prevValues) => ({
                    ...prevValues,
                    date: event.target.value,
                  }))
                }
              />
            </div>
          </div>
          <div className="cardInfo_box">
            <div className="cardInfo_box_title">
              <Tag />
              Labels
            </div>
            <div className="cardInfo_box_labels">
              {values.labels?.map((label, index) => (
                <Chip
                  close
                  onClose={() => {
                    removeLabel(label.text)
                  }}
                  key={label.text + index}
                  color={label.color}
                  text={label.text}
                />
              ))}
            </div>
            <div className="cardInfo_box_colors">
              {colors.map((item, index) => (
                <li
                  key={index}
                  style={{ backgroundColor: item }}
                  className={item === activeColor ? "active" : ""}
                  onClick={() => setActiveColor(item)}
                ></li>
              ))}
            </div>
            <div className="cardInfo_box_body">
              <Editable
                text="Add Label"
                placeholder="Enter Label"
                buttonText="Add Label"
                onSubmit={(value) => addLabel(value, activeColor)}
              />
            </div>
          </div>
          <div className="cardInfo_box">
            <div className="cardInfo_box_title">
              <CheckSquare />
              Tasks
            </div>
            <div className="cardInfo_box_progress_bar">
              <div
                className="cardInfo_box_progress "
                style={{ width: calculatePercentage() + "%" }}
              />
            </div>
            <div className="cardInfo_box_list">
              {values.tasks?.map((task) => (
                <div className="cardInfo_task" key={task.id}>
                  <div className="cardInfo_task_div">
                    <input
                      type="checkbox"
                      defaultValue={task.completed}
                      onChange={(event) =>
                        updateTask(task.id, event.target.checked)
                      }
                    />
                    <p>{task.text}</p>
                  </div>
                  <Trash
                    onClick={() => removeTask(task.id)}
                    style={{
                      cursor: "pointer",
                      color: "#333", // Default color
                      transition: "color 0.3s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "#e74c3c")
                    } // Fill color on hover
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#333")} // Revert color on mouse leave
                  />
                </div>
              ))}
            </div>
            <div className="cardInfo_box_body">
              <Editable
                text="Add New Task"
                placeholder="Enter Task"
                buttonText="Add Task"
                onSubmit={(value) => addTask(value)}
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default CardInfo
