"use client"
import { useEffect, useState } from "react";
export default function useUsers() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return users;
}
