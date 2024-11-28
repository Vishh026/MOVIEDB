import axios from '../Utils/axios';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from './Loading'
import Cards from './Cards'
import Topnav from './partials/Topnav';
import InfiniteScroll from 'react-infinite-scroll-component';

const People = () => {
    document.title = "SCSDB | persons";

    const navigate = useNavigate();
    const [Category, setCategory] = useState("popular")
    const [person, setperson] = useState([]);
    const [page, setpage] = useState(1)
    const [hasMore, setHasMore] = useState(true)

    const getPerson = async () => {
        try {
          const { data } = await axios.get(`person/${Category}?page=${page}`);

          if(data.results.length > 0) {
            setperson((prevState)=>[...prevState, ...data.results])
            setpage(page + 1)
          }else{
            setHasMore(false)
          }

        } catch (error) {
          console.log("Error fetching search results", error);
        }
      };

      const refreshHandler = () => {
        if(person.length === 0){
            getPerson()
        }else{
            setpage(1)
            setperson([])
            getPerson()     
        }
      }

      useEffect(() => {
        refreshHandler()
      }, [Category])
  
      return person.length>0 ? (
        <div className='w-screen h-screen  '>
            <div className='w-full flex items-center justify-between px-[5%]'>
            
                <h1 className=' text-2xl text-zinc-400 font-semibold'>
                <i onClick={()=> navigate(-1)}
                className="hover:text-[#7b40ff] ri-arrow-left-line"></i> {" "}  
                 person
                 </h1>
                <div className='flex items-center w-[80%]'>
                <Topnav />
                <div className='w-[2%]'></div>
                
                
                </div>
    
            </div>
            <InfiniteScroll 
            dataLength={person.length}
            next={getPerson}
            hasMore={hasMore}
            loader={<h1>Loading...</h1>}>
               
            <Cards data={person} title="people"/>
            </InfiniteScroll>
    
        </div>
      ) : (
        <Loading/>
      )
}

export default People