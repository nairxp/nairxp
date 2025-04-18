"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import useFetch from "@/hooks/useFetch";
import { useRef } from "react";
export default function CourseById() {
  const params = useParams();
  const searchParams = useSearchParams();
  //   const [course, setCourse] = useState({});
  const nameRef = useRef();
  const descRef = useRef();
  const imgRef = useRef();
  const activeRef = useRef()
  const [msg, setMsg] = useState();
  const handleSubmit = async () => {
    try {
      const newCourse = {
        name: nameRef,
        desc: descRef,
        imgUrl: imgRef,
        active:activeRef.current.checked
      };
      const res = await axios.patch("/api/admin/courses/" + params.id, newCourse);
      window.location.reload();
    } catch (err) {
      setMsg("Something went wrong");
    }
  };

  return (
    <div>
      {msg}
      <div>
        <p>
          <input
            placeholder="Course Title"
            defaultValue={searchParams.get("name")}
            ref={nameRef}
            // onChange={(e) => setCourse({ ...course, name: e.target.value })}
          ></input>
        </p>
        <p>
          <input
            placeholder="Course Description"
            defaultValue={searchParams.get("desc")}
            ref={descRef}
            // onChange={(e) => setCourse({ ...course, desc: e.target.value })}
          ></input>
        </p>
        <p>
          <input
            placeholder="Image Url"
            defaultValue={searchParams.get("imgUrl")}
            ref={imgRef}
            // onChange={(e) => setCourse({ ...course, imgUrl: e.target.value })}
          ></input>
        </p>
        <p><input type="checkbox"  ref={activeRef} defaultChecked={searchParams.get("active")}/><label>Active</label></p>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}
