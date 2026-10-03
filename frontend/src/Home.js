import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={styles.page}>
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <p style={styles.overline}>
            A JOURNEY TO THE SACRED CITY
          </p>

          <h1 style={styles.heroTitle}>
            KASHI YATRA
          </h1>

          <p style={styles.description}>
            A personal journey through Kashi Vishwanath,
            the sacred Ganga, ancient temples, ghats and
            unforgettable moments.
          </p>

          <Link to="/trip" style={styles.button}>
            Explore Places
          </Link>
        </div>
      </section>

      <section style={styles.section}>
        <p style={styles.overlineDark}>
          THE JOURNEY
        </p>

        <h2 style={styles.sectionTitle}>
          The Eternal City
        </h2>

        <p style={styles.text}>
          Kashi, also known as Varanasi, is one of
          India's oldest and most spiritually significant
          cities. This trip planner keeps the itinerary,
          expenses, members and important places together.
        </p>

        <div style={styles.cards}>
          <div style={styles.card}>
            <h3>Trip</h3>

            <p>
              Manage dates, hotel and travel information.
            </p>

            <Link to="/trip" style={styles.cardLink}>
              View Trip →
            </Link>
          </div>

          <div style={styles.card}>
            <h3>Places</h3>

            <p>
              Keep all destinations and image URLs together.
            </p>

            <Link to="/places" style={styles.cardLink}>
              View Places →
            </Link>
          </div>

          <div style={styles.card}>
            <h3>Expenses</h3>

            <p>
              Record and filter every trip expense.
            </p>

            <Link to="/expenses" style={styles.cardLink}>
              View Expenses →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#fff",
    color: "#000",
  },

  hero: {
    minHeight: "calc(100vh - 70px)",
    display: "flex",
    alignItems: "center",
    padding: "70px 8%",
    boxSizing: "border-box",
    background:
      "linear-gradient(rgba(0,0,0,.55),rgba(0,0,0,.65)),url('https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&w=1800&q=80') center/cover",
  },

  heroContent: {
    maxWidth: "720px",
    color: "#fff",
  },

  overline: {
    fontSize: "12px",
    letterSpacing: "4px",
    fontWeight: "700",
    margin: "0 0 20px",
  },

  heroTitle: {
    fontSize: "clamp(50px, 9vw, 110px)",
    lineHeight: "0.95",
    letterSpacing: "5px",
    margin: "20px 0",
    fontWeight: "800",
  },

  description: {
    maxWidth: "650px",
    lineHeight: "1.8",
    fontSize: "18px",
    color: "#eee",
    margin: "25px 0",
  },

  button: {
    display: "inline-block",
    marginTop: "25px",
    background: "#fff",
    color: "#000",
    padding: "14px 28px",
    borderRadius: "30px",
    textDecoration: "none",
    fontWeight: "700",
  },

  section: {
    maxWidth: "1200px",
    margin: "auto",
    padding: "100px 8%",
    boxSizing: "border-box",
  },

  overlineDark: {
    fontSize: "12px",
    letterSpacing: "4px",
    fontWeight: "700",
    margin: "0 0 10px",
  },

  sectionTitle: {
    fontSize: "clamp(40px, 6vw, 70px)",
    margin: "10px 0 20px",
    lineHeight: "1",
  },

  text: {
    maxWidth: "750px",
    lineHeight: "1.8",
    color: "#555",
    fontSize: "17px",
  },

  cards: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(230px, 1fr))",
    gap: "20px",
    marginTop: "50px",
  },

  card: {
    border: "1px solid #ddd",
    borderRadius: "18px",
    padding: "30px",
    background: "#fff",
  },

  cardLink: {
    color: "#000",
    fontWeight: "700",
    textDecoration: "none",
  },
};

export default Home;