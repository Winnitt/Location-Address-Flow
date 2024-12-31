# Location/Address Flow Assignment

## Overview

This project implements a Location/Address Flow system where users can select and save their delivery address using geolocation and Google Maps API. The solution is built with **React** for the frontend and **Node.js** for the backend. Users can enable location services to automatically detect their current address or manually search for a specific location. Additionally, users can save, manage, and update their addresses for delivery purposes.

## Features

1. **Location Permission Request**:
   - A popup modal asks users to enable location services or manually search for an address.
   - Two buttons: "Enable Location" (requests the user's location) and "Search Manually" (lets users enter an address).

2. **Geolocation & Pin Selection**:
   - Users can enable location services or manually search for an address.
   - A map shows the selected address with a pin, which users can adjust by dragging to fine-tune their location.
   - A "Locate Me" button automatically centers the map to the user's current location.

3. **Delivery Address Form**:
   - Users can enter detailed address information such as House/Flat number, Apartment/Road/Area.
   - Addresses can be saved under categories like **Home**, **Office**, or **Friends & Family** using specific icons.

4. **Address Management**:
   - Users can manage their saved addresses (Home, Office, Friends & Family).
   - Addresses can be selected for delivery or updated/deleted as needed.
   - Users can search for recent or new addresses.

## Optional Features

- **Save as Favorite**: Users can mark frequently used locations as favorites.
- **Address Validation**: Validates the accuracy of entered address data.
- **Map Preview**: Users can see a preview of their address on the map.

## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js
- **Database**: MongoDB (to store user data and saved addresses)
- **Google Maps API**: For location search and map functionalities

## Setup Instructions

### Prerequisites

1. Ensure you have **Node.js** and **npm** installed on your machine.
2. You also need a **Google Maps API key** for map-related functionalities.

### Frontend Setup

1. Navigate to the `frontend` folder:

   ```bash
   cd location-address-flow/frontend
