"use client"; // Mark as a Client Component

import { Button, Container, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { login } from "../store/slices/authSlice";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();
  const titleRef = useRef(null);
  const buttonRef = useRef(null);

  const handleLogin = () => {
    dispatch(login());
    router.push("/dashboard");
  };

  useEffect(() => {
    const tl = gsap.timeline();

    // Animate the title
    tl.fromTo(
      titleRef.current,
      {
        opacity: 0,
        y: -50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
      }
    );

    // Animate the button
    tl.fromTo(
      buttonRef.current,
      {
        opacity: 0,
        scale: 0.8,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "elastic.out(1, 0.5)",
      },
      "-=0.5" // Overlap the animation with the previous one
    );
  }, []);

  return (
    <Container
      maxWidth="sm"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <Typography
        ref={titleRef}
        variant="h3"
        gutterBottom
        style={{
          fontWeight: "bold",
          color: "#3f51b5",
          marginBottom: "1rem",
        }}
      >
        Welcome to Anyware Software
      </Typography>

      <Button
        ref={buttonRef}
        variant="contained"
        color="primary"
        onClick={handleLogin}
        disabled={false}
        style={{
          padding: "0.75rem 2rem",
          fontSize: "1rem",
          borderRadius: "8px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        Login
      </Button>
    </Container>
  );
}
