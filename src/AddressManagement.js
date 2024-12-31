import React, { useState, useEffect } from "react";

function AddressManagement() {
  const [addresses, setAddresses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAddress, setSelectedAddress] = useState(null);


  useEffect(() => {
    const savedAddresses = JSON.parse(localStorage.getItem("addresses")) || [];
    setAddresses(savedAddresses);
  }, []);


  const handleSelectAddress = (address) => {
    setSelectedAddress(address);
    alert(`Selected Address: ${address.house}, ${address.road}, ${address.area}`);
  };


  const handleDeleteAddress = (index) => {
    const updatedAddresses = [...addresses];
    updatedAddresses.splice(index, 1);
    localStorage.setItem("addresses", JSON.stringify(updatedAddresses));
    setAddresses(updatedAddresses);
  };


  const filteredAddresses = addresses.filter((address) =>
    address.house.toLowerCase().includes(searchTerm.toLowerCase()) ||
    address.road.toLowerCase().includes(searchTerm.toLowerCase()) ||
    address.area.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px", backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>
      <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px", textAlign: "center", color: "#333" }}>Manage Addresses</h2>

      {}
      <input
        type="text"
        placeholder="Search addresses..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ width: "100%", padding: "12px", margin: "10px 0", border: "1px solid #ddd", borderRadius: "4px", fontSize: "16px" }}
      />

      {}
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
        <thead>
          <tr>
            <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>House</th>
            <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>Road</th>
            <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>Area</th>
            <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>Category</th>
            <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredAddresses.length > 0 ? (
            filteredAddresses.map((address, index) => (
              <tr key={index}>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{address.house}</td>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{address.road}</td>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{address.area}</td>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{address.category}</td>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                  <button
                    onClick={() => handleSelectAddress(address)}
                    style={{ backgroundColor: "#fc8019", color: "#fff", border: "none", padding: "8px", borderRadius: "4px", cursor: "pointer", marginRight: "8px" }}
                  >
                    Select
                  </button>
                  <button
                    onClick={() => handleDeleteAddress(index)}
                    style={{ backgroundColor: "#e74c3c", color: "#fff", border: "none", padding: "8px", borderRadius: "4px", cursor: "pointer" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ padding: "10px", textAlign: "center" }}>No addresses found</td>
            </tr>
          )}
        </tbody>
      </table>

      {}
      {selectedAddress && (
        <div style={{ marginTop: "20px", backgroundColor: "#f9f9f9", padding: "10px", borderRadius: "8px", border: "1px solid #ddd" }}>
          <h3>Selected Address for Delivery</h3>
          <p><strong>House:</strong> {selectedAddress.house}</p>
          <p><strong>Road:</strong> {selectedAddress.road}</p>
          <p><strong>Area:</strong> {selectedAddress.area}</p>
          <p><strong>Category:</strong> {selectedAddress.category}</p>
        </div>
      )}
    </div>
  );
}

export default AddressManagement;
