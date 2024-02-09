import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { User } from "../../features/type";
import { addTask } from "../../features/Tasks/taskslice";
import { addUser } from "../../features/user/userSlice";
import "./style.scss";
export const Userregister: React.FC = React.memo(({}): JSX.Element => {
  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<User>();
  const save = (data: User) => {
    dispatch(addUser({ ...data, id: Date.now() }));
    reset();
  };

  return (
    <div className="dimg2">
      <h1>Register</h1>
      <form className="form" onSubmit={handleSubmit(save)}>
        <input
          type="text"
          className="form-control "
          placeholder="name"
          {...register("name", {
            required: "enter your name",
            pattern: {
              value: /^["a-zA-Z"]+$/,
              message: "name ...",
            },
          })}
        />
        {errors.name && <p>{errors.name?.message}</p>}
        <input
          type="text"
          className="form-control"
          placeholder="surname"
          {...register("surname", {
            required: "enter your surname",
            pattern: {
              value: /^["a-zA-Z"]+$/,
              message: "surname ...",
            },
          })}
        />
        {errors.surname && <p>{errors.surname?.message}</p>}
        <input
          type="text"
          className="form-control"
          placeholder="email"
          {...register("email", {
            required: "enter your email",
            pattern: {
              value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
              message: "email ...",
            },
          })}
        />
        {errors.email && <p>{errors.email?.message}</p>}

        <input
          type="text"
          className="form-control "
          placeholder="password"
          {...register("password", {
            required: "enter your password",
            pattern: {
              value: /^[a-zA-Z0-9]+$/,
              message: "password ...",
            },
          })}
        />
        {errors.password && <p>{errors.password?.message}</p>}
        <button>Click</button>
      </form>
    </div>
  );
});
