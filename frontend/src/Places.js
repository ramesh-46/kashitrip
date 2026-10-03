import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api";

function Places() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  const emptyForm = {
    name: "",
    description: "",
    location: "",
    image: "",
    date: "",
    startTime: "",
    endTime: "",
    openingTime: "",
    closingTime: "",
    darshanInfo: "",
    status: "Planned",
    notes: "",
    priority: "Medium",
    category: "Temple",
  };

  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    loadPlaces();
  }, []);

  const loadPlaces = async () => {
    try {
      const response = await axios.get(`${API}/places`);
      setPlaces(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const change = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const addPlace = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${API}/places`, form);

      setForm(emptyForm);
      loadPlaces();
    } catch (error) {
      console.error(error);
      alert("Unable to add place");
    }
  };

  const deletePlace = async (id) => {
    if (!window.confirm("Delete this place?")) return;

    try {
      await axios.delete(`${API}/places/${id}`);
      loadPlaces();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <p style={styles.small}>KASHI DESTINATIONS</p>

        <h1 style={styles.title}>Places To Visit</h1>

        <form onSubmit={addPlace} style={styles.form}>
          <h2>Add Place</h2>

          <div style={styles.grid}>
            <Input
              label="Place Name"
              name="name"
              value={form.name}
              onChange={change}
              required
            />

            <Input
              label="Location"
              name="location"
              value={form.location}
              onChange={change}
            />

            <Input
              label="Pinterest Image URL"
              name="image"
              value={form.image}
              onChange={change}
            />

            <Input
              label="Date"
              type="date"
              name="date"
              value={form.date}
              onChange={change}
            />

            <Input
              label="Start Time"
              type="time"
              name="startTime"
              value={form.startTime}
              onChange={change}
            />

            <Input
              label="End Time"
              type="time"
              name="endTime"
              value={form.endTime}
              onChange={change}
            />

            <Input
              label="Opening Time"
              type="time"
              name="openingTime"
              value={form.openingTime}
              onChange={change}
            />

            <Input
              label="Closing Time"
              type="time"
              name="closingTime"
              value={form.closingTime}
              onChange={change}
            />

            <Select
              label="Category"
              name="category"
              value={form.category}
              onChange={change}
              options={[
                "Temple",
                "Ghat",
                "Aarti",
                "Food",
                "Shopping",
                "Travel",
                "Other",
              ]}
            />

            <Select
              label="Priority"
              name="priority"
              value={form.priority}
              onChange={change}
              options={["Low", "Medium", "High"]}
            />

            <Select
              label="Status"
              name="status"
              value={form.status}
              onChange={change}
              options={[
                "Planned",
                "Visited",
                "Skipped",
                "Cancelled",
              ]}
            />
          </div>

          <Textarea
            label="Description"
            name="description"
            value={form.description}
            onChange={change}
          />

          <Textarea
            label="Darshan Information"
            name="darshanInfo"
            value={form.darshanInfo}
            onChange={change}
          />

          <Textarea
            label="Notes"
            name="notes"
            value={form.notes}
            onChange={change}
          />

          <button type="submit" style={styles.button}>
            Add Place
          </button>
        </form>

        <div style={styles.list}>
          {loading ? (
            <p>Loading places...</p>
          ) : places.length === 0 ? (
            <div style={styles.empty}>
              No places added yet.
            </div>
          ) : (
            places.map((place) => (
              <div key={place._id} style={styles.card}>
                {place.image ? (
                  <img
                    src={place.image}
                    alt={place.name}
                    style={styles.image}
                  />
                ) : (
                  <div style={styles.noImage}>
                    No Image
                  </div>
                )}

                <div style={styles.cardBody}>
                  <span style={styles.badge}>
                    {place.category}
                  </span>

                  <h2>{place.name}</h2>

                  <p style={styles.location}>
                    {place.location}
                  </p>

                  <p>{place.description}</p>

                  {place.darshanInfo && (
                    <p>
                      <strong>Darshan:</strong>{" "}
                      {place.darshanInfo}
                    </p>
                  )}

                  <p>
                    <strong>Status:</strong>{" "}
                    {place.status}
                  </p>

                  <button
                    onClick={() =>
                      deletePlace(place._id)
                    }
                    style={styles.delete}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function Input({
  label,
  type = "text",
  name,
  value,
  onChange,
  required = false,
}) {
  return (
    <div>
      <label style={styles.label}>{label}</label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        style={styles.input}
      />
    </div>
  );
}

function Textarea({
  label,
  name,
  value,
  onChange,
}) {
  return (
    <div>
      <label style={styles.label}>{label}</label>

      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows="3"
        style={styles.input}
      />
    </div>
  );
}

function Select({
  label,
  name,
  value,
  onChange,
  options,
}) {
  return (
    <div>
      <label style={styles.label}>{label}</label>

      <select
        name={name}
        value={value}
        onChange={onChange}
        style={styles.input}
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f7f7f7",
    padding: "60px 20px",
  },

  container: {
    maxWidth: "1200px",
    margin: "auto",
  },

  small: {
    fontSize: "12px",
    letterSpacing: "3px",
    fontWeight: "700",
  },

  title: {
    fontSize: "clamp(40px,6vw,70px)",
    margin: "10px 0 40px",
  },

  form: {
    background: "#fff",
    padding: "30px",
    borderRadius: "20px",
    marginBottom: "50px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(220px,1fr))",
    gap: "20px",
  },

  label: {
    display: "block",
    fontSize: "13px",
    fontWeight: "700",
    marginBottom: "7px",
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "13px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    marginBottom: "18px",
  },

  button: {
    padding: "13px 25px",
    background: "#000",
    color: "#fff",
    border: "none",
    borderRadius: "30px",
    cursor: "pointer",
    fontWeight: "700",
  },

  list: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(280px,1fr))",
    gap: "25px",
  },

  card: {
    background: "#fff",
    borderRadius: "18px",
    overflow: "hidden",
    boxShadow: "0 10px 30px rgba(0,0,0,.06)",
  },

  image: {
    width: "100%",
    height: "250px",
    objectFit: "cover",
    display: "block",
  },

  noImage: {
    height: "250px",
    background: "#eee",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  cardBody: {
    padding: "25px",
  },

  badge: {
    background: "#000",
    color: "#fff",
    padding: "6px 10px",
    borderRadius: "20px",
    fontSize: "11px",
  },

  location: {
    color: "#777",
  },

  delete: {
    background: "#fff",
    border: "1px solid #ddd",
    padding: "9px 15px",
    borderRadius: "20px",
    cursor: "pointer",
  },

  empty: {
    padding: "50px",
    textAlign: "center",
    background: "#fff",
    borderRadius: "15px",
  },
};

export default Places;