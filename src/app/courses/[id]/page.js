"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import useFetch from "@/hooks/useFetch";
import { useParams } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useRef } from "react";
export default function CourseByIdPage() {
  const [page, setPage] = useState(0);
  const params = useParams();
  const searchParams = useSearchParams();
  const { data, loading, error } = useFetch("/api/courses/" + params.id);
  const topicRef = useRef();
  const handleNext = () => {
    setPage(page + 1)
    topicRef.current.value = page+1;
  };
  const handlePrev = () => {
    setPage(page - 1)
    topicRef.current.value = page-1;
  };
  return (
    <div>
      <h2>{searchParams.get("name")}</h2>
      <div>
        
        {/* <div>
          {Array.from({ length: data && data.length }, (_, v) => (
            <div key={v} style={{ width: "200px" }}>
              <button onClick={() => setPage(v)}>
                {v + 1}.{data[v].name}
              </button>
            </div>
          ))}
        </div> */}
        <div >
          {data?.length > 0 && (
            <div style={{ backgroundColor: "#eeeeee", margin: "5px",padding:'5px' }}>

<div>
          <select
            className="App-Course-List"
            ref={topicRef}
            onChange={(e) => setPage(Number(e.target.value))}
          >
            {/* <option value={0}>--Select Topic--</option> */}
            {Array.from({ length: data && data.length }, (_, v) => (
              <option key={v} value={v}>
                {data[v].name}
              </option>
            ))}
          </select>
        </div>

              {/* <h3>
                {data[page].name}
              </h3> */}
              <p>{data[page].desc}</p>
              {/* <p>{data[page].imgUrl}</p> */}
              <p>
                {data[page].imgUrl === "Exists" && (
                  <img src={`/uploads/${data[page]._id}` + ".png"} />
                )}

                {/* <Image
                src={`/uploads/${data[page]._id}` + ".png"}
                alt="Next.js logo"
                width={600}
                height={400}
                priority
              /> */}
              </p>
              <pre
                style={{
                  fontSize: "18px",
                  backgroundColor: "white",
                  margin: "5px",
                }}
              >
                <code>{data[page].code}</code>
              </pre>

              {Array.from({ length: 5 }, (_, v) => (
                <div key={v}>
                  <h4>{eval(`data[${page}].subTopic${v + 1}`)}</h4>
                  <p>{eval(`data[${page}].desc${v + 1}`)}</p>
                  <pre>
                    <code>{eval(`data[${page}].example${v + 1}`)}</code>
                  </pre>
                </div>
              ))}

              {page > 0 && (
                <button
                className="App-Course-Nav-Button"
                onClick={handlePrev}
              >
                Previous
              </button>
                // <button
                //   className="App-Course-Nav-Button"
                //   onClick={() => setPage(page - 1)}
                // >
                //   Previous
                // </button>
              )}
              {data.length - 1 > page && (
                // <button
                //   className="App-Course-Nav-Button"
                //   onClick={() => setPage(page + 1)}
                // >
                //   Next
                // </button>

                <button
                  className="App-Course-Nav-Button"
                  onClick={handleNext}
                >
                  Next
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
