import { Link } from "react-router-dom" 

const Sidenav = () => {

  
  return (
    <>
    <div className="w-[20%] h-screen border-r-2 border-zinc-400 p-8">
        <h1 className='text-xl text-white font-bold '>
        <i className="mr-2 text-[#6556CD] ri-tv-fill "></i>
        <span>SCSDB.</span> 
        </h1>
       <nav className='flex flex-col text-zinc-400 text-[1.3rem] gap-3'>
       <h1 className='text-white font-semibold text-xl mt-7 mb-3'>New feeds</h1>
        <Link to="/trending" className="hover:bg-[#6556CD] hover:text-white rounded-lg p-3 duration-300">
        <i className="ri-fire-fill"></i>     Trending
        </Link>
        <Link to='/popular' className="hover:bg-[#6556CD] hover:text-white rounded-lg p-3 duration-300">
        <i className="ri-bard-fill"></i>  Popular
        </Link>
        <Link to='/movies' className="hover:bg-[#6556CD] hover:text-white rounded-lg p-3 duration-300">
        <i className="ri-movie-fill"></i>    Movies
        </Link>
        <Link to='/tv' className="hover:bg-[#6556CD] hover:text-white rounded-lg p-3 duration-300">
        <i className="ri-tv-2-fill"></i>    TV shows
        </Link>
        <Link to='/person' className="hover:bg-[#6556CD] hover:text-white rounded-lg p-3 duration-300">
        <i className="ri-team-fill"></i>    People
        </Link>
        
       </nav>

        <hr className="border-none h-[1px] bg-zinc-400"/>
       <nav className='flex flex-col text-zinc-400 text-[1.3rem] gap-1'>
       <h1 className='text-white font-semibold text-xl mt-3 mb-2'>Website information</h1>
        <Link className="hover:bg-[#6556CD] hover:text-white rounded-lg p-3 duration-300">
        <i className="ri-contacts-fill"></i>     Contact Us
        </Link>
        <Link className="hover:bg-[#6556CD] hover:text-white rounded-lg p-3 duration-300">
        <i className="ri-information-fill"></i>  About SCSDB
        </Link>
       </nav>
    </div>
    </>
  )
}

export default Sidenav