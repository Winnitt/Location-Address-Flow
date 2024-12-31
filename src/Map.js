import React, { useEffect, useRef, useState } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

function Map({ onBack }) {
  const mapRef = useRef(null);
  const [center, setCenter] = useState({ lat: 37.7749, lng: -122.4194 });
  const [address, setAddress] = useState("");
  const [markerPosition, setMarkerPosition] = useState({ lat: 37.7749, lng: -122.4194 });
  const [errorMessage, setErrorMessage] = useState("");
  const [infoWindowVisible, setInfoWindowVisible] = useState(false);


  const handleLocateMe = () => {
    setErrorMessage("");

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCenter(userLocation);
          setMarkerPosition(userLocation);
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              setErrorMessage("Location permission denied. Please enable location services.");
              break;
            case error.POSITION_UNAVAILABLE:
              setErrorMessage("Location information is unavailable. Please try again.");
              break;
            case error.TIMEOUT:
              setErrorMessage("The request to get your location timed out. Please try again.");
              break;
            default:
              setErrorMessage("An unknown error occurred. Please try again.");
              break;
          }
        }
      );
    } else {
      setErrorMessage("Geolocation is not supported by this browser.");
    }
  };


  const handleAddressSearch = () => {
    setErrorMessage("");

    if (address.trim() !== "") {
      const geocoder = new window.google.maps.Geocoder();


      geocoder.geocode({ address: address }, (results, status) => {
        if (status === window.google.maps.GeocoderStatus.OK) {
          const location = results[0].geometry.location;
          setCenter({ lat: location.lat(), lng: location.lng() });
          setMarkerPosition({ lat: location.lat(), lng: location.lng() });
        } else if (status === window.google.maps.GeocoderStatus.ZERO_RESULTS) {
          setErrorMessage("No results found for the entered address. Please check the address and try again.");
        } else {
          setErrorMessage("Unable to geocode the address. Please try again later.");
        }
      });
    } else {
      setErrorMessage("Please enter an address.");
    }
  };


  useEffect(() => {
    if (mapRef.current && window.google) {
      const map = mapRef.current.state.map;


      const marker = new window.google.maps.Marker({
        position: markerPosition,
        map,
        draggable: true,
        title: "Drag me!",
      });


      marker.addListener("dragend", () => {
        const newPosition = marker.getPosition();
        setMarkerPosition({
          lat: newPosition.lat(),
          lng: newPosition.lng(),
        });
        setInfoWindowVisible(true);
      });
    }
  }, [markerPosition]);

  const styles = {
    container: {
      fontFamily: "Arial, sans-serif",
      maxWidth: "800px",
      margin: "0 auto",
      padding: "20px",
      textAlign: "center",
    },
    mapWrapper: {
      marginTop: "20px",
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
      backgroundColor: "#fc8019", // Swiggy's primary orange color
      color: "#fff",
    },
    secondaryButton: {
      backgroundColor: "#f4f4f4",
      color: "#333",
    },
    inputWrapper: {
      marginBottom: "10px",
    },
    input: {
      padding: "10px",
      fontSize: "16px",
      width: "80%",
      marginRight: "10px",
    },
    errorMessage: {
      color: "red",
      fontSize: "14px",
      marginTop: "10px",
    },
  };

  return (
    <div style={styles.container}>

      <button
        onClick={handleLocateMe}
        style={{ ...styles.button, ...styles.primaryButton }}
      >
        Locate Me
      </button>

      {}
      <div style={styles.inputWrapper}>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter an address"
          style={styles.input}
        />
        <button
          onClick={handleAddressSearch}
          style={{ ...styles.button, ...styles.primaryButton }}
        >
          Search
        </button>
      </div>

      {}
      {errorMessage && <div style={styles.errorMessage}>{errorMessage}</div>}

      <div style={styles.mapWrapper}>
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={15}
            onLoad={(map) => {
              mapRef.current = { state: { map } };
            }}
          >
            <Marker position={markerPosition} draggable={true}>
              {infoWindowVisible && (
                <InfoWindow position={markerPosition}>
                  <div>
                    <h4>Marker Position</h4>
                    <p>Latitude: {markerPosition.lat}</p>
                    <p>Longitude: {markerPosition.lng}</p>
                  </div>
                </InfoWindow>
              )}
            </Marker>
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
}

export default Map;
