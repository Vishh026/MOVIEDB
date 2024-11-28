import axios from '../Utils/axios';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from './Loading'
import Cards from './Cards'
import Topnav from './partials/Topnav';
import Dropdown from './partials/Dropdown';
import InfiniteScroll from 'react-infinite-scroll-component';

const Movies = () => {
    document.title = "SCSDB | Movies";

    const navigate = useNavigate();
    const [Category, setCategory] = useState("now_playing")
    const [movie, setMovie] = useState([]);
    const [page, setpage] = useState(1)
    const [hasMore, setHasMore] = useState(true)

    const getMovie = async () => {
        try {
          const { data } = await axios.get(`movie/${Category}?page=${page}`);

          if(data.results.length > 0) {
            setMovie((prevState)=>[...prevState, ...data.results])
            setpage(page + 1)
          }else{
            setHasMore(false)
          }

        } catch (error) {
          console.log("Error fetching search results", error);
        }
      };

      const refreshHandler = () => {
        if(movie.length === 0){
            getMovie()
        }else{
            setpage(1)
            setMovie([])
            getMovie()     
        }
      }

      useEffect(() => {
        refreshHandler()
      }, [Category])

      return  movie.length>0 ? (
        <div className='w-screen h-screen  '>
            <div className='w-full flex items-center justify-between px-[5%]'>
            
                <h1 className=' text-2xl text-zinc-400 font-semibold'>
                <i onClick={()=> navigate(-1)}
                className="hover:text-[#7b40ff] ri-arrow-left-line"></i> {" "}  
                 movie<small className='ml-2 text-sm text-zinc-600'>({Category})</small>
                 </h1>
                <div className='flex items-center w-[80%]'>
                <Topnav />
                <div className='w-[2%]'></div>
                <Dropdown 
                title="Category" 
                options={["popular","top_rated","upcoming","Now_playing"]}
                func={(e)=>setCategory(e.target.value)}
                />
                <div className='w-[2%]'></div>
                
                </div>
    
            </div>
            <InfiniteScroll 
            dataLength={movie.length}
            next={getMovie}
            hasMore={hasMore}
            loader={<h1>Loading...</h1>}>
               
            <Cards data={movie} title="movies"/>
            </InfiniteScroll>
    
        </div>
      ) : (
        <Loading/>
      )
}

export default Movies