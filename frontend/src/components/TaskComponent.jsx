import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createTask, getTask, updateTask } from "../services/TaskService";

const TaskComponent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("");

  const { id } = useParams();

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "",
  });

  const navigator = useNavigate();

  useEffect(() => {
    if (id) {
      getTask(id)
        .then((response) => {
          setTitle(response.data.title);
          setDescription(response.data.description);
          setDueDate(response.data.dueDate);
          setStatus(response.data.status);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  function saveOrUpdateTask(e) {
    e.preventDefault();

    if (validateForm()) {
      const task = { title, description, dueDate, status };
      console.log(task);

      if (id) {
        updateTask(id, task)
          .then((response) => {
            console.log(response.data);
            navigator("/tasks");
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        createTask(task)
          .then((response) => {
            console.log(response.data);
            navigator("/tasks");
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  }

  function validateForm() {
    let valid = true;
    const errorsCopy = { ...errors };

    if (title.trim()) {
      errorsCopy.title = "";
    } else {
      errorsCopy.title = "title is required";
      valid = false;
    }

    if (description.trim()) {
      errorsCopy.description = "";
    } else {
      errorsCopy.description = "description is required";
      valid = false;
    }

    if (dueDate.trim()) {
      errorsCopy.dueDate = "";
    } else {
      errorsCopy.dueDate = "dueDate is required";
      valid = false;
    }

    if (status.trim()) {
      errorsCopy.status = "";
    } else {
      errorsCopy.status = "status is required";
      valid = false;
    }

    setErrors(errorsCopy);
    return valid;
  }

  function PageTitle() {
    if (id) {
      return <h2 className="text-center">Update Task</h2>;
    } else {
      return <h2 className="text-center">Add Task</h2>;
    }
  }

  return (
    <div className="container">
      <br /> <br />
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          {PageTitle}
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label className="form-label">Title:</label>
                <input
                  type="text"
                  placeholder="Enter Task Title"
                  name="title"
                  value={title}
                  className={`form-control ${errors.title ? "is-invalid" : ""}`}
                  onChange={(e) => setTitle(e.target.value)}
                ></input>
                {errors.title && (
                  <div className="invalid-feedback"> {errors.title} </div>
                )}
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Description:</label>
                <input
                  type="text"
                  placeholder="Enter Task Description"
                  name="description"
                  value={description}
                  className={`form-control ${
                    errors.description ? "is-invalid" : ""
                  }`}
                  onChange={(e) => setDescription(e.target.value)}
                ></input>
                {errors.description && (
                  <div className="invalid-feedback"> {errors.description} </div>
                )}
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Due Date:</label>
                <input
                  type="text"
                  placeholder="Enter Due Date"
                  name="dueDate"
                  value={dueDate}
                  className={`form-control ${
                    errors.dueDate ? "is-invalid" : ""
                  }`}
                  onChange={(e) => setDueDate(e.target.value)}
                ></input>
                {errors.dueDate && (
                  <div className="invalid-feedback"> {errors.dueDate} </div>
                )}
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Status:</label>
                <input
                  type="text"
                  placeholder="Enter Task Status"
                  name="status"
                  value={status}
                  className={`form-control ${
                    errors.status ? "is-invalid" : ""
                  }`}
                  onChange={(e) => setStatus(e.target.value)}
                ></input>
                {errors.status && (
                  <div className="invalid-feedback"> {errors.status} </div>
                )}
              </div>

              <button className="btn btn-success" onClick={saveOrUpdateTask}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskComponent;
