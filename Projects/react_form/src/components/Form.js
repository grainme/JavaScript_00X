import "../App.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export function Form() {
  const schema = yup.object().shape({
    fullName: yup.string().required(),
    Email: yup.string().email().required(),
    Age: yup.number().required().integer(),
    Password: yup.string().min(4).max(10).required(),
    confirmedPassword: yup
      .string()
      .oneOf([yup.ref("Password"), null])
      .required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="Full Name" {...register("fullName")} />
      {errors.fullName?.type === "required" && alert("First name is required")}
      <input type="text" placeholder="Email" {...register("Email")} />
      <input type="number" placeholder="Age" {...register("Age")} />
      <input type="password" placeholder="Password" {...register("Password")} />
      <input
        type="password"
        placeholder="Confirm Password"
        {...register("confirmedPassword")}
      />
      <input type="submit" />
    </form>
  );
}
