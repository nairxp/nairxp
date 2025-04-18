"use client";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { useState } from "react";
import axios from "axios";
export default function UserById() {
  const params = useParams();
  const [user, setUser] = useState({});
  const [courses, setCourses] = useState([]);
  const [topics, setTopics] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [msg, setMsg] = useState();

  const deleteTopics = (event) => {
    setSelectedTopics(
      selectedTopics.filter((elem) => elem !== event.target.value)
    );
    setUser({ ...user, topics: selectedTopics });
  };
  const handleChange = (event) => {
    setSelectedTopics([...selectedTopics, event.target.value]);
    setUser({ ...user, topics: selectedTopics });
  };

  useEffect(() => {
    fetch("/api/admin/users/" + params.id)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setSelectedTopics(data.topics);
      });

    fetch("/api/admin/courses")
      .then((res) => res.json())
      .then((data) => setCourses(data));
  }, []);

  const handleSubmit = async () => {
    try {
      const res = await axios.patch("/api/admin/users/" + params.id, user);
      setMsg("Data updated successfully");
    } catch (err) {
      setMsg("Something went wrong");
    }
  };

  const handleCourseChange = (id) => {
    if (id !== "0") {
      const url = `/api/courses/${id}`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => setTopics(data));
    } else {
      setTopics(null);
    }
  };
  return (
    <div>
      <h3>Edit page of {user.name}</h3>
      {msg}
      <div style={{ display: "flex" }}>
        <div>
          <p>
            <input
              defaultValue={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
          </p>
          <p>
            <input defaultValue={user.email}  onChange={(e) => setUser({ ...user, email: e.target.value })} />
          </p>
          <p>
            <input type="password" defaultValue={user.pass}  onChange={(e) => setUser({ ...user, pass: e.target.value })} />
          </p>
          <p>
            <input defaultValue={user.role}  onChange={(e) => setUser({ ...user, role: e.target.value })} />
          </p>
          <p>
            <input defaultValue={user.orgName} placeholder="Org Name"  onChange={(e) => setUser({ ...user, orgName: e.target.value })} />
          </p>
          <p>
            <input defaultValue={user.active}  onChange={(e) => setUser({ ...user, active: e.target.value })} />
          </p>
          <p>
            <select onChange={(e) => handleCourseChange(e.target.value)}>
              <option value="0">--Select Course--</option>
              {courses &&
                courses.map((value) => (
                  <option key={value._id} value={value._id}>
                    {value.name}
                  </option>
                ))}
            </select>
          </p>
        </div>
        <div>
          <h4>Yet to Assign</h4>
          <p>
            <select size={20} onChange={handleChange}>
              {topics &&
                topics.map(
                  (value) =>
                    !user.topics.find((elem) => elem === value._id) && (
                      <option key={value._id} value={value._id}>
                        {value.name}
                      </option>
                    )
                )}
            </select>
          </p>
        </div>

        <div>
          <h4>Already Assigned</h4>
          <p>
            <select size={20} onChange={deleteTopics}>
              {topics &&
                topics.map(
                  (value) =>
                    user.topics.find((elem) => elem === value._id) && (
                      <option key={value._id} value={value._id}>
                        {value.name}
                      </option>
                    )
                )}
            </select>
          </p>
        </div>
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
