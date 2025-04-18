"use client";
import React from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
// import { trackSynchronousPlatformIOAccessInDev } from "next/dist/server/app-render/dynamic-rendering";
export default function AdminTopicsById() {
  const [topic, setTopic] = useState({});
  const [msg, setMsg] = useState();
  const params = useParams();
  const [file, setFile] = useState(null);
  const handleChange = (e) => {
    setFile(e.target.files[0]);
    setTopic({ ...topic, imgUrl: "Exists" });
  };

  const [uploadedPath, setUploadedPath] = useState("");

  const handleUpload = async (fileName) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);

    const res = await fetch("/api/admin/uploads", {
      method: "POST",
      body: formData,
    });

    const result = await res.json();
    setUploadedPath(result.path);
    setFile(null)
  };

  const handleSubmit = async () => {
    //console.log(topic);
    const res = await axios.patch("/api/admin/topics/" + params.id, topic);
    //console.log(res.data);
    file !== null && (await handleUpload(res.data._id));
    // await handleUpload(res.data._id)
    if (res.statusText === "OK") setMsg("Updated sccessfully");
    window.location.reload();
    //window.location.href = window.location.href;
  };
  useEffect(() => {
    fetch("/api/admin/topics/" + params.id).then((res) =>
      res.json().then((data) => setTopic(data[0]))
    );
  }, []);
  return (
    <div>
      <h3>Edit Topic {params.id}</h3>
      {msg}

      <fieldset>
        <legend>Main Topic</legend>
        <div style={{ display: "flex"}}>
          <div>
            <p>
              <input
                placeholder="Enter Sequence Number"
                defaultValue={topic.sqNum}
                onChange={(e) => setTopic({ ...topic, sqNum: e.target.value })}
              ></input>
            </p>
            <p>
              <input
                placeholder="Enter Topic Name"
                defaultValue={topic.name}
                onChange={(e) => setTopic({ ...topic, name: e.target.value })}
              ></input>
            </p>
            <p>
              <input
                placeholder="Enter Description"
                defaultValue={topic.desc}
                onChange={(e) => setTopic({ ...topic, desc: e.target.value })}
              ></input>
            </p>

            <p>
              <input
                defaultValue={topic.active}
                onChange={(e) =>
                  setTopic({ ...topic, active: Boolean(e.target.value) })
                }
              ></input>
            </p>

            <p>
              <Image
                src={`/uploads/${topic._id}.png`}
                alt="image"
                height={50}
                width={100}
              />
              </p>
              
          </div>

          <div>
          <p>
              <input type="file" onChange={handleChange}  />
            </p>
            <p>
              <textarea
                rows="10"
                cols="100"
                defaultValue={topic.code}
                placeholder="Past Code"
                onChange={(e) => setTopic({ ...topic, code: e.target.value })}
              />
            </p>
          </div>
        </div>
      </fieldset>

      {/* <p>
        <input type="checkbox" defaultChecked={topic.active}></input> 
         <label>Active</label> 
      </p> */}

      {Array.from({ length: 5 }, (_, v) => (
        <fieldset key={v}>
          <legend>Sub Topic {v + 1}</legend>
          <div key={v} style={{ display: "flex" }}>
            <div>
              <p>
                <input
                  placeholder="Enter Sub Topic Name"
                  defaultValue={eval(`topic.subTopic${v+1}`)}
                  onChange={(e) =>
                    setTopic({ ...topic, [`subTopic${v + 1}`]: e.target.value })
                  }
                ></input>
              </p>
              <p>
                <input
                  placeholder="Enter Sub Topic Description"
                  defaultValue={eval(`topic.desc${v+1}`)}
                  onChange={(e) =>
                    setTopic({ ...topic, [`desc${v + 1}`]: e.target.value })
                  }
                ></input>
              </p>
            </div>
            <div>
              <textarea
                rows="5"
                cols="100"
                defaultValue={eval(`topic.example${v+1}`)}
                placeholder="Past Code"
                onChange={(e) =>
                  setTopic({ ...topic, [`example${v + 1}`]: e.target.value })
                }
              />
            </div>
          </div>
        </fieldset>
      ))}


      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
