import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Trending from "./components/Trending";
import Popular from "./components/Popular";
import Movies from "./components/Movies";
import TV_Shows from "./components/TV_Shows";
import People from "./components/People";
import TvShowDetails from "./components/TvShowDetails";
import MovieDetails from "./components/movieDetails";
import PersonDetails from "./components/PersonDetails";
import Trailer from "./components/partials/Trailer";


const App = () => 
{
  return (
    <div className="bg-[#1F1E24] w-screen h-screen flex">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/:media_type/details/:id" element={<MovieDetails/>} >
        <Route path="/:media_type/details/:id/trailer" element={<Trailer/>} />
        </Route>
        <Route path="/tv" element={<TV_Shows />} />
        <Route path="/tv/details/:id" element={<TvShowDetails />} >
          <Route path="/tv/details/:id/trailer" element={<Trailer/>}></Route>
        </Route>
        
        <Route path="/person" element={<People />} >
          <Route path="/person/details/:id" element={<PersonDetails />} />
        </Route>

      </Routes>
    </div>
  );
};

export default App;
