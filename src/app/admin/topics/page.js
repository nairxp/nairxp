"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import useFetch from "@/hooks/useFetch";
import Link from "next/link";
// import { useParams } from "next/navigation";
// import { useSearchParams } from "next/navigation";
export default function AdminTopics() {
  // const params = useParams();
  // const searchParams = useSearchParams();
  // const courseName = searchParams.get("name");
  const [topic, setTopic] = useState({});
  const [topics, setTopics] = useState([]);
  const [courseId, setCourseId] = useState(null);
  const [file, setFile] = useState(null);

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

  // const { data, loading, error } = useFetch("/api/admin/topics/" + params.id);
  // const { data, loading, error } = useFetch("/api/admin/topics/");
  const { data, loading, error } = useFetch("/api/admin/courses/");
  // console.log(courses)
  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error}</p>;
  const handleChange = (e) => {
    setFile(e.target.files[0]);
    setTopic({ ...topic, imgUrl: "Exists" });
  };
  const handleSubmit = async () => {
    const r = await axios.post("/api/admin/topics/", { ...topic, courseId });
    //console.log(r.data.topic);
    file !== null && await handleUpload(r.data.topic._id);
    showTopics();
  };
  const handleDelete = async (id) => {
    // axios.patch("/api/admin/topics/" + id);
    await axios.delete("/api/admin/topics/" + id);
    showTopics();
    // window.location.reload();
  };

  const showTopics = () => {
    // courseId &&
    // fetch("/api/admin/topics/").then((res) =>
    //   res.json().then((data) => setTopics(data))
    // );
    courseId &&
      fetch("/api/courses/" + courseId).then((res) =>
        res.json().then((data) => setTopics(data))
      );
  };

  useEffect(() => {
    // courseId === "0" ? setTopics([]) : showTopics();
    showTopics();
    // courseId &&
    //   fetch("/api/admin/topics/" + courseId).then((res) =>
    //     res.json().then((data) => setTopics(data))
    //   );
  }, [courseId]);

  return (
    <div>
      <h3>Topics</h3>
      <p>
        <select
          // defaultValue={courseId}
          onChange={(e) => setCourseId(e.target.value)}
        >
          <option key={0} value="0">
            --Select Course--
          </option>

          {data &&
            data.map((value) => (
              <option key={value._id} value={value._id}>
                {value.name}
              </option>
            ))}
        </select>
      </p>

      <fieldset>
        <legend>Main Topic</legend>
        <div style={{ display: "flex" }}>
          <div>
            {topics.length > 0 && <p>{topics[topics.length - 1].sqNum}</p>}
            <p>
              <input
                placeholder="Sequence Number"
                onChange={(e) =>
                  setTopic({ ...topic, sqNum: Number(e.target.value) })
                }
              ></input>
            </p>
            <p>
              <input
                placeholder="Enter Topic Name"
                onChange={(e) => setTopic({ ...topic, name: e.target.value })}
              ></input>
            </p>
            <p>
              <input
                placeholder="Enter Description"
                onChange={(e) => setTopic({ ...topic, desc: e.target.value })}
              ></input>
            </p>
            <p>
              <input type="file" onChange={handleChange} />
            </p>
          </div>
          <div>
            <p>
              <textarea
                rows="5"
                cols="100"
                placeholder="Past Code"
                onChange={(e) => setTopic({ ...topic, code: e.target.value })}
              />
            </p>
          </div>
        </div>
      </fieldset>
      {Array.from({ length: 5 }, (_, v) => (
        <fieldset key={v}>
          <legend>Sub Topic {v + 1}</legend>
          <div key={v} style={{ display: "flex" }}>
            <div>
              <p>
                <input
                  placeholder="Enter Sub Topic Name"
                  onChange={(e) =>
                    setTopic({ ...topic, [`subTopic${v + 1}`]: e.target.value })
                  }
                ></input>
              </p>
              <p>
                <input
                  placeholder="Enter Sub Topic Description"
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
      {/* {topics.length > 0 && (
        <div>
          <h3>
          <Link href={`/admin/topics/${topics[topics.length - 1]._id}`}>{topics[topics.length - 1].sqNum}){topics[topics.length - 1].name}</Link>
          </h3>
          <p>
  
            {topics[topics.length - 1].desc}
          </p>
        </div>
      )} */}

      {uploadedPath && (
        <div className="mt-4">
          <p>Uploaded Image:</p>
          <img src={uploadedPath} alt="Uploaded" width="200" />
        </div>
      )}

      <ul>
        {topics &&
          topics.map((topic) => (
            <div key={topic._id}>
              <Link href={`/admin/topics/${topic._id}`}>{topic.name}</Link>
              {topic.desc} - {topic.code}-{topic.active ? "Active" : "Inactive"}
              -<button onClick={() => handleDelete(topic._id)}>Delete</button>
            </div>
          ))}
      </ul>
    </div>
  );
}
