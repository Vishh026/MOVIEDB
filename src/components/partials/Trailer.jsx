import React from 'react'
import ReactPlayer from 'react-player'
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import NotFound from '../NotFound';

const Trailer = () => {
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const category = pathname.includes("movie") ? "movie" : "tvShow";
    const ytvideo = useSelector((state)=> state[category].info.videos)
    
  return  (
    <div className='bg-[rgba(0,0,0,0.9)] absolute w-full h-screen flex items-center justify-center top-0 left-0 z-[1000]'>
        <Link
          onClick={() => navigate(-1)}
          className="absolute text-3xl text-white right-[5%] top-[5%] hover:text-[#7b40ff] ri-close-fill"
        ></Link>
        {ytvideo ? (
            <ReactPlayer 
            controls
        height={600} 
        width={1220}
        url={`https://youtu.be/${ytvideo.key}`} />) :(
            <NotFound />
        )}

        

        
    </div>
  )
}

export default Trailer