import { useEffect, useRef } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function VerifyEmail() {
  const location = useLocation();
  const calledRef = useRef(false);

  useEffect(() => {
    if (calledRef.current) return;     
    calledRef.current = true;

    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (!token) return;

    axios.get(`http://localhost:8080/users/verify?token=${encodeURIComponent(token)}`)
      .then(() => {/* show success */})
      .catch(err => {
        if (err?.response?.status === 404) {
        }
      });
  }, [location.search]);

  return null;
}
