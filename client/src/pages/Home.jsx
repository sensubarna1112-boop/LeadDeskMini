import { useState } from "react";
import api from "../services/api";

function Home() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    budget: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.email ||
      !form.budget ||
      !form.message
    ) {
      alert("Please fill all fields.");
      return;
    }

    try {
      await api.post("/leads", form);

      alert("Lead submitted successfully!");

      setForm({
        name: "",
        email: "",
        budget: "",
        message: "",
      });
    } catch (err) {
      console.log("Error:", err);
      console.log("Response:", err.response);
      console.log("Data:", err.response?.data);
      

    alert("Submission failed.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-5">
      <h1 className="text-5xl font-bold text-blue-700">
        LeadDesk Mini
      </h1>

      <p className="mt-3 text-gray-600">
        Capture your leads easily.
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8 mt-8 w-full max-w-lg"
      >
        <input
          className="w-full border p-3 rounded mb-4"
          placeholder="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          className="w-full border p-3 rounded mb-4"
          placeholder="Email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          className="w-full border p-3 rounded mb-4"
          placeholder="Budget"
          type="number"
          name="budget"
          value={form.budget}
          onChange={handleChange}
        />

        <textarea
          className="w-full border p-3 rounded mb-4"
          placeholder="Message"
          rows="4"
          name="message"
          value={form.message}
          onChange={handleChange}
        />

        <button
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>

      <footer className="mt-8 text-sm">
        Built for{" "}
        <a
          href="https://digitalheroesco.com"
          target="_blank"
          rel="noreferrer"
          className="text-blue-600 underline"
        >
          Digital Heroes Training Task
        </a>
      </footer>
    </div>
  );
}

export default Home;