import { useDispatch, useSelector } from "react-redux";
import React, { FC, useEffect, useState } from "react";
import { Exam, Task, User } from "../../features/type";
import "./style.scss";
import { updateSourceFile } from "typescript";
import {
  addCommentTaskDescritpion,
  getTasksById,
  updateTaskDescritpion,
} from "../../features/Tasks/taskslice";
import { useAppSelector } from "../../app/hooks";

interface RootState {
  tasks: {
    exams: Exam[];
    archive: Task[];
  };
  user: {
    users: User[];
    us: User;
    comments: Comment[];
  };
}

interface MyModalProps {
  isModalOpen: boolean;
  closeTaskModal: Function;
  boardId: number;
  dragdiv: Task;
}

const MyModal: FC<MyModalProps> = ({
  isModalOpen,
  closeTaskModal,
  dragdiv,
  boardId,
}) => {
  const dispatch = useDispatch();
  const { users } = useSelector((state: RootState) => state.user);
  const { task } = useAppSelector((state: any) => state.tasks);

  console.log(task);

  const [newDescription, setNewDescription] = useState<string>(
    dragdiv.description
  );

  const [text, setText] = useState<string>("");

  useEffect(() => {
    dispatch(getTasksById({ id: boardId, taskId: dragdiv.id }));
  }, [dragdiv]);

  return (
    <>
      {isModalOpen && (
        <div className="modal1">
          <div onClick={() => closeTaskModal()}>
            <div onClick={(e) => e.stopPropagation()}>
              <div>
                <button onClick={() => closeTaskModal(false)} className="btn">
                  X
                </button>
                <div>
                  <h1>{task.title}</h1>
                  <h1 className="desc">{task.description}</h1>
                </div>
                <textarea
                  className="text"
                  placeholder="Add a more detailed description..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                ></textarea>
                <div className="div3">
                  <button
                    className="btn1"
                    onClick={() => {
                      dispatch(
                        updateTaskDescritpion({
                          boardId,
                          taskId: task.id,
                          description: newDescription,
                        })
                      );
                      dispatch(
                        getTasksById({ id: boardId, taskId: dragdiv.id })
                      );
                    }}
                  >
                    Save
                  </button>
                  <button>X</button>
                </div>

                <h1 className="h1st">{task.status}</h1>
                <div className="div4"></div>
                <input
                  type="text"
                  className="inp2 "
                  placeholder="write to comment"
                  onChange={(e) => {
                    setText(e.target.value);
                  }}
                />
              </div>
              <button
                className="btn1"
                onClick={() => {
                  const userId = localStorage.userid;
                  console.log(userId);
                  const us = users.find((elm) => elm.id == userId);
                  if (us) {
                    const data = {
                      boardId,
                      taskId: dragdiv.id,
                      obj: {
                        id: Date.now(),
                        email: us.email,
                        text,
                      },
                    };
                    dispatch(addCommentTaskDescritpion(data));
                    console.log("data=>", data);
                    dispatch(getTasksById({ id: boardId, taskId: dragdiv.id }));
                  }
                }}
              >
                Save
              </button>
              <div className="com">
                {task.comment?.map((elm: any) => (
                  <div key={elm.id}>
                    <p>{elm.text}</p>
                    <p>{elm.email}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="window">
            <div>Members</div>
            <div>Labels</div>
            <div>Checklist</div>
            <div>Due Date</div>
            <div>Attachment</div>
            <div>Cover</div>
            <div>Get Pwer-Ups</div>
            <div>Move</div>
            <div>Copy</div>
            <div>Make Template</div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyModal;

