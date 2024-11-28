import React from "react";
import { Link } from "react-router-dom";
import noimage from "/no-image.jpg";

const Cards = ({ data, title }) => {
 
  return (
    <div className="flex flex-wrap w-full h-full px-[5%] bg-[#1F1E24]">
      <Link
                onClick={() => {
                    window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                    });
                }}
                className="fixed bottom-[5%] right-[5%] flex justify-center items-center w-[5vh] h-[5vh] bg-[#6556cd] rounded-lg"
            >
                <i className="text-white ri-arrow-up-line text-xl"></i>
      </Link>
      {data.map((c, i) => (
        <Link
        to={`/${c.media_type || title}/details/${c.id}`}
          key={i}
          className="relative w-[25vh] mr-[5%] mb-[5%] "
        >
          
          <img
            className="shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] w-[25vh] h-[40vh]"
            src={ c.poster_path || c.backdrop_path || c.profile_path ? `https://image.tmdb.org/t/p/original/${
              c.poster_path || c.backdrop_path || c.profile_path
            }`: noimage}
            alt=""
          />
          <h1 className="text-zinc-200 text-2xl font-semibold mt-3">
            {c.name || c.title || c.original_title || c.original_name}
          </h1>
         
         

          {c.vote_average && (
            <div className="absolute right-[-10%] bottom-[30%] text-white rounded-full h-[6vh] w-[6vh] bg-yellow-600 font-semibold text-xl flex justify-center items-center">
              {(c.vote_average * 10).toFixed()} <sup>%</sup>
            </div>
          )}
        </Link>
      ))}
    </div>
  );
};

export default Cards;
