import { type } from "os";
import { string } from "yup";

export type Task = {
  id: number;
  title: string;
  description: string;
  status: string
  assignedTo: number;
  deadline: any;

  

  comment:{
    id:number,
    email:string,
    text:string
  }[]

  
};

export type User = {
  id: number;
  name: string;
  surname: string;
  email: string;
  password: string 
};

export type Login1 = {
  id: number;
  email: string;
  password: string;
};

export type Exam={
  id:number;
  name:string;
  tasks:Task[],
  done:boolean,

}

