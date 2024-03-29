"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "../dashboard/(entities)/user";

const LoginPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (User.getCurrentUserRole() !== null) {
      router.push("/dashboard");
    }
  }, []);
  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent the default form submission behavior
    const params = {
      username: username,
      password: password,
    };
    const res = await fetch(`/api/auth`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(params),
    });
    const data: { res: { id: String; role: String } } = await res.json();
    if (username.trim() === "") {
      alert("Username is required");
      return;
    }
    if (password.trim() === "") {
      alert("Password is required");
      return;
    }
    setUsername("");
    setPassword("");
    User.setCurrentUserRole(data.res.role);
    User.setCurrentUserId(data.res.id);
    data.res === undefined ? console.log("failed") : router.push("/dashboard");
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white w-80 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
              placeholder="Enter your username"
              value={username}
              onChange={handleUsernameChange}
              autoComplete="username"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
              autoComplete="current-password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
