import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Grid, 
  Alert,
  CircularProgress
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useMovies } from '../../context/MovieContext';
import axios from 'axios';
import API_BASE_URL from '../../config';


const MovieForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addMovie, updateMovie } = useMovies();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    genre: '',
    rating: 0,
    duration: 0,
    releaseDate: '',
    language: '',
    cast: '',
    director: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEdit) {
      const fetchMovie = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`${API_BASE_URL}/movies`);
          // Backend returns array directly
          const movies = Array.isArray(response.data) ? response.data : [];
          const movie = movies.find(m => m._id === id);
          if (movie) {
            setFormData({
              ...movie,
              genre: movie.genre.join(', '),
              cast: movie.cast.join(', '),
              releaseDate: new Date(movie.releaseDate).toISOString().split('T')[0]
            });
          }
        } catch (err) {
          setError('Failed to fetch movie details');
        } finally {
          setLoading(false);
        }
      };
      fetchMovie();
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formattedData = {
      ...formData,
      genre: formData.genre.split(',').map(g => g.trim()),
      cast: formData.cast.split(',').map(c => c.trim()),
    };

    const result = isEdit 
      ? await updateMovie(id, formattedData)
      : await addMovie(formattedData);

    if (result.success) {
      navigate('/');
    } else {
      setError(result.message);
      setLoading(false);
    }
  };

  if (loading && isEdit) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress /></Box>;

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4, bgcolor: '#1a1a1a', color: 'white' }}>
          <Typography variant="h4" mb={4} fontWeight="bold">
            {isEdit ? 'Edit Movie' : 'Add New Movie'}
          </Typography>
          
          {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
          
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Movie Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  sx={{ input: { color: 'white' }, label: { color: 'rgba(255,255,255,0.7)' } }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Genre (comma separated)"
                  name="genre"
                  value={formData.genre}
                  onChange={handleChange}
                  required
                  sx={{ input: { color: 'white' }, label: { color: 'rgba(255,255,255,0.7)' } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  sx={{ textarea: { color: 'white' }, label: { color: 'rgba(255,255,255,0.7)' } }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  type="number"
                  label="Rating (0-10)"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  inputProps={{ step: 0.1, min: 0, max: 10 }}
                  sx={{ input: { color: 'white' }, label: { color: 'rgba(255,255,255,0.7)' } }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  type="number"
                  label="Duration (minutes)"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  required
                  sx={{ input: { color: 'white' }, label: { color: 'rgba(255,255,255,0.7)' } }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  type="date"
                  label="Release Date"
                  name="releaseDate"
                  value={formData.releaseDate}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  required
                  sx={{ input: { color: 'white' }, label: { color: 'rgba(255,255,255,0.7)' } }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Language"
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                  required
                  sx={{ input: { color: 'white' }, label: { color: 'rgba(255,255,255,0.7)' } }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Director"
                  name="director"
                  value={formData.director}
                  onChange={handleChange}
                  sx={{ input: { color: 'white' }, label: { color: 'rgba(255,255,255,0.7)' } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Cast (comma separated)"
                  name="cast"
                  value={formData.cast}
                  onChange={handleChange}
                  sx={{ input: { color: 'white' }, label: { color: 'rgba(255,255,255,0.7)' } }}
                />
              </Grid>
              
              <Grid item xs={12} sx={{ mt: 2 }}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    sx={{ bgcolor: '#f5c518', color: 'black', '&:hover': { bgcolor: '#e2b616' }, minWidth: 150 }}
                  >
                    {loading ? <CircularProgress size={24} /> : (isEdit ? 'Update Movie' : 'Add Movie')}
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => navigate('/')}
                    sx={{ color: 'white', borderColor: 'white' }}
                  >
                    Cancel
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default MovieForm;
