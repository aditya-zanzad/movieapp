import React, { createContext, useState, useContext, useCallback } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';


const MovieContext = createContext();

export const useMovies = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });

  const fetchMovies = useCallback(async (page = 1, limit = 10) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/movies?page=${page}&limit=${limit}`);
      // Backend returns array directly for getMovies
      setMovies(Array.isArray(response.data) ? response.data : []);
      // Pagination logic might need backend update, for now simplified
      setPagination({
        page: 1,
        totalPages: 1
      });
      setError(null);
    } catch (err) {
      setError('Failed to fetch movies');
    } finally {
      setLoading(false);
    }
  }, []);

  const searchMovies = async (query) => {
    setLoading(true);
    try {
      // Backend uses ?query=... in getSearchMovies
      const response = await axios.get(`${API_BASE_URL}/movies/search?query=${query}`);
      setMovies(response.data);
      setError(null);
    } catch (err) {
      setError('Search failed');
    } finally {
      setLoading(false);
    }
  };

  const getSortedMovies = async (sortBy, order = 'desc') => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/movies/sorted?sortBy=${sortBy}&order=${order}`);
      // Backend returns { success: true, data: [...] } for sorted
      setMovies(response.data.data || []);
      setError(null);
    } catch (err) {
      setError('Sorting failed');
    } finally {
      setLoading(false);
    }
  };

  // Admin actions
  const addMovie = async (movieData) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(`${API_BASE_URL}/admin/movies`, movieData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Backend queues the movie, so we don't get the object back immediately.
      // We can manually add it to the state with a temporary ID if we want,
      // or just inform the user it was queued.
      // For simplicity, let's just trigger a re-fetch or assume it'll be there on next load.
      fetchMovies(); 
      return { success: true, message: response.data.message };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Add movie failed' };
    }
  };

  const updateMovie = async (id, movieData) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.put(`${API_BASE_URL}/admin/movies/${id}`, movieData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Backend returns movie in 'data' field
      const updatedMovie = response.data.data;
      setMovies(prev => prev.map(m => m._id === id ? updatedMovie : m));
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Update failed' };
    }
  };

  const deleteMovie = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`${API_BASE_URL}/admin/movies/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMovies(prev => prev.filter(m => m._id !== id));
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Delete failed' };
    }
  };

  return (
    <MovieContext.Provider value={{ 
      movies, loading, error, pagination, 
      fetchMovies, searchMovies, getSortedMovies,
      addMovie, updateMovie, deleteMovie 
    }}>
      {children}
    </MovieContext.Provider>
  );
};
