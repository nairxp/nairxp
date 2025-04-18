"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
export default function UserList() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("/api/admin/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <ul>
      {users &&
        users.map((user) => (
          <li key={user._id}>
            <Link href={`/admin/users/${user._id}`}>{user.name}</Link>
            {user.email}
          </li>
        ))}
    </ul>
  );
}
