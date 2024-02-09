import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Exam, Task } from "../type";
import { bool, number } from "yup";
import { act } from "react-dom/test-utils";
import { AppDispatch, RootState } from "../../app/store";

const initialState: { exams: Exam[]; archive: Task[]; task: Task } = {
  exams: [
    {
      id: 1,
      name: "ToDo",
      done: false,
      tasks: [
        {
          id: 1,
          title: "Task1",
          description: "Description",
          status: "Status",
          assignedTo: 1,
          deadline: new Date(2023, 11, 5),
          comment: [],
        },
        {
          id: 2,
          title: "Task1",
          description: "Description",
          status: "Status",
          assignedTo: 1,
          deadline: new Date(2023, 11, 5),
          comment: [],
        },
        {
          id: 3,
          title: "Task1",
          description: "Description",
          status: "Status",
          assignedTo: 1,
          deadline: new Date(2023, 11, 5),
          comment: [],
        },
      ],
    },
    {
      id: 2,
      name: "Doing",
      done: false,
      tasks: [
        {
          id: 4,
          title: "Task2",
          description: "Description",
          status: "Status",
          assignedTo: 1,
          deadline: new Date(2023, 11, 5),
          comment: [],
        },
      ],
    },
    {
      id: 3,
      name: "Done",
      done: false,
      tasks: [
        {
          id: 5,
          title: "Task3",
          description: "Description",
          status: "Status",
          assignedTo: 1,
          deadline: new Date(2023, 11, 5),
          comment: [],
        },
      ],
    },
  ],
  archive: [],
  task: {} as Task,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      //{id, obj}
      const x = state.exams.find((elm) => elm.id == action.payload.id);
      if (x) {
        x.tasks.push(action.payload.obj);
      }
    },
    delTasksById: (state, action) => {
      const x = state.exams.find((elm) => elm.id == action.payload.id);
      if (x) {
        x.tasks = x.tasks.filter((el) => el.id != action.payload.taskId);
      }
    },
    getTasksById: (state, action) => {
      const x = state.exams.find((elm) => elm.id == action.payload.id);
      if (x) {
        const y = x.tasks.find((el) => el.id == action.payload.taskId);
        if (y) {
          state.task = y;
        }
      }
    },
    changeDone: (state, action) => {
      state.exams = state.exams.map((e) => ({ ...e, done: false }));
      const x = state.exams.find((elm) => elm.id == action.payload);
      if (x) {
        x.done = true;
      }
    },
    changeDoneFalse: (state) => {
      state.exams = state.exams.map((e) => ({ ...e, done: false }));
    },
    dragEvent: (state, action) => {
      // console.log(action.payload);

      const board = state.exams.find((elm) => elm.id == action.payload.boardId);
      const current = state.exams.find(
        (elm) => elm.id == action.payload.currentId
      );
      if (board && current) {
        current.tasks = current.tasks.filter(
          (elm) => elm.id != action.payload.task.id
        );
        board.tasks.push({ ...action.payload.task, id: Date.now() });
      }
    },
    updateTaskDescritpion: (
      state,
      action: PayloadAction<{
        boardId: number;
        taskId: number;
        description: string;
      }>
    ) => {
      const { taskId, description, boardId } = action.payload;
      const boardToUbdate = state.exams.find((elm) => elm.id == boardId);
      if (boardToUbdate) {
        const taskup = boardToUbdate.tasks.find((elm) => elm.id == taskId);
        if (taskup) {
          taskup.description = description;
          console.log("===>", action.payload, description);
        }
      }
    },
    addCommentTaskDescritpion: (
      state,
      action: PayloadAction<{
        boardId: number;
        taskId: number;
        obj: { id: number; email: string; text: string };
      }>
    ) => {
      const { taskId, obj, boardId } = action.payload;
      const boardToUbdate = state.exams.find((elm) => elm.id == boardId);
      if (boardToUbdate) {
        const taskup = boardToUbdate.tasks.find((elm) => elm.id == taskId);
        console.log(boardToUbdate, taskId, boardId, taskup);
        if (taskup) {
          taskup.comment.push(obj);
        }
      }
    },
    addtoArchiveTasksById: (state, action) => {
      const x = state.exams.find((elm) => elm.id == action.payload.id);
      if (x) {
        const data = x.tasks.find((elm) => elm.id == action.payload.taskId);
        if (data) {
          state.archive.push(data);
        }
        x.tasks = x.tasks.filter((el) => el.id != action.payload.taskId);
      }
    },
 

  }
});

export const {
  addTask,
  delTasksById,
  changeDone,
  addtoArchiveTasksById,
  changeDoneFalse,
  dragEvent,
  updateTaskDescritpion,
  addCommentTaskDescritpion,
  getTasksById,
  // openWindow,
} = taskSlice.actions;
export default taskSlice.reducer;
