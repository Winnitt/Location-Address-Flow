import React, { useState, useEffect } from "react";

function AddressForm() {
  const [house, setHouse] = useState("");
  const [road, setRoad] = useState("");
  const [area, setArea] = useState("");
  const [category, setCategory] = useState("Home");

  // Load saved addresses from localStorage when the component mounts
  useEffect(() => {
    const savedAddresses = JSON.parse(localStorage.getItem("addresses")) || [];
    console.log(savedAddresses); // Optional: check if addresses are loaded
  }, []);

  // Function to handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Get existing addresses from localStorage, or initialize an empty array if none
    const savedAddresses = JSON.parse(localStorage.getItem("addresses")) || [];

    // Create a new address object
    const newAddress = { house, road, area, category };

    // Add the new address to the saved addresses array
    savedAddresses.push(newAddress);

    // Store the updated addresses array back in localStorage
    localStorage.setItem("addresses", JSON.stringify(savedAddresses));

    // Clear the form fields after submission
    setHouse("");
    setRoad("");
    setArea("");
    setCategory("Home");

    // Optionally, notify the user that the address was saved
    alert("Address saved to localStorage!");
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px", backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>
      <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px", textAlign: "center", color: "#333" }}>Add Address</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="House"
          value={house}
          onChange={(e) => setHouse(e.target.value)}
          required
          style={{ width: "100%", padding: "12px", margin: "10px 0", border: "1px solid #ddd", borderRadius: "4px", fontSize: "16px" }}
        />
        <input
          type="text"
          placeholder="Road"
          value={road}
          onChange={(e) => setRoad(e.target.value)}
          required
          style={{ width: "100%", padding: "12px", margin: "10px 0", border: "1px solid #ddd", borderRadius: "4px", fontSize: "16px" }}
        />
        <input
          type="text"
          placeholder="Area"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          required
          style={{ width: "100%", padding: "12px", margin: "10px 0", border: "1px solid #ddd", borderRadius: "4px", fontSize: "16px" }}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ width: "100%", padding: "12px", margin: "10px 0", border: "1px solid #ddd", borderRadius: "4px", fontSize: "16px" }}
        >
          <option value="Home">Home</option>
          <option value="Office">Office</option>
          <option value="Friends & Family">Friends & Family</option>
        </select>
        <button
          type="submit"
          style={{ width: "100%", padding: "14px", backgroundColor: "#fc8019", color: "#fff", border: "none", borderRadius: "4px", fontSize: "18px", cursor: "pointer" }}
        >
          Save Address
        </button>
      </form>
    </div>
  );
}

export default AddressForm;
