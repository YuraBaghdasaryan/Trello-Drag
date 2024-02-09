import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { AddTask } from "../../component/AddTask";
import "./style.scss";
import {
  addtoArchiveTasksById,
  changeDone,
  dragEvent,
} from "../../features/Tasks/taskslice";
import { Exam, Task } from "../../features/type";
import { DayPicker } from "react-day-picker";
import MyModal from "../../component/Modal";
import DropDown from "../dropdown";
export const Profile: React.FC = React.memo(({}): JSX.Element => {
  const dispatch = useDispatch();
  const [currentboardId, setcurrentboardId] = useState<number>(0);
  const [boardId, setboardId] = useState<number>(0);
  const [isModalOpen, closeTaskModal] = useState<boolean>(false);
  const [dragdiv, setdragdiv] = useState<Task>({} as Task);
  const { exams } = useSelector((st: RootState) => st.tasks);
  const [clone, setClone] = useState([...exams]);
  console.log(exams);
  useEffect(() => {
    setClone([...exams]);
  }, [exams]);

  const ondrop = (e: React.DragEvent<HTMLDivElement>, boardId: number) => {
    dispatch(dragEvent({ boardId, currentId: currentboardId, task: dragdiv }));
  };

  const ondragover = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  const [dropdownTaskId, setDropdownTaskId] = useState<number | null>(null);
  const toggleDropdown = (taskId: number) => {
    setDropdownTaskId((prevTaskId) => (prevTaskId === taskId ? null : taskId));
  };

  return (
    <div className="dimg">
      <h1>Profile</h1>
      <MyModal
        dragdiv={dragdiv}
        boardId={currentboardId}
        isModalOpen={isModalOpen}
        closeTaskModal={closeTaskModal}
      />
      <div>
        <div className="d1">
          {exams.map((elm, index) => (
            <div
              key={elm.id}
              className="exam1"
              onDragOver={(e) => ondragover(e)}
              onDrop={(e) => ondrop(e, elm.id)}
            >
              <h4>{elm.name}</h4>
              {elm.tasks.map((e) => (
                <div
                  draggable
                  key={e.id}
                  className="dd"
                  onDragStart={(event) => {
                    setcurrentboardId(elm.id);
                    setdragdiv(e);
                  }}
                >
                  <p
                    onClick={() => {
                      closeTaskModal(true);
                      setcurrentboardId(elm.id);
                      setdragdiv(e);
                    }}
                  >
                    {e.title}
                  </p>
                  <div>
                    <button
                      className=""
                      onClick={() => {
                        toggleDropdown(e.id);
                      }}
                    >
                      <img src="/image/pen.png" alt="pen" width="30px" />
                    </button>
                    {dropdownTaskId === e.id && <DropDown />}
                  </div>
                </div>
              ))}
              {elm.done ? (
                <AddTask currentid={elm.id} />
              ) : (
                <button
                  className="btn"
                  onClick={() => {
                    dispatch(changeDone(elm.id));
                  }}
                >
                  + Add a card
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});
