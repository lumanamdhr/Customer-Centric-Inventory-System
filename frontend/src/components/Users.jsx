import { useEffect, useState } from "react";

import {
  Users,
  UserPlus,
  ShieldCheck,
  BriefcaseBusiness,
  Pencil,
  Trash2,
  X,
} from "lucide-react";


function UserManagement() {

  // =========================================================
  // STATE
  // =========================================================

  // Stores all users from the backend
  const [users, setUsers] = useState([]);

  // Loading state
  const [loading, setLoading] = useState(true);

  // Error / success message
  const [message, setMessage] = useState("");

  // Controls Add/Edit modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Stores the user currently being edited
  const [editingUser, setEditingUser] = useState(null);

  // Prevents repeated form submission
  const [saving, setSaving] = useState(false);


  // =========================================================
  // FORM STATE
  // =========================================================

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
    age: "",
    gender: "",
    location: "",
  });


  // =========================================================
  // FETCH USERS
  // =========================================================

  const fetchUsers = async () => {

    try {

      const token =
        localStorage.getItem("access_token");

      if (!token) {

        setMessage(
          "Please login to manage users."
        );

        setLoading(false);

        return;
      }


      const response = await fetch(
        "http://127.0.0.1:8000/admin/users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );


      const data = await response.json();


      if (!response.ok) {

        setMessage(
          data.detail ||
          "Unable to load users."
        );

        return;
      }


      setUsers(data);

    } catch (error) {

      console.error(
        "User management error:",
        error
      );

      setMessage(
        "Unable to connect to server."
      );

    } finally {

      setLoading(false);

    }
  };


  // =========================================================
  // LOAD USERS
  // =========================================================

  useEffect(() => {

    fetchUsers();

  }, []);


  // =========================================================
  // SEPARATE USERS BY ROLE
  // =========================================================

  const customers = users.filter(
    (user) => user.role === "customer"
  );

  const employees = users.filter(
    (user) => user.role === "employee"
  );

  const admins = users.filter(
    (user) => user.role === "admin"
  );


  // =========================================================
  // OPEN ADD MODAL
  // =========================================================

  const handleAddUser = () => {

    setEditingUser(null);

    setFormData({
      name: "",
      email: "",
      password: "",
      role: "customer",
      age: "",
      gender: "",
      location: "",
    });

    setMessage("");

    setIsModalOpen(true);
  };


  // =========================================================
  // OPEN EDIT MODAL
  // =========================================================

  const handleEditUser = (user) => {

    setEditingUser(user);

    setFormData({
      name: user.name || "",
      email: user.email || "",
      password: "",
      role: user.role || "customer",
      age: user.age ?? "",
      gender: user.gender || "",
      location: user.location || "",
    });

    setMessage("");

    setIsModalOpen(true);
  };


  // =========================================================
  // HANDLE FORM INPUT
  // =========================================================

  const handleChange = (event) => {

    const {
      name,
      value,
    } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };


  // =========================================================
  // CREATE OR UPDATE USER
  // =========================================================

  const handleSubmit = async (event) => {

    event.preventDefault();

    setSaving(true);

    setMessage("");


    try {

      const token =
        localStorage.getItem("access_token");


      // -----------------------------------------------------
      // PREPARE DATA
      // -----------------------------------------------------

      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        role: formData.role,
        age:
          formData.age === ""
            ? null
            : Number(formData.age),
        gender:
          formData.gender.trim() || null,
        location:
          formData.location.trim() || null,
      };


      // -----------------------------------------------------
      // DETERMINE METHOD AND URL
      // -----------------------------------------------------

      const url = editingUser
        ? `http://127.0.0.1:8000/admin/users/${editingUser.id}`
        : "http://127.0.0.1:8000/admin/users";

      const method = editingUser
        ? "PUT"
        : "POST";


      // -----------------------------------------------------
      // SEND REQUEST
      // -----------------------------------------------------

      const response = await fetch(
        url,
        {
          method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );


      const data = await response.json();


      // -----------------------------------------------------
      // HANDLE ERROR
      // -----------------------------------------------------

      if (!response.ok) {

        setMessage(
          data.detail ||
          "Unable to save user."
        );

        return;
      }


      // -----------------------------------------------------
      // SUCCESS
      // -----------------------------------------------------

      setMessage(
        editingUser
          ? "User updated successfully."
          : "User created successfully."
      );


      // Refresh user list
      await fetchUsers();


      // Close modal
      setIsModalOpen(false);

    } catch (error) {

      console.error(
        "Save user error:",
        error
      );

      setMessage(
        "Unable to connect to server."
      );

    } finally {

      setSaving(false);

    }
  };


  // =========================================================
  // DELETE USER
  // =========================================================

  const handleDeleteUser = async (user) => {

    // -----------------------------------------------------
    // CONFIRM DELETION
    // -----------------------------------------------------

    const confirmed = window.confirm(
      `Are you sure you want to delete ${user.name}?`
    );


    if (!confirmed) {
      return;
    }


    try {

      const token =
        localStorage.getItem("access_token");


      const response = await fetch(
        `http://127.0.0.1:8000/admin/users/${user.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );


      const data = await response.json();


      if (!response.ok) {

        setMessage(
          data.detail ||
          "Unable to delete user."
        );

        return;
      }


      setMessage(
        data.message ||
        "User deleted successfully."
      );


      // Refresh table
      await fetchUsers();

    } catch (error) {

      console.error(
        "Delete user error:",
        error
      );

      setMessage(
        "Unable to connect to server."
      );

    }
  };


  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {

    return (
      <div className="py-10">

        <p className="text-sm text-slate-500">
          Loading users...
        </p>

      </div>
    );

  }


  // =========================================================
  // MAIN PAGE
  // =========================================================

  return (

    <div className="space-y-8">


      {/* =====================================================
          HEADER
          ===================================================== */}

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

        <div>

          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-600">
            Administration
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
            User Management
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Manage customer, employee, and administrator accounts.
          </p>

        </div>


        {/* ADD USER */}

        <button
          onClick={handleAddUser}
          className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-700"
        >

          <UserPlus size={18} />

          Add User

        </button>

      </div>


      {/* =====================================================
          MESSAGE
          ===================================================== */}

      {message && (

        <div className="rounded-xl border border-blue-100 bg-blue-50 px-4 py-3">

          <p className="text-sm text-blue-700">
            {message}
          </p>

        </div>

      )}


      {/* =====================================================
          SUMMARY
          ===================================================== */}

      <div className="grid gap-5 sm:grid-cols-3">


        {/* CUSTOMERS */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-medium text-slate-500">
                Customers
              </p>

              <p className="mt-3 text-2xl font-semibold text-slate-900">
                {customers.length}
              </p>

            </div>

            <div className="rounded-xl bg-blue-50 p-3 text-blue-600">

              <Users size={20} />

            </div>

          </div>

        </div>


        {/* EMPLOYEES */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-medium text-slate-500">
                Employees
              </p>

              <p className="mt-3 text-2xl font-semibold text-slate-900">
                {employees.length}
              </p>

            </div>

            <div className="rounded-xl bg-violet-50 p-3 text-violet-600">

              <BriefcaseBusiness size={20} />

            </div>

          </div>

        </div>


        {/* ADMINS */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-medium text-slate-500">
                Admins
              </p>

              <p className="mt-3 text-2xl font-semibold text-slate-900">
                {admins.length}
              </p>

            </div>

            <div className="rounded-xl bg-amber-50 p-3 text-amber-600">

              <ShieldCheck size={20} />

            </div>

          </div>

        </div>

      </div>


      {/* =====================================================
          CUSTOMER ACCOUNTS
          ===================================================== */}

      <UserTable
        title="Customer Accounts"
        description="Registered customer accounts."
        users={customers}
        roleColor="bg-blue-50 text-blue-700"
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
      />


      {/* =====================================================
          EMPLOYEE ACCOUNTS
          ===================================================== */}

      <UserTable
        title="Employee Accounts"
        description="Staff accounts with employee access."
        users={employees}
        roleColor="bg-violet-50 text-violet-700"
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
      />


      {/* =====================================================
          ADMIN ACCOUNTS
          ===================================================== */}

      <UserTable
        title="Admin Accounts"
        description="Administrative accounts with elevated access."
        users={admins}
        roleColor="bg-amber-50 text-amber-700"
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
      />


      {/* =====================================================
          ADD / EDIT MODAL
          ===================================================== */}

      {isModalOpen && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">

          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">


            {/* MODAL HEADER */}

            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

              <div>

                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-600">
                  User Management
                </p>

                <h2 className="mt-1 text-xl font-semibold text-slate-900">

                  {editingUser
                    ? "Edit User"
                    : "Add User"}

                </h2>

              </div>


              <button
                onClick={() =>
                  setIsModalOpen(false)
                }
                className="cursor-pointer rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >

                <X size={20} />

              </button>

            </div>


            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="space-y-5 p-6"
            >


              {/* NAME */}

              <div>

                <label className="text-sm font-medium text-slate-700">
                  Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                  placeholder="Enter full name"
                />

              </div>


              {/* EMAIL */}

              <div>

                <label className="text-sm font-medium text-slate-700">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                  placeholder="Enter email address"
                />

              </div>


              {/* PASSWORD */}

              <div>

                <label className="text-sm font-medium text-slate-700">

                  Password

                  {editingUser && (
                    <span className="ml-2 text-xs font-normal text-slate-400">
                      Leave empty to keep current password
                    </span>
                  )}

                </label>

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required={!editingUser}
                  autoComplete={
                    editingUser
                      ? "new-password"
                      : "new-password"
                  }
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                  placeholder={
                    editingUser
                      ? "Enter new password only if changing it"
                      : "Create password"
                  }
                />

              </div>


              {/* ROLE */}

              <div>

                <label className="text-sm font-medium text-slate-700">
                  Role
                </label>

                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="mt-2 w-full cursor-pointer rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                >

                  <option value="customer">
                    Customer
                  </option>

                  <option value="employee">
                    Employee
                  </option>

                  <option value="admin">
                    Admin
                  </option>

                </select>

              </div>


              {/* AGE / GENDER */}

              <div className="grid gap-5 sm:grid-cols-2">


                {/* AGE */}

                <div>

                  <label className="text-sm font-medium text-slate-700">
                    Age
                  </label>

                  <input
                    type="number"
                    name="age"
                    min="1"
                    max="120"
                    value={formData.age}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                    placeholder="Age"
                  />

                </div>


                {/* GENDER */}

                <div>

                  <label className="text-sm font-medium text-slate-700">
                    Gender
                  </label>

                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="mt-2 w-full cursor-pointer rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                  >

                    <option value="">
                      Select gender
                    </option>

                    <option value="Female">
                      Female
                    </option>

                    <option value="Male">
                      Male
                    </option>

                    <option value="Other">
                      Other
                    </option>

                    <option value="Prefer not to say">
                      Prefer not to say
                    </option>

                  </select>

                </div>

              </div>


              {/* LOCATION */}

              <div>

                <label className="text-sm font-medium text-slate-700">
                  Location
                </label>

                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                  placeholder="Kathmandu"
                />

              </div>


              {/* FORM BUTTONS */}

              <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">

                <button
                  type="button"
                  onClick={() =>
                    setIsModalOpen(false)
                  }
                  className="cursor-pointer rounded-xl border border-slate-200 px-5 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                >
                  Cancel
                </button>


                <button
                  type="submit"
                  disabled={saving}
                  className="cursor-pointer rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
                >

                  {saving
                    ? "Saving..."
                    : editingUser
                      ? "Save Changes"
                      : "Create User"}

                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}


/* ============================================================
   REUSABLE USER TABLE
   ============================================================ */

function UserTable({
  title,
  description,
  users,
  roleColor,
  onEdit,
  onDelete,
}) {

  return (

    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">


      {/* TABLE HEADER */}

      <div className="border-b border-slate-200 px-6 py-5">

        <h2 className="text-lg font-semibold text-slate-900">
          {title}
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          {description}
        </p>

      </div>


      {/* TABLE */}

      <div className="overflow-x-auto">

        <table className="min-w-full text-sm">

          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">

            <tr>

              <th className="px-6 py-4 font-semibold">
                Name
              </th>

              <th className="px-6 py-4 font-semibold">
                Email
              </th>

              <th className="px-6 py-4 font-semibold">
                Age
              </th>

              <th className="px-6 py-4 font-semibold">
                Gender
              </th>

              <th className="px-6 py-4 font-semibold">
                Location
              </th>

              <th className="px-6 py-4 font-semibold">
                Role
              </th>

              <th className="px-6 py-4 text-right font-semibold">
                Actions
              </th>

            </tr>

          </thead>


          <tbody className="divide-y divide-slate-100">

            {users.map((user) => (

              <tr
                key={user.id}
                className="transition hover:bg-slate-50"
              >


                {/* NAME */}

                <td className="px-6 py-4">

                  <div className="flex items-center gap-3">

                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-700">

                      {user.name
                        ?.charAt(0)
                        ?.toUpperCase()}

                    </div>

                    <div>

                      <p className="font-medium text-slate-900">
                        {user.name}
                      </p>

                      <p className="text-xs text-slate-400">
                        User #{user.id}
                      </p>

                    </div>

                  </div>

                </td>


                {/* EMAIL */}

                <td className="px-6 py-4 text-slate-600">
                  {user.email}
                </td>


                {/* AGE */}

                <td className="px-6 py-4 text-slate-600">
                  {user.age ?? "—"}
                </td>


                {/* GENDER */}

                <td className="px-6 py-4 text-slate-600">
                  {user.gender || "—"}
                </td>


                {/* LOCATION */}

                <td className="px-6 py-4 text-slate-600">
                  {user.location || "—"}
                </td>


                {/* ROLE */}

                <td className="px-6 py-4">

                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${roleColor}`}
                  >
                    {user.role}
                  </span>

                </td>


                {/* ACTIONS */}

                <td className="px-6 py-4">

                  <div className="flex justify-end gap-2">


                    {/* EDIT */}

                    <button
                      onClick={() =>
                        onEdit(user)
                      }
                      className="cursor-pointer rounded-lg p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
                      title="Edit user"
                    >

                      <Pencil size={16} />

                    </button>


                    {/* DELETE */}

                    <button
                      onClick={() =>
                        onDelete(user)
                      }
                      className="cursor-pointer rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                      title="Delete user"
                    >

                      <Trash2 size={16} />

                    </button>

                  </div>

                </td>

              </tr>

            ))}


            {/* EMPTY */}

            {users.length === 0 && (

              <tr>

                <td
                  colSpan="7"
                  className="px-6 py-10 text-center text-sm text-slate-500"
                >
                  No users found.
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}


export default UserManagement;