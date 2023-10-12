import React, { useContext } from "react";
import {BiRefresh} from 'react-icons/bi';
import { TrendingContext } from "../context/TrendingContext";
import TrendingCoin from "../components/TrendingCoin";
import { Outlet } from "react-router";

const Trending = () => {
  const { trendData, resetTrendData } = useContext(TrendingContext);

  return (
    <section className="w-full md:w-[80%] h-full flex flex-col my-16 mfb-24 relative">
      <div className="w-full min-h-[60vh] py-4 md:py-8 px-4 flex flex-wrap flex-col md:flex-row justify-evenly mt-9 border-2 border-gray-100 rounded-md">
        {
          trendData && trendData.map(coin => <TrendingCoin key={coin.coin_id} data={coin.item} />)
        }
        <button className='w-[2rem] ml-4 hover:scale-110 transition-all transition-ease absolute right-0 -top-10' onClick={resetTrendData} >
          <BiRefresh className='text-cyan text-lg'/>
        </button>
      </div>
      <Outlet/>
    </section>
  );
};

export default Trending;
