import React, { useState } from "react";
import Constant from "../utilities/Constant";

export default function UpdateForm(props) {
  const initialForm = Object.freeze({
    name: props.post.name,
    content: props.post.content,
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

    const postToUpdate = {
      postId: props.post.postId,
      name: formData.name,
      content: formData.content,
    };
    if (postToUpdate.name != "" && postToUpdate.content != "") {
      const url = Constant.API_URL_UPDATE_POST;
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postToUpdate),
      })
        .then((res) => res.json())
        .then((r) => {
          console.log(r);
        })
        .catch((e) => {
          console.log(e);
        });
    }
    props.onPostUpdated(postToUpdate);
  };
  return (
    <div>
      <form>
        <h1>Update Form for "{props.post.name}"</h1>
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
          onClick={() => props.onPostUpdated(null)}
          className="btn btn-secondary mt-5 mx-3"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
