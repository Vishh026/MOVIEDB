import { Link } from "react-router-dom";

const Header = ({ data }) => {

  return (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.2) ,rgba(0,0,0,.5),rgba(0,0,0,.8)),
        url(https://image.tmdb.org/t/p/original/${
          data.backdrop_path || data.profile_path
        })`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="w-full h-[50vh] flex flex-col justify-end items-start [10%]"
    >
      <div className="text-white m-[4.7rem] w-[70%] ">
        <h1 className="text-5xl font-semibold">
          {
          data.name || 
          data.title || 
          data.original_title || 
          data.original_name
          }
        </h1>
        <p className="w-[70%] text-white mt-3">
          {data.overview.slice(0, 200)}...
          <Link to = {`/${data.media_type}/details/${data.id}`} className="text-blue-500">more</Link>
        </p>
        <p className="text-zinc-100 ">
          <i className="text-yellow-500  ri-megaphone-fill"></i>
          {data.first_air_date || data.release_date || "No Information"}
          <i className="ml-5 text-yellow-500  ri-album-fill"></i>
          {data.media_type.toUpperCase()}
        </p>
        <br />
        <Link to={`/${data.media_type}/details/${data.id}/trailer`} className="p-4 rounded text-white bg-[#6556CD] ">
          Watch Trailer
        </Link>
      </div>
    </div>
  );
};

export default Header;
