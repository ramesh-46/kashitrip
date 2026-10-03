import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api";

function Trip() {
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const [showEdit, setShowEdit] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const [form, setForm] = useState({
    tripName: "",
    startDate: "",
    endDate: "",
    checkInDate: "",
    checkOutDate: "",
    hotelName: "",
    hotelLocation: "",
    checkInTime: "",
    checkOutTime: "",
    travelDetails: "",
    notes: "",
    budget: "",
    status: "Planning",
  });

  const places = [
    {
      id: 1,
      name: "Kashi Vishwanath Temple",
      image:
        "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1000&q=80",
      distance: "0 km",
      location: "Vishwanath Gali, Varanasi",
      time: "5:00 AM - 11:00 PM",
      duration: "1-2 hours",
      description:
        "One of the most important Shiva temples in Varanasi. The temple is located near the Ganga and is a major spiritual destination.",
    },
    {
      id: 2,
      name: "Dashashwamedh Ghat",
      image:
        "https://images.unsplash.com/photo-1561359313-0639aad49ca6?auto=format&fit=crop&w=1000&q=80",
      distance: "1.5 km",
      location: "Dashashwamedh Ghat, Varanasi",
      time: "Open throughout the day",
      duration: "1-2 hours",
      description:
        "A famous Ghat on the Ganges known for the spectacular evening Ganga Aarti and beautiful river views.",
    },
    {
      id: 3,
      name: "Assi Ghat",
      image:
        "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1000&q=80",
      distance: "4.5 km",
      location: "Assi Ghat, Varanasi",
      time: "Open throughout the day",
      duration: "1-2 hours",
      description:
        "A peaceful riverside location popular for sunrise views, morning activities and relaxing near the Ganga.",
    },
    {
      id: 4,
      name: "Ganga Aarti",
      image:
        "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=1000&q=80",
      distance: "1.5 km",
      location: "Dashashwamedh Ghat",
      time: "Evening around sunset",
      duration: "1 hour",
      description:
        "A beautiful evening spiritual ceremony performed on the banks of the Ganga with lamps, prayers and devotional music.",
    },
  ];

  useEffect(() => {
    loadTrip();
  }, []);

  const loadTrip = async () => {
    try {
      setLoading(true);

      const response = await axios.get(`${API}/trip`);

      const data = response.data.data || response.data;

      setTrip(data);

      setForm({
        tripName: data.tripName || "",
        startDate: data.startDate
          ? data.startDate.substring(0, 10)
          : "",
        endDate: data.endDate
          ? data.endDate.substring(0, 10)
          : "",
        checkInDate: data.checkInDate
          ? data.checkInDate.substring(0, 10)
          : "",
        checkOutDate: data.checkOutDate
          ? data.checkOutDate.substring(0, 10)
          : "",
        hotelName: data.hotelName || "",
        hotelLocation: data.hotelLocation || "",
        checkInTime: data.checkInTime || "",
        checkOutTime: data.checkOutTime || "",
        travelDetails: data.travelDetails || "",
        notes: data.notes || "",
        budget: data.budget || "",
        status: data.status || "Planning",
      });
    } catch (error) {
      console.error(error);

      setMessage(
        error.response?.data?.message ||
          "Unable to load trip details."
      );
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 700);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setMessage("");

      const response = await axios.put(`${API}/trip`, {
        ...form,
        budget: Number(form.budget) || 0,
      });

      const updatedTrip =
        response.data.data || response.data;

      setTrip(updatedTrip);

      setForm({
        tripName: updatedTrip.tripName || "",
        startDate: updatedTrip.startDate
          ? updatedTrip.startDate.substring(0, 10)
          : "",
        endDate: updatedTrip.endDate
          ? updatedTrip.endDate.substring(0, 10)
          : "",
        checkInDate: updatedTrip.checkInDate
          ? updatedTrip.checkInDate.substring(0, 10)
          : "",
        checkOutDate: updatedTrip.checkOutDate
          ? updatedTrip.checkOutDate.substring(0, 10)
          : "",
        hotelName: updatedTrip.hotelName || "",
        hotelLocation: updatedTrip.hotelLocation || "",
        checkInTime: updatedTrip.checkInTime || "",
        checkOutTime: updatedTrip.checkOutTime || "",
        travelDetails: updatedTrip.travelDetails || "",
        notes: updatedTrip.notes || "",
        budget: updatedTrip.budget || "",
        status: updatedTrip.status || "Planning",
      });

      setShowEdit(false);
      setMessage("Trip details updated successfully.");

      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error) {
      console.error(error);

      setMessage(
        error.response?.data?.message ||
          "Unable to save trip details."
      );
    } finally {
      setSaving(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "Not added";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <>
        <style>{styles}</style>

        <div className="trip-loader-page">
          <div className="trip-loader">
            <div className="loader-circle"></div>

            <div className="loader-title">
              Preparing Your Yatra
            </div>

            <div className="loader-subtitle">
              Loading Kashi trip details...
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{styles}</style>

      <div className="trip-page">

        {/* HEADER */}
        <section className="trip-hero">
          <div>
            <div className="hero-small">
              KASHI YATRA
            </div>

            <h1>
              {trip?.tripName || "Kashi Yatra"}
            </h1>

            <p>
              Your complete journey details, stay information
              and memorable places in one place.
            </p>
          </div>

          <div className="hero-status">
            <span
              className={`status-dot ${
                trip?.status === "Completed"
                  ? "completed"
                  : ""
              }`}
            ></span>

            {trip?.status || "Planning"}
          </div>
        </section>

        {/* MESSAGE */}
        {message && (
          <div className="success-message">
            <span>✓</span>
            {message}
          </div>
        )}

        {/* TRIP OVERVIEW */}
        <section className="section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">
                JOURNEY
              </span>

              <h2>Trip Overview</h2>
            </div>

            <button
              className="edit-button"
              onClick={() => {
                setShowEdit((prev) => !prev);

                if (!showEdit) {
                  window.scrollTo({
                    top: document.body.scrollHeight,
                    behavior: "smooth",
                  });
                }
              }}
            >
              {showEdit ? "Close Edit" : "Edit Trip"}
            </button>
          </div>

          <div className="overview-grid">

            <div className="info-card large">
              <div className="card-icon">🗓️</div>

              <div>
                <span>Travel Dates</span>

                <strong>
                  {formatDate(trip?.startDate)}
                </strong>

                <small>
                  to {formatDate(trip?.endDate)}
                </small>
              </div>
            </div>

            <div className="info-card">
              <div className="card-icon">🏨</div>

              <div>
                <span>Hotel</span>

                <strong>
                  {trip?.hotelName || "Not added"}
                </strong>

                <small>
                  {trip?.hotelLocation ||
                    "Location not added"}
                </small>
              </div>
            </div>

            <div className="info-card">
              <div className="card-icon">💰</div>

              <div>
                <span>Budget</span>

                <strong>
                  ₹
                  {Number(
                    trip?.budget || 0
                  ).toLocaleString("en-IN")}
                </strong>

                <small>Estimated trip budget</small>
              </div>
            </div>

            <div className="info-card">
              <div className="card-icon">🛎️</div>

              <div>
                <span>Check In</span>

                <strong>
                  {formatDate(trip?.checkInDate)}
                </strong>

                <small>
                  {trip?.checkInTime ||
                    "Time not added"}
                </small>
              </div>
            </div>

            <div className="info-card">
              <div className="card-icon">🚪</div>

              <div>
                <span>Check Out</span>

                <strong>
                  {formatDate(trip?.checkOutDate)}
                </strong>

                <small>
                  {trip?.checkOutTime ||
                    "Time not added"}
                </small>
              </div>
            </div>

          </div>
        </section>

        {/* TRAVEL DETAILS */}
        <section className="section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">
                PLAN
              </span>

              <h2>Travel Details</h2>
            </div>
          </div>

          <div className="detail-box">
            <div className="detail-item">
              <span>🚆 Travel</span>

              <p>
                {trip?.travelDetails ||
                  "Travel details not added yet."}
              </p>
            </div>

            <div className="detail-item">
              <span>📝 Notes</span>

              <p>
                {trip?.notes ||
                  "No additional notes added."}
              </p>
            </div>
          </div>
        </section>

        {/* PLACES */}
        <section className="section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">
                DISCOVER
              </span>

              <h2>Places & Moments</h2>

              <p className="section-description">
                Tap any place to view more information.
              </p>
            </div>
          </div>

          <div className="places-grid">
            {places.map((place, index) => (
              <div
                className="place-card"
                key={place.id}
                onClick={() =>
                  setSelectedPlace(place)
                }
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div className="place-image-wrapper">
                  <img
                    src={place.image}
                    alt={place.name}
                  />

                  <div className="image-overlay">
                    <span>
                      View Details
                    </span>
                  </div>

                  <div className="place-number">
                    0{index + 1}
                  </div>
                </div>

                <div className="place-content">
                  <h3>{place.name}</h3>

                  <p>
                    {place.location}
                  </p>

                  <div className="place-footer">
                    <span>
                      📍 {place.distance}
                    </span>

                    <span>
                      🕐 {place.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* EDIT FORM */}
        {showEdit && (
          <section className="section edit-section">
            <div className="section-heading">
              <div>
                <span className="eyebrow">
                  SETTINGS
                </span>

                <h2>Edit Trip</h2>

                <p className="section-description">
                  Update your Kashi journey information.
                </p>
              </div>
            </div>

            <form
              className="edit-form"
              onSubmit={handleSave}
            >
              <div className="form-grid">

                <div className="form-group full">
                  <label>Trip Name</label>

                  <input
                    type="text"
                    name="tripName"
                    value={form.tripName}
                    onChange={handleChange}
                    placeholder="Kashi Yatra"
                  />
                </div>

                <div className="form-group">
                  <label>Start Date</label>

                  <input
                    type="date"
                    name="startDate"
                    value={form.startDate}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>End Date</label>

                  <input
                    type="date"
                    name="endDate"
                    value={form.endDate}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Check In Date</label>

                  <input
                    type="date"
                    name="checkInDate"
                    value={form.checkInDate}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Check Out Date</label>

                  <input
                    type="date"
                    name="checkOutDate"
                    value={form.checkOutDate}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Hotel Name</label>

                  <input
                    type="text"
                    name="hotelName"
                    value={form.hotelName}
                    onChange={handleChange}
                    placeholder="Hotel name"
                  />
                </div>

                <div className="form-group">
                  <label>Hotel Location</label>

                  <input
                    type="text"
                    name="hotelLocation"
                    value={form.hotelLocation}
                    onChange={handleChange}
                    placeholder="Hotel location"
                  />
                </div>

                <div className="form-group">
                  <label>Check In Time</label>

                  <input
                    type="text"
                    name="checkInTime"
                    value={form.checkInTime}
                    onChange={handleChange}
                    placeholder="Example: 12:00 PM"
                  />
                </div>

                <div className="form-group">
                  <label>Check Out Time</label>

                  <input
                    type="text"
                    name="checkOutTime"
                    value={form.checkOutTime}
                    onChange={handleChange}
                    placeholder="Example: 10:00 AM"
                  />
                </div>

                <div className="form-group">
                  <label>Budget</label>

                  <input
                    type="number"
                    name="budget"
                    value={form.budget}
                    onChange={handleChange}
                    min="0"
                    placeholder="5000"
                  />
                </div>

                <div className="form-group">
                  <label>Status</label>

                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                  >
                    <option value="Planning">
                      Planning
                    </option>

                    <option value="Upcoming">
                      Upcoming
                    </option>

                    <option value="Ongoing">
                      Ongoing
                    </option>

                    <option value="Completed">
                      Completed
                    </option>
                  </select>
                </div>

                <div className="form-group full">
                  <label>Travel Details</label>

                  <textarea
                    name="travelDetails"
                    value={form.travelDetails}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Train, bus, departure time, ticket details..."
                  />
                </div>

                <div className="form-group full">
                  <label>Notes</label>

                  <textarea
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Important trip notes..."
                  />
                </div>

              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() =>
                    setShowEdit(false)
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-button"
                  disabled={saving}
                >
                  {saving
                    ? "Saving..."
                    : "Save Trip"}
                </button>
              </div>
            </form>
          </section>
        )}

      </div>

      {/* PLACE POPUP */}
      {selectedPlace && (
        <div
          className="modal-backdrop"
          onClick={() =>
            setSelectedPlace(null)
          }
        >
          <div
            className="place-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <button
              className="modal-close"
              onClick={() =>
                setSelectedPlace(null)
              }
            >
              ×
            </button>

            <img
              className="modal-image"
              src={selectedPlace.image}
              alt={selectedPlace.name}
            />

            <div className="modal-body">
              <span className="modal-eyebrow">
                KASHI MOMENT
              </span>

              <h2>
                {selectedPlace.name}
              </h2>

              <p className="modal-description">
                {selectedPlace.description}
              </p>

              <div className="modal-info">

                <div>
                  <span>📍 Distance</span>
                  <strong>
                    {selectedPlace.distance}
                  </strong>
                </div>

                <div>
                  <span>🗺️ Location</span>
                  <strong>
                    {selectedPlace.location}
                  </strong>
                </div>

                <div>
                  <span>🕐 Time</span>
                  <strong>
                    {selectedPlace.time}
                  </strong>
                </div>

                <div>
                  <span>⏳ Visit Duration</span>
                  <strong>
                    {selectedPlace.duration}
                  </strong>
                </div>

              </div>

              <button
                className="modal-done"
                onClick={() =>
                  setSelectedPlace(null)
                }
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const styles = `
* {
  box-sizing: border-box;
}

.trip-page {
  min-height: 100vh;
  background:
    radial-gradient(
      circle at top right,
      #f3f3f3 0,
      transparent 35%
    ),
    #ffffff;
  color: #111;
  padding-bottom: 70px;
  animation: pageIn 0.55s ease;
}

.trip-loader-page {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
}

.trip-loader {
  text-align: center;
}

.loader-circle {
  width: 55px;
  height: 55px;
  border-radius: 50%;
  border: 4px solid #e8e8e8;
  border-top-color: #111;
  margin: 0 auto 22px;
  animation: loaderSpin 0.9s linear infinite;
}

.loader-title {
  font-size: 21px;
  font-weight: 800;
  letter-spacing: -0.4px;
}

.loader-subtitle {
  margin-top: 7px;
  color: #777;
  font-size: 14px;
}

.trip-hero {
  margin: 25px auto 0;
  width: min(1180px, calc(100% - 30px));
  min-height: 300px;
  padding: 55px;
  border-radius: 28px;
  background:
    linear-gradient(
      135deg,
      #111 0%,
      #222 60%,
      #000 100%
    );
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  box-shadow: 0 25px 70px rgba(0,0,0,0.14);
  overflow: hidden;
  position: relative;
}

.trip-hero::after {
  content: "";
  position: absolute;
  width: 300px;
  height: 300px;
  right: -100px;
  top: -120px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.12);
  box-shadow:
    0 0 0 40px rgba(255,255,255,0.025),
    0 0 0 80px rgba(255,255,255,0.02);
}

.hero-small {
  font-size: 11px;
  letter-spacing: 3px;
  opacity: 0.55;
  font-weight: 700;
  margin-bottom: 14px;
}

.trip-hero h1 {
  font-size: clamp(38px, 6vw, 68px);
  line-height: 1;
  margin: 0;
  letter-spacing: -3px;
}

.trip-hero p {
  max-width: 600px;
  color: #c7c7c7;
  margin: 20px 0 0;
  line-height: 1.7;
  font-size: 15px;
}

.hero-status {
  border: 1px solid rgba(255,255,255,0.18);
  background: rgba(255,255,255,0.07);
  backdrop-filter: blur(10px);
  border-radius: 999px;
  padding: 12px 17px;
  font-size: 13px;
  white-space: nowrap;
  z-index: 2;
}

.status-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  background: #fff;
  border-radius: 50%;
  margin-right: 8px;
  animation: loaderPulse 1.5s infinite;
}

.status-dot.completed {
  animation: none;
}

.section {
  width: min(1180px, calc(100% - 30px));
  margin: 70px auto 0;
}

.section-heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 25px;
}

.eyebrow {
  display: block;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 2.5px;
  color: #999;
  margin-bottom: 8px;
}

.section-heading h2 {
  margin: 0;
  font-size: 31px;
  letter-spacing: -1.3px;
}

.section-description {
  color: #777;
  margin: 8px 0 0;
  font-size: 14px;
}

.edit-button {
  border: 1px solid #111;
  background: #111;
  color: #fff;
  padding: 12px 19px;
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: 0.25s;
}

.edit-button:hover {
  background: #fff;
  color: #111;
  transform: translateY(-2px);
}

.success-message {
  width: min(1180px, calc(100% - 30px));
  margin: 20px auto -35px;
  padding: 13px 17px;
  background: #111;
  color: #fff;
  border-radius: 12px;
  font-size: 14px;
  animation: cardIn 0.35s ease;
}

.success-message span {
  margin-right: 8px;
}

.overview-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
}

.info-card {
  min-height: 145px;
  border: 1px solid #e9e9e9;
  background: #fff;
  border-radius: 18px;
  padding: 22px;
  display: flex;
  gap: 15px;
  align-items: flex-start;
  box-shadow: 0 8px 30px rgba(0,0,0,0.035);
  transition: 0.25s;
  animation: cardIn 0.5s ease both;
}

.info-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 18px 40px rgba(0,0,0,0.08);
}

.info-card.large {
  grid-column: span 2;
}

.card-icon {
  width: 42px;
  height: 42px;
  min-width: 42px;
  border-radius: 12px;
  background: #f4f4f4;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 19px;
}

.info-card span {
  display: block;
  color: #999;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.info-card strong {
  display: block;
  margin-top: 7px;
  font-size: 17px;
  line-height: 1.35;
}

.info-card small {
  display: block;
  margin-top: 5px;
  color: #777;
  font-size: 12px;
  line-height: 1.5;
}

.detail-box {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.detail-item {
  border-radius: 18px;
  border: 1px solid #e9e9e9;
  padding: 25px;
  background: #fafafa;
}

.detail-item span {
  font-size: 12px;
  font-weight: 800;
}

.detail-item p {
  color: #666;
  line-height: 1.7;
  margin: 12px 0 0;
  font-size: 14px;
  white-space: pre-wrap;
}

.places-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
}

.place-card {
  border: 1px solid #e7e7e7;
  background: #fff;
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 8px 30px rgba(0,0,0,0.04);
  animation: cardIn 0.55s ease both;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.place-card:hover {
  transform: translateY(-7px);
  box-shadow: 0 22px 50px rgba(0,0,0,0.11);
}

.place-image-wrapper {
  height: 235px;
  position: relative;
  overflow: hidden;
  background: #eee;
}

.place-image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.place-card:hover img {
  transform: scale(1.06);
}

.image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0,0,0,0.6),
    transparent 55%
  );
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 18px;
  opacity: 0;
  transition: 0.3s;
}

.place-card:hover .image-overlay {
  opacity: 1;
}

.image-overlay span {
  color: #fff;
  background: rgba(0,0,0,0.65);
  padding: 8px 13px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
}

.place-number {
  position: absolute;
  top: 13px;
  left: 13px;
  color: #fff;
  background: rgba(0,0,0,0.6);
  backdrop-filter: blur(8px);
  border-radius: 9px;
  padding: 7px 9px;
  font-size: 11px;
  font-weight: 800;
}

.place-content {
  padding: 18px;
}

.place-content h3 {
  font-size: 17px;
  margin: 0;
  line-height: 1.3;
}

.place-content p {
  color: #777;
  font-size: 12px;
  margin: 7px 0 14px;
}

.place-footer {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  color: #555;
  font-size: 10px;
  font-weight: 700;
}

.edit-section {
  padding-bottom: 20px;
}

.edit-form {
  border: 1px solid #e5e5e5;
  background: #fff;
  border-radius: 22px;
  padding: 28px;
  box-shadow: 0 15px 50px rgba(0,0,0,0.06);
  animation: cardIn 0.45s ease;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group.full {
  grid-column: span 2;
}

.form-group label {
  font-size: 12px;
  font-weight: 800;
  margin-bottom: 8px;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 11px;
  padding: 13px 14px;
  font-family: inherit;
  font-size: 14px;
  outline: none;
  background: #fff;
  transition: 0.2s;
}

.form-group textarea {
  resize: vertical;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: #111;
  box-shadow: 0 0 0 3px rgba(0,0,0,0.05);
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 25px;
}

.cancel-button,
.save-button {
  border-radius: 11px;
  padding: 12px 19px;
  font-weight: 700;
  cursor: pointer;
  transition: 0.2s;
}

.cancel-button {
  background: #fff;
  border: 1px solid #ddd;
}

.save-button {
  background: #111;
  color: #fff;
  border: 1px solid #111;
}

.save-button:hover {
  transform: translateY(-2px);
}

.save-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* MODAL */

.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0,0,0,0.7);
  backdrop-filter: blur(7px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  animation: fadeIn 0.2s ease;
}

.place-modal {
  width: min(700px, 100%);
  max-height: 92vh;
  overflow-y: auto;
  background: #fff;
  border-radius: 24px;
  position: relative;
  overflow-x: hidden;
  box-shadow: 0 30px 100px rgba(0,0,0,0.3);
  animation: modalIn 0.3s ease;
}

.modal-close {
  position: absolute;
  top: 15px;
  right: 15px;
  z-index: 5;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 0;
  background: rgba(0,0,0,0.65);
  color: #fff;
  font-size: 26px;
  cursor: pointer;
  line-height: 1;
}

.modal-image {
  width: 100%;
  height: 300px;
  display: block;
  object-fit: cover;
}

.modal-body {
  padding: 28px;
}

.modal-eyebrow {
  font-size: 10px;
  letter-spacing: 2px;
  color: #999;
  font-weight: 800;
}

.modal-body h2 {
  margin: 8px 0 10px;
  font-size: 30px;
  letter-spacing: -1px;
}

.modal-description {
  color: #666;
  font-size: 14px;
  line-height: 1.7;
  margin: 0 0 20px;
}

.modal-info {
  border: 1px solid #eee;
  border-radius: 13px;
  padding: 15px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

.modal-info div {
  padding: 12px;
  background: #fafafa;
  border-radius: 10px;
}

.modal-info span {
  display: block;
  color: #999;
  font-size: 10px;
  font-weight: 800;
  text-transform: uppercase;
  margin-bottom: 5px;
}

.modal-info strong {
  display: block;
  font-size: 13px;
  line-height: 1.4;
}

.modal-done {
  width: 100%;
  margin-top: 18px;
  border: 0;
  background: #111;
  color: #fff;
  border-radius: 12px;
  padding: 14px;
  font-weight: 800;
  cursor: pointer;
}

@keyframes pageIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes cardIn {
  from {
    opacity: 0;
    transform: translateY(18px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes loaderSpin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes loaderPulse {
  0%, 100% {
    opacity: 0.35;
    transform: scale(0.8);
  }

  50% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes modalIn {
  from {
    opacity: 0;
    transform: translateY(25px) scale(0.97);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@media (max-width: 950px) {
  .overview-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .places-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 700px) {
  .trip-hero {
    padding: 35px 25px;
    min-height: 260px;
    flex-direction: column;
    align-items: flex-start;
  }

  .trip-hero h1 {
    font-size: 43px;
  }

  .hero-status {
    align-self: flex-start;
  }

  .section {
    margin-top: 50px;
  }

  .section-heading {
    align-items: flex-start;
    flex-direction: column;
  }

  .overview-grid {
    grid-template-columns: 1fr;
  }

  .info-card.large {
    grid-column: span 1;
  }

  .detail-box {
    grid-template-columns: 1fr;
  }

  .places-grid {
    grid-template-columns: 1fr;
  }

  .place-image-wrapper {
    height: 250px;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .form-group.full {
    grid-column: span 1;
  }

  .edit-form {
    padding: 20px;
  }

  .modal-image {
    height: 220px;
  }

  .modal-body {
    padding: 22px;
  }

  .modal-body h2 {
    font-size: 25px;
  }

  .modal-info {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 450px) {
  .trip-hero {
    width: calc(100% - 20px);
    padding: 30px 20px;
    border-radius: 20px;
  }

  .section {
    width: calc(100% - 20px);
  }

  .trip-hero h1 {
    font-size: 38px;
  }

  .section-heading h2 {
    font-size: 26px;
  }

  .place-image-wrapper {
    height: 220px;
  }

  .form-actions {
    flex-direction: column-reverse;
  }

  .cancel-button,
  .save-button {
    width: 100%;
  }
}
`;

export default Trip;