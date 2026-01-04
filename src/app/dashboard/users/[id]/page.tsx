"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Button,
  Paper,
  Grid,
} from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  phone: string;
  age: number;
  university?: string;
  company?: {
    name: string;
    title?: string;
  };
  address?: {
    city?: string;
    state?: string;
  };
}

export default function UserDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await axios.get(`https://dummyjson.com/users/${id}`);
        setUser(res.data);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [id]);

  if (loading) {
    return (
      <Box p={3} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return (
      <Typography p={3} color="error">
        User not found
      </Typography>
    );
  }

  return (
    <Box minHeight="100vh" bgcolor="#f5f6fa" p={3}>
      <Button onClick={() => router.push("/dashboard/users")}>
        ← Back to Users
      </Button>

      <Paper sx={{ p: 4, mt: 2, borderRadius: 3 }}>
        <Typography variant="h4" fontWeight={600}>
          {user.firstName} {user.lastName}
        </Typography>

        <Typography color="text.secondary" mb={3}>
          {user.company?.title || "—"} at {user.company?.name || "—"}
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
              <Typography fontWeight={600} mb={1}>
                📞 Contact
              </Typography>
              <Typography>Email: {user.email}</Typography>
              <Typography>Phone: {user.phone}</Typography>
              <Typography>Gender: {user.gender}</Typography>
              <Typography>Age: {user.age}</Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
              <Typography fontWeight={600} mb={1}>
                📍 Location
              </Typography>
              <Typography>
                {user.address?.city}, {user.address?.state}
              </Typography>
              <Typography>University: {user.university || "—"}</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
