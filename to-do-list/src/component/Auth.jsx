import React, { useState } from "react";

export default function Auth({ setCurrentUser }) {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (isRegister) {
      const alreadyUser = users.find(u => u.email === email);
      if (alreadyUser) {
        alert("User already exists");
        return;
      }

      const newUser = { name, email, password, tasks: [] };
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("currentUser", JSON.stringify(newUser));      
      setCurrentUser(newUser);
    } 
    else {
      const user = users.find(
        u => u.email === email && u.password === password
      );

      if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        setCurrentUser(user);
      } else {
        alert("Invalid credentials");
      }
    }
  };

  return (
    <div className="auth-container">
      
      <h2>
        {isRegister ? " 📋 Register " : "  📋 Login "}
      </h2>

      <form onSubmit={handleSubmit}>

        {isRegister && (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        <button type="submit">
          {isRegister ? "Register" : "Login"}
        </button>

      </form>

      <p>
        {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
        <span onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? "Login" : "Register"}
        </span>
      </p>

    </div>
  );
}
