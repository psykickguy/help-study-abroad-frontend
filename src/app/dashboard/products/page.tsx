"use client";

import { useEffect, useState, useCallback, memo } from "react";
import Grid from "@mui/material/Grid";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  TextField,
  Pagination,
  CircularProgress,
  MenuItem,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useProductStore } from "@/store/productStore";

const LIMIT = 10;

/* =======================
   Memoized Product Card
   ======================= */
const ProductCard = memo(function ProductCard({
  product,
  onClick,
}: {
  product: any;
  onClick: () => void;
}) {
  return (
    <Card
      onClick={onClick}
      sx={{
        cursor: "pointer",
        height: "100%",
        borderRadius: 3,
        transition: "0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 6,
        },
      }}
    >
      <CardMedia
        component="img"
        height="160"
        image={product.thumbnail}
        alt={product.title}
      />
      <CardContent>
        <Typography variant="h6" fontWeight={600}>
          {product.title}
        </Typography>

        <Typography color="text.secondary" fontSize={14}>
          {product.category}
        </Typography>

        <Typography mt={1} fontWeight={500}>
          ₹ {product.price}
        </Typography>

        <Typography variant="caption">⭐ {product.rating}</Typography>
      </CardContent>
    </Card>
  );
});

export default function ProductsPage() {
  const router = useRouter();
  const {
    products,
    total,
    loading,
    categories,
    fetchProducts,
    fetchCategories,
  } = useProductStore();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const goToProduct = useCallback(
    (id: number) => router.push(`/dashboard/products/${id}`),
    [router]
  );

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    const skip = (page - 1) * LIMIT;
    fetchProducts(LIMIT, skip, search || undefined, category || undefined);
  }, [page, search, category, fetchProducts]);

  return (
    <Box p={2}>
      <Typography variant="h5" mb={2}>
        Products
      </Typography>

      {/* Filters */}
      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} md={6}>
          <TextField
            label="Search Products"
            fullWidth
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            select
            label="Category"
            fullWidth
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1);
            }}
          >
            <MenuItem value="">All</MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <ProductCard
                product={product}
                onClick={() => goToProduct(product.id)}
              />
            </Grid>
          ))}
        </Grid>
      )}

      <Box mt={4} display="flex" justifyContent="center">
        <Pagination
          count={Math.ceil(total / LIMIT)}
          page={page}
          onChange={(_, value) => setPage(value)}
        />
      </Box>
    </Box>
  );
}
