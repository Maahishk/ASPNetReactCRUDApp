import React, { useState } from "react";
import Constant from "../utilities/Constant";

export default function CreateForm(props) {
  const initialForm = Object.freeze({
    name: "",
    content: "",
  });
  const [formData, setFormData] = useState(initialForm);
  const handleChange = (e) => {
    console.log(formData);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const postToCreate = {
      postId: 0,
      name: formData.name,
      content: formData.content,
    };
    if (postToCreate.name != "" && postToCreate.content != "") {
      const url = Constant.API_URL_CREATE_POST;
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postToCreate),
      })
        .then((res) => res.json())
        .then((r) => {
          console.log(r);
        })
        .catch((e) => {
          console.log(e);
        });
    }
    props.onPostCreated(postToCreate);
  };
  return (
    <div>
      <form>
        <h1>Create New Form</h1>
        <div className="mt-5">
          <label>Title</label>
          <input
            value={formData.name}
            name="name"
            className="form-control"
            onChange={handleChange}
          />
        </div>
        <div className="mt-4">
          <label>Content</label>
          <input
            value={formData.content}
            name="content"
            className="form-control"
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="btn btn-primary mt-5"
        >
          Submit
        </button>
        <button
          type="submit"
          onClick={() => props.onPostCreated(null)}
          className="btn btn-secondary mt-5 mx-3"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
