import { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

export default function VerifyEmail() {
  const location = useLocation();
  const calledRef = useRef(false);
  const [status, setStatus] = useState("loading"); 

  useEffect(() => {
    if (calledRef.current) return; 
    calledRef.current = true;

    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (!token) {
      setStatus("missing");
      return;
    }

    axios.get(`http://localhost:8080/users/verify?token=${encodeURIComponent(token)}`)
      .then(() => setStatus("success"))
      .catch(err => {
        if (err?.response?.status === 404) setStatus("already"); 
        else setStatus("invalid");
      });
  }, [location.search]);

  return (
    <div style={styles.container}>
      <div style={styles.overlay} />
      <div style={styles.card}>
        <div style={styles.star}>★</div>

        {status === "loading" && (
          <>
            <h1 style={styles.heading}>Hang tight, partner…</h1>
            <p style={styles.text}>We’re verifying that token right now.</p>
          </>
        )}

        {status === "success" && (
          <>
            <h1 style={styles.heading}>All Set! Email Verified!</h1>
            <p style={styles.text}>You can mosey on over and sign in.</p>
            <Link to="/login" style={{ ...styles.button, marginTop: 20 }}>
              Saddle Up & Login
            </Link>
          </>
        )}

        {status === "already" && (
          <>
            <h1 style={styles.heading}>Already Verified</h1>
            <p style={styles.text}>That link’s been used. You can log in now.</p>
            <Link to="/login" style={{ ...styles.button, marginTop: 20 }}>
              Go to Login
            </Link>
          </>
        )}

        {status === "invalid" && (
          <>
            <h1 style={styles.heading}>Uh-oh…</h1>
            <p style={styles.text}>That verification link isn’t valid. Try registering again.</p>
            <Link to="/register" style={{ ...styles.button, marginTop: 20 }}>
              Register
            </Link>
          </>
        )}

        {status === "missing" && (
          <>
            <h1 style={styles.heading}>No Token Found</h1>
            <p style={styles.text}>Open the link from your email, or request a new one.</p>
            <Link to="/register" style={{ ...styles.button, marginTop: 20 }}>
              Back to Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundImage: 'url("/Email.jpg")', 
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
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(0,0,0,0.35))",
    backdropFilter: "blur(1px)",
  },
  card: {
    position: "relative",
    backgroundColor: "rgba(255, 244, 230, 0.92)",
    padding: "32px 46px",
    borderRadius: "12px",
    textAlign: "center",
    width: "min(520px, 90vw)",
    border: "2px solid #8B4513",
    boxShadow: "0 0 20px rgba(0,0,0,0.35)",
  },
  star: {
    fontSize: "56px",
    color: "#c9972b",
    marginBottom: "10px",
  },
  heading: {
    fontFamily: "'Georgia', serif",
    fontSize: "28px",
    color: "#4b2600",
    marginBottom: "10px",
  },
  text: {
    fontSize: "18px",
    color: "#3b220b",
    lineHeight: 1.4,
    marginBottom: "14px",
  },
  button: {
    display: "inline-block",
    backgroundColor: "#9E5231",
    color: "white",
    padding: "12px 22px",
    borderRadius: "6px",
    textDecoration: "none",
    fontSize: "17px",
    fontWeight: "bold",
    border: "2px solid #5C2E1D",
  },
};
