"use client";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import useFetch from "@/hooks/useFetch";
export default function Courses() {
  const [course, setCourse] = useState({});
  const { data, loading, error } = useFetch("/api/admin/courses/");
  const [msg, setMsg] = useState();
  const handleSubmit = async () => {
    try {
      const res = await axios.post("/api/admin/courses", course);
      window.location.reload();
    } catch (err) {
      setMsg("Something went wrong");
    }
  };
  const handleDelete = (id) => {
    axios.delete("/api/admin/courses/" + id);
    window.location.reload();
  };
  return (
    <div>
      {msg}
      <div>
        <input
          placeholder="Course Title"
          onChange={(e) => setCourse({ ...course, name: e.target.value })}
        ></input>
        <input
          placeholder="Course Description"
          onChange={(e) => setCourse({ ...course, desc: e.target.value })}
        ></input>
        <input
          placeholder="Image Url"
          onChange={(e) => setCourse({ ...course, imgUrl: e.target.value })}
        ></input>
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <ul>
        {data &&
          data.map((value) => (
            <li key={value._id}>
              <Link
                href={`/admin/courses/${value._id}?name=${value.name}&desc=${value.desc}&imgUrl=${value.imgUrl}&active=${value.active}`}
              >
                {value.name}{" "}
              </Link>
              - {value.desc}-{value.imgUrl}-{value.active ? "Active" : "Inactive"}
              <button onClick={() => handleDelete(value._id)}>Delete</button>
            </li>
          ))}
      </ul>
    </div>
  );
}
