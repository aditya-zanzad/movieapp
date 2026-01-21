import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  Typography, 
  Box, 
  TextField,
  InputAdornment,
  CircularProgress
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useMovies } from '../context/MovieContext';
import StarIcon from '@mui/icons-material/Star';

const Search = () => {
  const [query, setQuery] = useState('');
  const { searchMovies, movies, loading } = useMovies();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query) {
        searchMovies(query);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search for movies by name or description..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          sx={{ 
            bgcolor: '#fff', 
            borderRadius: '4px',
            '& .MuiOutlinedInput-root': {
              '& fieldset': { border: 'none' },
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Typography variant="h5" color="white" mb={3}>
            {query ? `Search Results for "${query}"` : 'Type to search...'}
          </Typography>
          
          <Grid container spacing={3}>
            {movies.map((movie) => (
              <Grid item key={movie._id} xs={12} sm={6} md={4} lg={2.4}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#1a1a1a', color: 'white' }}>
                  <CardMedia
                    component="img"
                    height="300"
                    image={movie.poster || `https://via.placeholder.com/300x450?text=${encodeURIComponent(movie.name)}`}
                    alt={movie.name}
                  />
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <StarIcon sx={{ color: '#f5c518', fontSize: '1.2rem', mr: 0.5 }} />
                      <Typography variant="body1">{movie.rating}</Typography>
                    </Box>
                    <Typography variant="h6" component="div" sx={{ fontSize: '1rem', fontWeight: 600 }}>
                      {movie.name}
                    </Typography>
                    <Typography variant="body2" color="rgba(255,255,255,0.7)">
                      {new Date(movie.releaseDate).getFullYear()}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          
          {!loading && query && movies.length === 0 && (
            <Typography variant="body1" color="rgba(255,255,255,0.7)" textAlign="center" mt={4}>
              No movies found matching your search.
            </Typography>
          )}
        </>
      )}
    </Container>
  );
};

export default Search;
