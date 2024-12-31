import React, { useState } from "react";
import Map from "./Map";
import AddressForm from "./AddressForm";
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";
import AddressManagement from "./AddressManagement";

function App() {
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const [showMap, setShowMap] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [sliderChecked, setSliderChecked] = useState(false);
  const [showAddressManagement, setShowAddressManagement] = useState(false);


  const handleEnableLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("User's location: ", position.coords);
          setLocationEnabled(true);
          setShowModal(false);
          setShowMap(true);
        },
        (error) => {
          alert("Location permission denied.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };


  const handleSignUp = () => {
    setShowSignUp(true);
    setShowLogin(false);
    setShowMap(false);
    setShowModal(false);
  };


  const handleLogin = () => {
    setShowLogin(true);
    setShowSignUp(false);
    setShowMap(false);
    setShowModal(false);
  };


  const handleManageAddresses = () => {
    setShowAddressManagement(true);
    setShowSignUp(false);
    setShowLogin(false);
    setShowMap(false);
    setShowModal(false);
  };


  const handleBack = () => {
    setShowSignUp(false);
    setShowLogin(false);
    setShowMap(false);
    setShowAddressManagement(false);  // Reset Address Management view
    setShowModal(true); // Go back to modal
  };


  const handleSliderChange = () => {
    setSliderChecked(!sliderChecked);
  };


  const handleSubmit = () => {
    if (sliderChecked) {
      alert("Form submitted successfully!");
    } else {
      alert("Please check the slider to proceed.");
    }
  };

  const styles = {
    container: {
      fontFamily: "Arial, sans-serif",
      maxWidth: "800px",
      margin: "0 auto",
      padding: "20px",
      textAlign: "center",
    },
    modal: {
      border: "1px solid #ddd",
      borderRadius: "8px",
      padding: "20px",
      backgroundColor: "#fff",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      marginBottom: "20px",
    },
    button: {
      padding: "10px 20px",
      margin: "10px",
      borderRadius: "5px",
      border: "none",
      fontSize: "16px",
      cursor: "pointer",
    },
    primaryButton: {
      backgroundColor: "#fc8019",
      color: "#fff",
    },
    secondaryButton: {
      backgroundColor: "#f4f4f4",
      color: "#333",
    },
    card: {
      border: "1px solid #ddd",
      borderRadius: "8px",
      padding: "20px",
      backgroundColor: "#f9f9f9",
      width: "100%",
      maxWidth: "400px",
      margin: "0 auto",
    },
    sliderContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      margin: "20px 0",
    },
  };

  return (
    <div style={styles.container}>
      <h1>Location Selection</h1>

      {}
      {showModal && (
        <div style={styles.modal}>
          <h2>Enable Location</h2>
          <p>Please enable location services or search manually.</p>
          <button
            onClick={handleEnableLocation}
            style={{ ...styles.button, ...styles.primaryButton }}
          >
            Enable Location
          </button>
          <button
            onClick={() => setShowMap(true)}
            style={{ ...styles.button, ...styles.secondaryButton }}
          >
            Search Manually
          </button>
          <button
            onClick={handleSignUp}
            style={{ ...styles.button, ...styles.primaryButton }}
          >
            Sign Up
          </button>
          <button
            onClick={handleLogin}
            style={{ ...styles.button, ...styles.secondaryButton }}
          >
            Log In
          </button>
          <button
            onClick={handleManageAddresses}
            style={{ ...styles.button, ...styles.primaryButton }}
          >
            Manage Addresses
          </button>
        </div>
      )}

      {}
      {showSignUp && (
        <div style={styles.card}>
          <h2>Sign Up</h2>
          <SignUpForm />
          <div style={styles.sliderContainer}>
            <label>I agree to the terms</label>
            <input type="checkbox" checked={sliderChecked} onChange={handleSliderChange} />
          </div>
          <button
            onClick={handleSubmit}
            disabled={!sliderChecked}
            style={{
              ...styles.button,
              ...styles.primaryButton,
              opacity: sliderChecked ? 1 : 0.5,
            }}
          >
            Submit
          </button>
          <button
            onClick={handleBack}
            style={{ ...styles.button, ...styles.secondaryButton }}
          >
            Back
          </button>
        </div>
      )}

      {}
      {showLogin && (
        <div style={styles.card}>
          <h2>Log In</h2>
          <LoginForm />
          <div style={styles.sliderContainer}>
            <label>Remember me</label>
            <input type="checkbox" checked={sliderChecked} onChange={handleSliderChange} />
          </div>
          <button
            onClick={handleSubmit}
            disabled={!sliderChecked}
            style={{
              ...styles.button,
              ...styles.primaryButton,
              opacity: sliderChecked ? 1 : 0.5,
            }}
          >
            Submit
          </button>
          <button
            onClick={handleBack}
            style={{ ...styles.button, ...styles.secondaryButton }}
          >
            Back
          </button>
        </div>
      )}

      {}
      {showMap && (
        <>
          <Map />
          <AddressForm />
          <button
            onClick={handleBack}
            style={{ ...styles.button, ...styles.secondaryButton }}
          >
            Back
          </button>
        </>
      )}

      {}
      {showAddressManagement && (
        <>
          <AddressManagement />
          <button
            onClick={handleBack}
            style={{ ...styles.button, ...styles.secondaryButton }}
          >
            Back
          </button>
        </>
      )}
    </div>
  );
}

export default App;
