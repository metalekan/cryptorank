import React from "react";
import { useNavigate } from "react-router-dom";

const TrendingCoin = ({ data }) => {
  // console.log(data);
  let navigate = useNavigate();

  const getCoinDetail = (id) => {
    navigate(`${id}`);
  }
  return (
    <div className="w-full md:w-[40%] bg-gray-200 mb-8 last:mb-0 rounded-lg p-4 relative cursor-pointer hover:bg-gray-100 hover:bg-opacity-40" onClick={() => getCoinDetail(data.id)}>
      {data ? (
        <div className="">
          <h3 className="text-base flex items-center">
            <span className="capitalize text-gray-100">name:&nbsp;</span>
            <span className="text-cyan">{data.name}</span>
            <img className="w-[1.5rem] h-[1.5rem] rounded-full mx-1.5" src={data.small} alt={data.name} />
          </h3>
          <h3 className="text-base flex items-center">
            <span className="capitalize text-gray-100">market cap rank:&nbsp;</span>
            <span className="text-cyan">{data.market_cap_rank}</span>
          </h3>
          <h3 className="text-base flex items-center">
            <span className="capitalize text-gray-100">price:&nbsp;</span>
            <span className="text-cyan">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "btc",
                maximumSignificantDigits: 5,
              }).format(data.price_btc)}
            </span>
          </h3>
          <h3 className="text-base flex items-center">
            <span className="capitalize text-gray-100">score:&nbsp;</span>
            <span className="text-cyan">{data.score}</span>
          </h3>
          <img className="hidden lg:block w-[35%] h-full rounded-full absolute md:top-2/4 md:-right-12 -translate-y-2/4 object-contain" src={data.large} alt={data.name} />
        </div>
      ) : ( <div className='w-full h-full flex items-center justify-center'>
        <div className='w-8 h-8 border-4 border-cyan rounded-full border-b-gray-200 animate-spin'
          role='status'
        />
        <span className='ml-3'>Please wait...</span>
      </div> )
      }
    </div>
  );
};

export default TrendingCoin;
