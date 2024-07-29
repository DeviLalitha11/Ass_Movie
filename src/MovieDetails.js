import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const baseImageurl = 'https://image.tmdb.org/t/p/w500';
  const navigate = useNavigate();

  const handleNavigate = ()=>{
    navigate('/');
  }

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const apiKey = '4c374f4493976f62a9156913c21f4706';
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`);
        if (!response.ok) {
          throw new Error('Failed to fetch movie details');
        }
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <center>
    <div className="container mx-auto mt-10">
      <img height={200} width={300} src={`${baseImageurl}${movie.poster_path}`}/>
      <h1 className="text-3xl font-bold mb-6 container mx-auto mt-10 shadow-lg p-5">{movie.title}</h1>
      <div className="bg-white shadow-lg rounded-lg p-4">
        <p className='pl-10 pr-10 text-xl font-bold'>Overview: {movie.overview}</p>
        <p className='pl-10 pr-10 mt-5 text-xl font-bold'>Release Date: {movie.release_date}</p>
        <p className='pl-10 pr-10 mt-5 text-xl font-bold'>Rating: {movie.vote_average}</p>
        <button className='rounded-xl text-2xl text-white bg-red-600 p-2 m-4' onClick={handleNavigate}>Logout</button>
      </div>
    </div>
    </center>
  );
};

export default MovieDetails;
