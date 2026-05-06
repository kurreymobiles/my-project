import { useState } from "react";

function Trail() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Empty field validation
    if (
      form.name === "" ||
      form.email === "" ||
      form.password === ""
    ) {
      setSuccess("");
      setError("All fields required");
      return;
    }

    // Password validation
    if (form.password.length < 6) {
      setSuccess("");
      setError("Password must be more than 6 digit");
      return;
    }

    // Email validation
    if (!form.email.includes("@")) {
      setSuccess("");
      setError("Invalid email");
      return;
    }

    // Success
    setError("");
    setSuccess("Login Successful");
  }

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>

        {/* Error Message */}
        {error && (
          <p style={{ color: "red" }}>
            {error}
          </p>
        )}

        {/* Success Message */}
        {success && (
          <p style={{ color: "green" }}>
            {success}
          </p>
        )}

        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          onChange={handleChange}
        />

        <br />
        <br />

        <button type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default Trail;