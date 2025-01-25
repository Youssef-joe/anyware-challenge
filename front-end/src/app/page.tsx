"use client"; // Mark as a Client Component

import { Button, Container, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { login } from "../store/slices/authSlice";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = () => {
    dispatch(login());
    router.push("/dashboard");
  };

  return (
    <AnimatePresence mode="wait">
      <Container>
        <Typography variant="h3" gutterBottom>
          Welcome to Anyware Software
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          disabled={false}>
          Login
        </Button>
      </Container>
    </AnimatePresence>
  );
}
