import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Login1 } from "../../features/type";
import { addTask } from "../../features/Tasks/taskslice";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import "./style.scss";

export const Login: React.FC = React.memo(({}): JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users } = useAppSelector((st: RootState) => st.user);
  // console.log(users);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<Login1>();
  const save = (data: Login1) => {
    const us = users.find(
      (elm) => elm.email == data.email && elm.password == data.password
    );
    if (us) {
      localStorage.userid = us.id;
      navigate("/profile");
    }
    reset();
  };
  return (
    <div className="dimg1">
      <h1>Login</h1>
      <form onSubmit={handleSubmit(save)}>
        <input
          type="text"
          className="form-control "
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
          className="form-control"
          placeholder="password"
          {...register("password", {
            required: "enter you password",
            pattern: {
              value: /^["a-zA-Z0-9"]+$/,
              message: "password ...",
            },
          })}
        />
        {errors.password && <p>{errors.password?.message}</p>}
        <button className="btn">save</button>
      </form>
    </div>
  );
});
