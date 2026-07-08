import { useEffect, useState } from "react";

function Department() {

  const [departments, setDepartments] = useState([]);
  const [departmentName, setDepartmentName] = useState("");
  const [location, setLocation] = useState("");
  const [editId, setEditId] = useState("");

  const loadDepartments = async () => {
    const res = await fetch(
      "http://localhost:5000/departments"
    );

    const data = await res.json();

    setDepartments(data);
  };

  useEffect(() => {
    loadDepartments();
  }, []);

  const saveDepartment = async () => {

    const payload = {
      departmentName,
      location
    };

    if (editId) {

      await fetch(
        `http://localhost:5000/departments/${editId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json"
          },
          body: JSON.stringify(payload)
        }
      );

    } else {

      await fetch(
        "http://localhost:5000/departments",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json"
          },
          body: JSON.stringify(payload)
        }
      );
    }

    setDepartmentName("");
    setLocation("");
    setEditId("");

    loadDepartments();
  };

  const editDepartment = (dep) => {
    setDepartmentName(dep.departmentName);
    setLocation(dep.location);
    setEditId(dep._id);
  };

  const deleteDepartment = async (id) => {

    await fetch(
      `http://localhost:5000/departments/${id}`,
      {
        method: "DELETE"
      }
    );

    loadDepartments();
  };

  return (
    <div className="page">

      <div className="card">

        <h2 className="card-title">
          Department Management
        </h2>

        <div className="form-grid">

          <input
            placeholder="Department Name"
            value={departmentName}
            onChange={(e)=>
              setDepartmentName(
                e.target.value
              )
            }
          />

          <input
            placeholder="Location"
            value={location}
            onChange={(e)=>
              setLocation(
                e.target.value
              )
            }
          />

        </div>

        <br />

        <button
          className="btn-primary"
          onClick={saveDepartment}
        >
          {editId
            ? "Update Department"
            : "Add Department"}
        </button>

      </div>

      <div className="card">

        <table>

          <thead>

            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Action</th>
            </tr>

          </thead>

          <tbody>

            {
              departments.map(dep => (

                <tr key={dep._id}>

                  <td>
                    {dep.departmentName}
                  </td>

                  <td>
                    {dep.location}
                  </td>

                  <td>

                    <button
                      className="edit-btn"
                      onClick={() =>
                        editDepartment(dep)
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        deleteDepartment(dep._id)
                      }
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))
            }

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Department;