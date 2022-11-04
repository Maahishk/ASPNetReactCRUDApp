import React, { useEffect, useState } from "react";
import CreateForm from "./components/CreateForm";
import UpdateForm from "./components/UpdateForm";
import Constant from "./utilities/Constant";
export default function App() {
  const [posts, setPosts] = useState([]);
  const [show, setShow] = useState(false);
  const [updated, setUpdate] = useState(null);

  useEffect(() => {
    const url = Constant.API_URL_GET_ALL_POST;
    fetch(url, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((r) => {
        console.log(r);
        setPosts(r);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div className="container">
      <div className="min-vh-100">
        <h2>CRUD app</h2>
        <button
          onClick={() => {
            setShow(true);
          }}
          type="submit"
          className="btn btn-primary"
        >
          Create New Post
        </button>
        <div>
          {show && <CreateForm onPostCreated={onPostCreated} />}
          {posts.length > 0 &&
            show === false &&
            updated === null &&
            renderPostTable()}
          {updated !== null && (
            <UpdateForm post={updated} onPostUpdated={onUpdated} />
          )}
        </div>
      </div>
    </div>
  );
  function deletePost(postId) {
    console.log(postId);
    const url = `${Constant.API_URL_DELETE_POST_BY_ID}/${postId}`;
    fetch(url, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((r) => {
        console.log(r);
        onPostDeleted(postId);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  function renderPostTable() {
    return (
      <div className="table-responsive mt-5">
        <table className="table table-hover table-dark">
          <thead>
            <tr>
              <th scope="col">postId</th>
              <th scope="col">Title</th>
              <th scope="col">Content</th>
              <th scope="col">Activity</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr>
                <th scope="row">{post.postId}</th>
                <td>{post.name}</td>
                <td>{post.content}</td>
                <td>
                  <button
                    onClick={() => setUpdate(post)}
                    type="submit"
                    className="btn btn-secondary  mx-3 "
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to delete the post?"
                        )
                      )
                        deletePost(post.postId);
                    }}
                    type="submit"
                    className="btn btn-danger "
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  function onPostCreated(createPost) {
    setShow(false);
    if (createPost === null) {
      return;
    }
  }
  function onUpdated(updatePost) {
    setUpdate(null);
    if (updatePost === null) {
      return;
    }
    let postCopy = [...posts];
    const index = postCopy.findIndex((postCopyPost, currentindex) => {
      if (postCopyPost.postId === updatePost.postId) {
        return true;
      }
    });
    if (index !== -1) {
      postCopy[index] = updatePost;
    }
    setPosts(postCopy);
    alert(`Post updated`);
  }

  function onPostDeleted(deletedpostId) {
    let postCopy = [...posts];
    const index = postCopy.findIndex((postCopyPost, currentindex) => {
      if (postCopyPost.postId === deletedpostId) {
        return true;
      }
    });
    if (index !== -1) {
      postCopy.splice(index, 1);
    }
    setPosts(postCopy);
    alert(`Post deleted`);
  }
}
