"use client";
import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
export default function SignOut() {
  const router = useRouter();
  const url = "/api/auth/sign-out";
  useEffect(() => {
    fetch(url);
    router.push("/");
    router.refresh();
  }, []);
  return (
    <div>
      <h2>Signing out...</h2>
    </div>
  );
}
