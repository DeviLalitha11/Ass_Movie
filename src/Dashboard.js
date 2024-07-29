import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [movies, setMovies] = useState([]);
  const baseImageurl = 'https://image.tmdb.org/t/p/w500';
  const navigate = useNavigate(); 

  const handleNavigate = (id)=>{
    navigate('/movie/'+id)
  }
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const apiKey = '4c374f4493976f62a9156913c21f4706';
        const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`);
        if (!response.ok) {
          throw new Error('Failed to fetch movies');
        }
        const data = await response.json();
        console.log("Movie Data:", data); // Log the response data
        setMovies(data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6 ">Now Playing Movies</h1>
      <div className="grid grid-cols-3 gap-4">
        {movies.map((movie) => (
          <div key={movie.id} className="bg-white shadow-md rounded-lg p-4">
            <center>
            <img height={150} width={300} src={`${baseImageurl}${movie.poster_path}`}/>
            </center>
            <h2 className="text-xl font-bold mb-2">{movie.title}</h2>
            <h3>{movie.overview}</h3>
            <button className='rounded-xl text-2xl text-white bg-red-600 p-2 m-4' onClick={()=>handleNavigate(movie.id)}>See Details</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
