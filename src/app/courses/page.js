"use client";
import React from "react";
import useFetch from "@/hooks/useFetch";
import Image from "next/image";
import Link from "next/link";
export default function CoursesPage() {
  const { data, loading, error } = useFetch("/api/courses/");
  return (
    <div className="App-Course-Container">
      {data &&
        data.map((value) => (
          <div className="App-Course-Box" key={value._id}>
            {/* <img src={value.imgUrl} alt={value.name} height={300} width={300}/> */}
            <h3>{value.name}</h3>
            <p>{value.desc}</p>
            <Link
              href={`/courses/${value._id}?name=${value.name}`}
            >
              Start
            </Link>
          </div>
        ))}

      {/* {data &&
        data.map((value) => (
          <div key={value._id.courseId}>
            <h3>{value._id.courseName}</h3>
            <p>{value._id.courseDesc}</p>
            <Link href={`/courses/${value._id.courseId}?name=${value._id.courseName}`}>Start</Link>
          </div>
        ))} */}

      {/* {data &&
        data.map((value) => (
          <div key={value._id}>
            <h3>{value.name}</h3>
            <p>{value.desc}</p>
            <Link href={`/courses/${value._id}?name=${value.name}`}>Start</Link>
          </div>
        ))} */}
    </div>
  );
}
