import React from "react";
import { Link } from "react-router-dom";

export default function VerificationSent() {
  return (
    <div style={styles.container}>
      <div style={styles.overlay} />
      <div style={styles.card}>
        <div style={styles.star}>★</div>
        <h1 style={styles.heading}>Yeehaw! You're Almost In!</h1>
        <p style={styles.text}>
          Your account has been created. A verification link is ridin’ its way to your inbox.
          Click it to join the corral!
        </p>
        <Link to="/login" style={styles.button}>
          Saddle Up & Login
        </Link>
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundImage: `url("/desertsunset.jpg")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
  },

  overlay: {
    position: "absolute",
    inset: 0,

    backdropFilter: "blur(1px)",
  },

  card: {
    position: "relative",
    backgroundColor: "rgba(255, 244, 230, 0.9)",
    padding: "30px 45px",
    borderRadius: "12px",
    textAlign: "center",
    width: "500px",
    border: "2px solid #8B4513",
    boxShadow: "0 0 20px rgba(0,0,0,0.4)",
  },

  star: {
    fontSize: "55px",
    color: "#c9972b", 
    textShadow: "0 0 8px rgba(0,0,0,0.5)",
    marginBottom: "10px",
  },

  heading: {
    fontFamily: "'Georgia', serif",
    fontSize: "28px",
    color: "#4b2600",
    marginBottom: "12px",
  },

  text: {
    fontSize: "18px",
    color: "#3b220b",
    lineHeight: 1.4,
    marginBottom: "18px",  
    },
   button: {
    backgroundColor: "#9E5231",
    color: "white",
    padding: "12px 22px",
    borderRadius: "6px",
    textDecoration: "none",
    fontSize: "17px",
    fontWeight: "bold",
    border: "2px solid #5C2E1D",
    marginTop: "20px",   
    },
};
