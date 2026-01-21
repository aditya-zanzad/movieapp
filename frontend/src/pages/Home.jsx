import React, { useEffect, useState } from 'react';
import { 
  Container, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  Typography, 
  Box, 
  Pagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  IconButton,
  Button
} from '@mui/material';
import { useMovies } from '../context/MovieContext';
import { useAuth } from '../context/AuthContext';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { movies, fetchMovies, loading, getSortedMovies, deleteMovie, pagination } = useMovies();
  const { isAdmin } = useAuth();
  const [sortBy, setSortBy] = useState('releaseDate');
  const navigate = useNavigate();

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const handlePageChange = (event, value) => {
    fetchMovies(value);
  };

  const handleSortChange = (event) => {
    const value = event.target.value;
    setSortBy(value);
    getSortedMovies(value);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      await deleteMovie(id);
    }
  };

  if (loading && movies.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" fontWeight="bold">Top Movies</Typography>
        
        <FormControl variant="outlined" sx={{ minWidth: 200 }}>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortBy}
            onChange={handleSortChange}
            label="Sort By"
          >
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="rating">Rating</MenuItem>
            <MenuItem value="releaseDate">Release Date</MenuItem>
            <MenuItem value="duration">Duration</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3}>
        {movies.length > 0 ? (
          movies.map((movie) => (
            <Grid item key={movie._id} xs={12} sm={6} md={4} lg={2.4}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#1a1a1a', color: 'white' }}>
                <CardMedia
                  component="img"
                  height="300"
                  image={movie.poster || `https://via.placeholder.com/300x450?text=${encodeURIComponent(movie.name)}`}
                  alt={movie.name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <StarIcon sx={{ color: '#f5c518', fontSize: '1.2rem', mr: 0.5 }} />
                    <Typography variant="body1">{movie.rating}</Typography>
                  </Box>
                  <Typography variant="h6" component="div" sx={{ fontSize: '1rem', fontWeight: 600, mb: 1 }}>
                    {movie.name}
                  </Typography>
                  <Typography variant="body2" color="rgba(255,255,255,0.7)">
                    {movie.releaseDate ? new Date(movie.releaseDate).getFullYear() : 'N/A'} • {movie.duration}m
                  </Typography>
                  
                  {isAdmin() && (
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                      <IconButton size="small" color="primary" onClick={() => navigate(`/admin/edit/${movie._id}`)}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" color="error" onClick={() => handleDelete(movie._id)}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Box sx={{ textAlign: 'center', py: 10 }}>
              <Typography variant="h6" color="rgba(255,255,255,0.5)">
                No movies found. {isAdmin() ? 'Start by adding some movies!' : 'The movie list is currently empty.'}
              </Typography>
            </Box>
          </Grid>
        )}
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
        <Pagination 
          count={pagination.totalPages} 
          page={pagination.page} 
          onChange={handlePageChange} 
          color="primary" 
        />
      </Box>
    </Container>
  );
};

export default Home;
