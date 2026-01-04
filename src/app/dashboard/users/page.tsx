"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  TextField,
  Pagination,
  CircularProgress,
  Box,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";

const LIMIT = 10;

export default function UsersPage() {
  const router = useRouter();
  const { users, total, loading, fetchUsers } = useUserStore();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const skip = (page - 1) * LIMIT;
    fetchUsers(LIMIT, skip, search || undefined);
  }, [page, search, fetchUsers]);

  return (
    <Box minHeight="100vh" bgcolor="#f5f6fa" p={3}>
      <Typography variant="h4" fontWeight={600} mb={2}>
        Users
      </Typography>

      <Paper elevation={1} sx={{ p: 2, borderRadius: 3 }}>
        <TextField
          label="Search users"
          fullWidth
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          sx={{ mb: 2 }}
        />

        {loading ? (
          <Box display="flex" justifyContent="center" py={4}>
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Gender</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Company</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {users.map((user) => (
                  <TableRow
                    key={user.id}
                    hover
                    sx={{
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: "rgba(0,0,0,0.04)",
                      },
                    }}
                    onClick={() => router.push(`/dashboard/users/${user.id}`)}
                  >
                    <TableCell>
                      <Typography fontWeight={600}>
                        {user.firstName} {user.lastName}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        ID: {user.id}
                      </Typography>
                    </TableCell>

                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.gender}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>{user.company?.name || "—"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <Box mt={3} display="flex" justifyContent="center">
          <Pagination
            count={Math.ceil(total / LIMIT)}
            page={page}
            onChange={(_, value) => setPage(value)}
          />
        </Box>
      </Paper>
    </Box>
  );
}
