"use client";

import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import {
  Box,
  Typography,
  CircularProgress,
  Button,
  Paper,
} from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  category: string;
  thumbnail: string;
}

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await axios.get<Product>(
          `https://dummyjson.com/products/${id}`
        );
        setProduct(res.data);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <Box p={3} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  if (!product) {
    return (
      <Typography p={3} color="error">
        Product not found
      </Typography>
    );
  }

  return (
    <Box p={2}>
      <Button onClick={() => router.push("/dashboard/products")}>
        ← Back to Products
      </Button>

      <Paper sx={{ p: 4, mt: 2, borderRadius: 3 }}>
        <Grid container spacing={4}>
          {/* Image */}
          <Grid item xs={12} md={6}>
            <img
              src={product.thumbnail}
              alt={product.title}
              style={{ width: "100%", borderRadius: 12 }}
            />
          </Grid>

          {/* Details */}
          <Grid item xs={12} md={6}>
            <Typography variant="h4" fontWeight={600}>
              {product.title}
            </Typography>

            <Typography color="text.secondary" mb={2}>
              {product.category}
            </Typography>

            <Typography mb={3}>{product.description}</Typography>

            <Typography fontWeight={600} fontSize={18}>
              ₹ {product.price}
            </Typography>

            <Typography mt={1}>⭐ {product.rating}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
