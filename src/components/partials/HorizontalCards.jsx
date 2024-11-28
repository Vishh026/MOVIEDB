import React from "react";
import { Link } from "react-router-dom";
import noimage from '/no-image.jpg'

const HorizontalCards = ({ data }) => {
  console.log(data)
  return (
    <div
      className="flex overflow-y-hidden p-5 w-[100%]
  "
    >
     
      {data.length > 0 ? data.map((d, i) => (
        <Link
        to={`/${d.media_type || title}/details/${d.id}`}
          key={i}
          className="min-w-[15%] h-[35vh]  mr-5 bg-zinc-900 mb-5 overflow-hidden"
        >
          <img
            className="w-full h-[55%] object-cover "
            src={ d.backdrop_path || d.poster_path ?
              `https://image.tmdb.org/t/p/original/${
              d.backdrop_path || d.poster_path
            })` : noimage
          }
            alt=""
          />
          <div className="text-white p-3 overflow-y-auto h-[45%] ">
            <h1 className="text-xl font-semibold">
              {d.name || d.title || d.original_title || d.original_name}
            </h1>
            <p>
              {d.overview.slice(0, 50)}...
              <span className="text-zinc-500">more</span>
            </p>
          </div>
        </Link>
      )) : <h1 className="text-3xl text-white font-black text-center">Nothing to show</h1>}
    </div>
   
  );
};

export default HorizontalCards;
