"use client";
import Link from "next/link";
import React, { useState, createContext, useContext,useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
export const Context = createContext({ user: {} });
import { useRouter } from "next/navigation";
export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  return (
    <Context.Provider value={{ user, setUser }}>
      {children}
    <Toaster />
    </Context.Provider>
  );
};

export const LogoutButton = () => {
  const { user,setUser } = useContext(Context);
  useEffect(() => {
    fetch('/api/auth/me').then((res)=>res.json()).then(data=>{
      if(data.success) setUser(data.user)
    })
  }, [])

  const logoutHandler =async () => {
  
    try {
      const res = await fetch("/api/auth/logout");
      const data = await res.json();
      if (!data.success) return toast.error(data.message);
      setUser({});
      toast.success(data.message);
    } catch (error) {
      return toast.error(error);
    }
  };
  return user._id ? (
    <button onClick={logoutHandler} className="btn">
      {" "}
      Logout{" "}
    </button>
  ) : (
    <Link href={"/login"}>Login</Link>
  );
};
//todo button
export const TodoButton = ({id, completed}) => {
  const router = useRouter();
  const deleteHandler = async (id)=>{
    try {
  
      const res = await fetch(`api/task/${id}`,{
        method:"DELETE",
      });
      const data = await res.json();
      if(!data.success) return toast.error(data.message);
      toast.success(data.message);
      router.refresh();
    } catch (error) {
      return toast.error(error);
    }
  }
  const updateHandler = async (id)=>{
    try {
  
      const res = await fetch(`api/task/${id}`,{
        method:"PUT",
      });
      const data = await res.json();
      if(!data.success) return toast.error(data.message);
      toast.success(data.message);
      router.refresh();
    } catch (error) {
      return toast.error(error);
    }
  }
  return <>
  <input type="checkbox" onChange={()=> updateHandler(id)} checked={completed}/>
  <button className="btn" onClick={() => deleteHandler(id)}>Delete</button>
  </>;
};
