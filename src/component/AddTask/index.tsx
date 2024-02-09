import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Task } from "../../features/type";
import { addTask, changeDoneFalse,  } from "../../features/Tasks/taskslice";
import { RootState } from "../../app/store";
import { DayPicker } from "react-day-picker";
import "./style.scss";
import { format, setDate } from "date-fns";
import "react-day-picker/dist/style.css";

export const AddTask: React.FC<{ currentid: number }> = React.memo(
  ({ currentid }: { currentid: number }): JSX.Element => {
    const [date, setDates] = useState<Date>();
    const dispatch = useDispatch();
    const {
      handleSubmit,
      register,
      reset,
      formState: { errors },
    } = useForm<Task>();
    const save = (data: Task) => {
      console.log(date);
      if (date) {
        dispatch(
          addTask({
          
          obj: { ...data, id: Date.now(), deadline: selecteDate , comment:[]},
            id: currentid,
          })
        );
        reset();
      } else {
        alert("deadline...");
      }
    };

    
    const { users } = useSelector((st: RootState) => st.user);
    const [selecteDate, setSelecteDate] = useState<Date>();
    let footer = <p> pick a day.</p>;
    if (selecteDate) {
      footer = <p>You picked {format(selecteDate, "PP")}.</p>;
    }

    const handleAction = (action: "Copy" | "Archive") => {
      if (action === "Copy") {
      } else if (action === "Archive") {
      }
    };

    return (
      <div>
        <h6>AddTask</h6>
        <form onSubmit={handleSubmit(save)}>
          <input
            className="form-control "
            type="text"
            placeholder="title"
            {...register("title", {
              required: "enter your title",
              pattern: {
                value: /^["a-zA-Z"]+$/,
                message: "title ...",
              },
            })}
          />
          {errors.title && <p>{errors.title?.message}</p>}
          <textarea
            className="form-control "
            style={{ resize: "none" }}
            placeholder="description"
            {...register("description", {
              required: "enter your description",
              pattern: {
                value: /^["a-zA-Z"]+$/,
                message: "description ...",
              },
            })}
          />
          {errors.description && <p>{errors.description?.message}</p>}
          <input
            className="form-control "
            placeholder="status"
            {...register("status", {
              required: "enter your status",
              pattern: {
                value: /^["a-zA-Z"]+$/,
                message: "status ...",
              },
            })}
          />
          {errors.status && <p>{errors.status?.message}</p>}

          {/* <input
            className="form-control"
            placeholder="deadline"
            {...register("deadline", {
              required: "enter your deadline",
              pattern: {
                value: /^["a-zA-Z"]+$/,
                message: "deadline ...",
              },
            })}
          />
          {errors.deadline && <p>{errors.deadline?.message}</p>} */}
          <select
            className="form-control"
            {...register("assignedTo", { required: "authors" })}
          >
            {users.map((elm) => {
              return (
                <option value={elm.id} key={elm.id}>
                  {elm.name} {elm.surname}
                </option>
              );
            })}
          </select>
          <div className="datediv">
            <DayPicker
              className="day"
              mode="single"
              selected={selecteDate}
              onSelect={(e) => {
                setSelecteDate(e);
                if (e) {
                  let bool = true;
                  let d1 = new Date(e);
                  let d2 = new Date();
                  if (d1.getFullYear() < d2.getFullYear()) {
                    bool = false;
                    alert("year ....");
                  } else if (d1.getMonth() < d2.getMonth()) {
                    bool = false;
                    alert("month ....");
                  } else if (d1.getDate() < d2.getDate()) {
                    if (d1.getMonth() == d2.getMonth()) {
                      bool = false;
                      alert("date ...");
                    }
                  }
                  console.log(bool);

                  if (bool) {
                    setDates(e);
                  }
                }
              }}
              footer={footer}
            />
          </div>
          <button className="btn btn-outline-info form-control">Save</button>
        </form>
        <button
          onClick={() => dispatch(changeDoneFalse())}
          className="btn btn-outline-danger form-control"
        >
         &times;
        </button>
       
      </div>
    );
  }
);
