"use client"
import React from "react";
import Link from "next/link";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import { AppContext } from "@/context/appContext";
import { useContext,useState } from "react";
export default function SignIn() {
  const { user, setUser } = useContext(AppContext);
  const [msg, setMsg] = useState();
  const router = useRouter();
  const url = "/api/auth/sign-in/";
  const handleSubmit = async () => {
    const res = await axios.post(url, user);
    if (res.data.message === "ok") {
      document.cookie = `token=${res.data.token}; path=/; max-age=3600`;
      document.cookie = `name=${res.data.name}; path=/; max-age=3600`;
      document.cookie = `email=${res.data.email}; path=/; max-age=3600`;
      document.cookie = `role=${res.data.role}; path=/; max-age=3600`;
      setMsg("success");
      router.push("/");
      router.refresh();
    } else {
      setMsg(res.data.message);
    }
  };
  return (
    <div className="App-Login-Row">
      <div className="App-Login-Row-Box-Left">
        <h1>Welcome back!</h1>
        <h3>Access your courses and continue building awesome things.
        </h3>
      </div>
      <div className="App-Login-Row-Box-Right">
      {msg}
      <p>
        <input className="App-Login-Form-Control" placeholder="Email address or username"
          type="text"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        ></input>
      </p>
      <p>
        <input className="App-Login-Form-Control" placeholder="Password"
          type="password"
          onChange={(e) => setUser({ ...user, pass: e.target.value })}
        ></input>
      </p>
      <p>
        <button className="App-Login-Form-Control App-Login-Form-Button" onClick={handleSubmit}>Login</button>
      </p>

      {/* <p>
        <Link href="/auth/signup">Create Account</Link>
      </p> */}

      </div>
      
    </div>
  );
}
