import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Topnav from './partials/Topnav';
import Dropdown from './partials/Dropdown';
import axios from '../Utils/axios'
import Loading from './Loading'
import Cards from './Cards'
import InfiniteScroll from 'react-infinite-scroll-component';



const Trending = () => {
    const navigate = useNavigate();
    const [Category, setCategory] = useState("all")
    const [Duration, setDuration] = useState("day")
    const [trending, settrending] = useState([]);
    const [page, setpage] = useState(1)
    const [hasMore, setHasMore] = useState(true)

    
    const getTrending = async () => {
        try {
          const { data } = await axios.get(`/trending/${Category}/${Duration}?page=${page}`

          );
          if(data.results.length > 0) {
            setpage(page + 1)
            settrending((prevState)=>[...prevState, ...data.results])
          }else{
            setHasMore(false)
          }

        } catch (error) {
          console.log("Error fetching search results", error);
        }
      };

      const refreshHandler = () => {
        if(trending.length === 0){
            getTrending()
        }else{
            setpage(1)
            settrending([])
            getTrending()
            
        }
      }

      useEffect(() => {
        refreshHandler()
      }, [Category, Duration])


  return  trending.length>0 ? (
    <div className='w-screen h-screen  '>
        <div className='w-full flex items-center justify-between px-[5%]'>
        
           
            <h1 className=' text-2xl text-zinc-400 font-semibold'>
            <i onClick={()=> navigate(-1)}
            className="hover:text-[#7b40ff] ri-arrow-left-line"></i>    trending</h1>
            <div className='flex items-center w-[80%]'>
            <Topnav />
            <Dropdown 
            title="Category" 
            options={["movies","tv","all"]}
            func={(e)=>setCategory(e.target.value)}
            />
            <div className='w-[2%]'></div>
             <Dropdown 
            title="Duration" 
            options={["week","day"]}
            func={(e)=> setDuration(e.target.value)}
            />
            </div>

        </div>
        <InfiniteScroll 
        dataLength={trending.length}
        next={getTrending}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}>
           
        <Cards data={trending} title={Category} />
        </InfiniteScroll>

    </div>
  ) : (
    <Loading/>
  )
}

export default Trending