import { useEffect, useState } from 'react'
import axios from '../../Utils/axios';
import { Link } from 'react-router-dom';
import { debounce } from 'lodash';
import noimage from '/no-image.jpg'


const Topnav = () => {

    const [ query,setquery ] = useState("");
    const [ searches ,setSearches ] = useState([]);

    const getSearches = debounce(async () => {
        try {
          const {data} = await axios.get(`/search/multi?query=${query}`)
          setSearches(data.results)
        } catch (error) {
          console.log("Error fetching search results",error)
        }
      },300)
    
      useEffect(()=>{
       getSearches()
      },[query])
      

  return (
    <div className='w-[80%] mx-auto h-[10vh] relative z-index-[100] flex items-center '>
        <i className=" text-zinc-400 text-2xl ri-search-line"></i>
        <input 
        onChange={(e) => setquery(e.target.value)}
        value={query} 
        type="text" 
        className='w-[50%] mx-10 p-5 text-xl text-zinc-200 outline-none border-none bg-transparent ' placeholder='Search anything' />
        {query.length > 0 &&  (
            <i
            onClick={()=> setquery("")}
             className=" absolute right-0 text-3xl text-zinc-400 ri-close-line"></i>
        )}
        
        {/* searching images */}
        <div 
        className='w-[50%] max-h-[50vh] absolute bg-zinc-200 top-[100%] left-[5%] overflow-auto z-[100]'>
            {searches.map((s,i)=> (
             
                <Link
                to={`/${s.media_type || "movie" }/details/${s.id}`}
                 key={i} className='text-zinc-600 font-semibold hover:text-black hover:bg-zinc-300 w-[100%] p-8 flex justify-start items-center border-b-2 border-zinc-100 duration-100'>
                 <img 
                 src={
                  s.backdrop_path || 
                  s.profile_path ? `https://image.tmdb.org/t/p/original/${s.backdrop_path ||
                    s.profile_path}` : noimage
                 }
                 className='w-[10vh] h-[10vh] object-cover rounded-lg mr-5 ml-10 shadow-lg' alt="" />
                 <span>{s.name || 
                        s.title || 
                        s.original_title  || 
                        s.original_name}
                  </span>
                </Link>
                
            ))}
        </div>
    </div>
  )
}

export default Topnav