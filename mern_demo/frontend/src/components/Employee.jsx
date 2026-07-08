import { useEffect, useState } from "react";

function Employee() {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [editId, setEditId] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    age: "",
    salary: "",
    isActive: true,
    joiningDate: "",
    skills: "",
    city: "",
    state: "",
    departmentId: "",
  });

  const loadEmployees = async () => {
    const res = await fetch("http://localhost:5000/employees");
    const data = await res.json();
    setEmployees(data);
  };

  const loadDepartments = async () => {
    const res = await fetch("http://localhost:5000/departments");
    const data = await res.json();
    setDepartments(data);
  };

  useEffect(() => {
    loadEmployees();
    loadDepartments();
  }, []);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const saveEmployee = async () => {
    const payload = {
      name: form.name,
      email: form.email,
      age: Number(form.age),
      salary: Number(form.salary),
      isActive: form.isActive,
      joiningDate: form.joiningDate,
      skills: form.skills.split(",").map((s) => s.trim()),
      address: {
        city: form.city,
        state: form.state,
      },
      departmentId: form.departmentId,
    };

    if (editId) {
      await fetch(`http://localhost:5000/employees/${editId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
    } else {
      await fetch("http://localhost:5000/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
    }

    setEditId("");

    setForm({
      name: "",
      email: "",
      age: "",
      salary: "",
      isActive: true,
      joiningDate: "",
      skills: "",
      city: "",
      state: "",
      departmentId: "",
    });

    loadEmployees();
  };

  const editEmployee = (emp) => {
    setEditId(emp._id);

    setForm({
      name: emp.name,
      email: emp.email,
      age: emp.age,
      salary: emp.salary,
      isActive: emp.isActive,
      joiningDate: emp.joiningDate
        ? emp.joiningDate.substring(0, 10)
        : "",
      skills: emp.skills.join(", "),
      city: emp.address?.city || "",
      state: emp.address?.state || "",
      departmentId: emp.departmentId?._id || "",
    });
  };

  const deleteEmployee = async (id) => {
    if (!window.confirm("Delete Employee?")) return;

    await fetch(`http://localhost:5000/employees/${id}`, {
      method: "DELETE",
    });

    loadEmployees();
  };

  return (
    <div className="page">

      <div className="card">

        <h2 className="card-title">
          Employee Management
        </h2>

        <div className="form-grid">

          <div className="form-group">
            <label>Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Age</label>
            <input
              type="number"
              name="age"
              value={form.age}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Salary</label>
            <input
              type="number"
              name="salary"
              value={form.salary}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Joining Date</label>
            <input
              type="date"
              name="joiningDate"
              value={form.joiningDate}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Department</label>

            <select
              name="departmentId"
              value={form.departmentId}
              onChange={handleChange}
            >
              <option value="">
                Select Department
              </option>

              {departments.map((dep) => (
                <option
                  key={dep._id}
                  value={dep._id}
                >
                  {dep.departmentName}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>City</label>
            <input
              name="city"
              value={form.city}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>State</label>
            <input
              name="state"
              value={form.state}
              onChange={handleChange}
            />
          </div>

          <div className="form-group full-width">
            <label>Skills</label>
            <input
              name="skills"
              placeholder="React, NodeJS, MongoDB"
              value={form.skills}
              onChange={handleChange}
            />
          </div>

        <div className="full-width">

<label>Status</label>

<div className="status-group">

<label>

<input
type="radio"
name="isActive"
checked={form.isActive===true}
onChange={()=>
setForm({
...form,
isActive:true
})
}
/>

Active

</label>

<label>

<input
type="radio"
name="isActive"
checked={form.isActive===false}
onChange={()=>
setForm({
...form,
isActive:false
})
}
/>

Inactive

</label>

</div>

</div>
        </div>

        <button
          className="btn btn-primary"
          onClick={saveEmployee}
        >
          {editId ? "Update Employee" : "Add Employee"}
        </button>

      </div>

      <div className="card">

        <h2 className="card-title">
          Employee List
        </h2>

        <table>
       <thead>
<tr>
  <th>Name</th>
  <th>Email</th>
  <th>Age</th>
  <th>Salary</th>
  <th>Joining Date</th>
  <th>Department</th>
  <th>City</th>
  <th>State</th>
  <th>Skills</th>
  <th>Status</th>
  <th>Action</th>
</tr>
</thead>

<tbody>

{employees.map((emp)=>(

<tr key={emp._id}>

<td>{emp.name}</td>

<td>{emp.email}</td>

<td>{emp.age}</td>

<td>₹{emp.salary}</td>

<td>
{
emp.joiningDate
? new Date(emp.joiningDate).toLocaleDateString()
: "-"
}
</td>

<td>
{emp.departmentId?.departmentName}
</td>

<td>
{emp.address?.city}
</td>

<td>
{emp.address?.state}
</td>

<td>
{emp.skills.join(", ")}
</td>

<td>

{
emp.isActive ?

<span className="badge-active">
Active
</span>

:

<span className="badge-inactive">
Inactive
</span>

}

</td>

<td>

<button
className="edit-btn"
onClick={()=>editEmployee(emp)}
>
Edit
</button>

<button
className="delete-btn"
onClick={()=>deleteEmployee(emp._id)}
>
Delete
</button>

</td>

</tr>

))}

</tbody>

        </table>

      </div>

    </div>
  );
}

export default Employee;