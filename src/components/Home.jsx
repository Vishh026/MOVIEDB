import Sidenav from "./partials/Sidenav";
import Topnav from "./partials/Topnav";
import axios from "../Utils/axios";
import Header from "./partials/Header";
import HorizontalCards from "./partials/HorizontalCards";
import { useEffect, useState } from "react";
import Dropdown from "./partials/Dropdown";
import Loading from "./Loading";

const Home = () => {
  document.title = "SCSDB | Homepage";
  const [wallpaper, setWallpaper] = useState(null);
  const [trending, setTrending] = useState(null);
  const [Category, setCategory] = useState("all")

  const getHeaderWallpaper = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      let randomData =
        data.results[(Math.random() * data.results.length).toFixed()];
      setWallpaper(randomData);
    } catch (error) {
      console.log("Error fetching search results", error);
    }
  };
  const getTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${Category}/day`);
      setTrending(data.results);
    } catch (error) {
      console.log("Error fetching search results", error);
    }
  };

  useEffect(() => {
    getTrending();
    !wallpaper && getHeaderWallpaper();
  }, [Category]);
  

  return wallpaper && trending ? (
    <>
      <Sidenav className="overflow-auto overflow-x-hidden" />
      <div className="w-[80%] h-full overflow-auto">
        <Topnav />
        {/* wallpaer */}
        <Header data={wallpaper} />
        {/* trending movies  in x-axis */} 
        <div className="my-5 flex justify-between p-2">
        <h1 className="text-2xl text-zinc-400 font-semibold">
          Trending
        </h1>
      {/* dropdown */}
        <Dropdown title="Filter" options={['tv','movie','all']} func={(e)=>setCategory(e.target.value)}/>
      </div>
        <HorizontalCards data={trending} />
      </div>
    </>
  ) : (
    <Loading/>
  );
};

export default Home;
