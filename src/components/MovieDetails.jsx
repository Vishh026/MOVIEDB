import React, { useEffect } from "react";
import { asyncLoadMovie, removeMovie } from "../store/actions/MovieActions";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import HorizontalCards from "./partials/HorizontalCards";
import Loading from "./Loading";

const MovieDetails = () => {
  document.title = "SCSDB | Movie Details";
  const {pathname} = useLocation()

  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.movie);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncLoadMovie(id));
    return () => {
      // cleanup code here if needed
      dispatch(removeMovie());
    };
  }, [id]);  

  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.2) ,rgba(0,0,0,.5),rgba(0,0,0,.8)),
      url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="relative w-full h-[160vh] px-[10%] "
    >
      {/* part 1 navigation */}
      <nav className="w-full text-zinc-100 flex gap-10 text-xl items-center p-5">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#7b40ff] ri-arrow-left-line"
        ></Link>
        <a target="_blank" href={info.detail.homepage}>
          <i className="ri-external-link-fill"></i>
        </a>

        <a
          target="_blank"
          href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
        >
          <i className="ri-global-line"></i>
        </a>
        <a
                    target="_blank"
                    href={`https://www.imdb.com/title/${info.externalid.imdb_id}/`}
                >
                    imdb
                </a>
      </nav>

      {/* part2- poster and details */}
      <div className="w-full flex">
        <img
          className="shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] w-[30vh] h-[50vh] object-cover"
          src={`https://image.tmdb.org/t/p/original/${
            info.detail.poster_path || info.detail.backdrop_path
          }`}
          alt=""
        />

        <div className="content ml-[5%] text-white">
          <h1 className="text-white font-black text-5xl ">
            {info.detail.name ||
              info.detail.title ||
              info.detail.original_title ||
              info.detail.original_name}

            <small className="font-bold text-zinc-300 text-2xl">
              ({info.detail.release_date.split("-")[0]})
            </small>
          </h1>
          <div className="flex text-white items-center gap-x-3 mt-3 mb-5">
            <span className="absolute text-white rounded-full h-[6vh] w-[6vh] bg-yellow-600 font-semibold text-xl flex justify-center items-center ">
              {(info.detail.vote_average * 10).toFixed()}{" "}
              <sup>%</sup>
            </span>
            <h1 className="w-[60px] font-semibold text-2xl leading-6">User score</h1>
            <h1>{info.detail.release_date}</h1>
            <h1 className="">
              {info.detail.genres.map((g) => g.name).join(",")}
            </h1>
            <h1>{info.detail.runtime}min</h1>
          </div>

          <h1 className="text-xl font-semibold italic text-zinc-200">{info.detail.tagline}</h1>

          <h1 className="text-2xl mt-5 mb-3">overview</h1>
          <p>{info.detail.overview}</p>

          <h1 className="text-2xl mt-5 mb-5">Movie Translated</h1>
          <p className="mb-10">{info.translations.join(", ")}</p>
          
          <Link className="p-5 bg-[#5851C7] rounded-lg" to={`${pathname}/trailer`}>
              <i className="ri-play-fill text-xl mr-3">Play trailer</i>
          </Link>
        </div>

      </div>

      {/* part3 platforms */}
      <div className="w-[80%] flex flex-col gap-y-5 mt-10">
        {info.watchproviders && info.watchproviders.flatrate && (
          <div className="flex gap-x-10 text-white items-center">
            <h1>Available on flatrate</h1>
            {info.watchproviders.flatrate.map((w,i) => (
              <img
              key={i}
                title={w.provider_name}
                className="w-[5vh] h-[5vh] rounded-md object-cover"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}

        {info.watchproviders && info.watchproviders.rent && (
          <div className="flex gap-x-10 text-white items-center">
            <h1>Available on rent</h1>
            {info.watchproviders.rent.map((w,i) => (
              <img
              key={i}
              title={w.provider_name}
                className="w-[5vh] h-[5vh] rounded-md object-cover"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}

        {info.watchproviders && info.watchproviders.buy && (
          <div className="flex gap-x-10 text-white items-center">
            <h1>Available on buy</h1>
            {info.watchproviders.buy.map((w,i) => (
              <img
              key={i}
              title={w.provider_name}
                className="w-[5vh] h-[5vh] rounded-md object-cover"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}
      </div>
      
      <hr className="mt-10 mb-5 border-none h-[2px] bg-zinc-500"/>
      <h1 className="text-2xl font-semibold text-white ">Recommendations & Similar Stuff</h1>

      {/* part-4 recommendations and similarities */}
      <HorizontalCards data={
        info.recommendations.length > 0 ? info.recommendations :info.similar}/>
     
      <Outlet />
    </div>
  ) : (
    <Loading />
  );
};

export default MovieDetails;
