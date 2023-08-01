"use client";
import { Context } from "@/componets/Clients";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useState, useContext } from "react";
import { toast } from "react-hot-toast";

const page = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(Context);
  const registerHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (!data.success) return toast.error(data.message);
      setUser(data.user);
      toast.success(data.message);
    } catch (error) {
      return toast.error(error);
    }
  };
  if (user._id) return redirect("/");

  return (
    <div className="login">
      <title>Register</title>
      <section>
        <form action="" onSubmit={registerHandler}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Enter your Name"
            name=""
            id=""
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter your email"
            name=""
            id=""
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter your password"
            name=""
            id=""
          />
          <button type="submit">Sign Up</button>
          <p>OR</p>
          <Link href={"/login"}>Log In</Link>
        </form>
      </section>
    </div>
  );
};

export const metadata = {
  title: "Register Page",
  description: "Created By Farrukh Adeel Full Stack Developer",
};

export default page;
