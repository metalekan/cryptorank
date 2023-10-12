import React, { useContext, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { useNavigate, useParams } from 'react-router';
import { CryptoContext } from '../context/CryptoContext';

import { BiSolidDownArrow } from 'react-icons/bi';
import { BsTwitter, BsTelegram, BsDiscord } from 'react-icons/bs';
import Chart from './Chart';

const HighLowIndicator = ({ currentPrice, high, low }) => {
  const [green, setGreen] = useState()

  useEffect(() => {
    let total = high - low;
    let greenZone = ((high - currentPrice) * 100) / total;
    setGreen(Math.ceil(greenZone))
  }, [currentPrice, high, low])

  return (
    <>
      <span className='bg-red h-1.5 rounded-l-lg w-[50%]' style={{ width: `${100 - green}%` }}></span>
      <span className='bg-green h-1.5 rounded-r-lg w-[50%]' style={{ width: `${green}%` }}></span>
    </>
  )
}

const CryptoDetails = () => {
  const [isReveal, setIsReveal] = useState(false)
  const { coinId } = useParams();
  const navigate = useNavigate();

  const { getCoinData, coinData, currency } = useContext(CryptoContext)
  console.log(coinData)

  useEffect(() => {
    getCoinData(coinId);
  }, [coinId])

  const close = () => {
    navigate("..")
  }


  return ReactDOM.createPortal(
    <div className='fixed top-0 w-full h-full bg-gray-200 bg-opacity-80 first-letter:backdrop-blur-sm flex items-center justify-center font-nunito'
      onClick={close}
    >
      <div className="w-[95%] h-[75%] md:w-[65%] md:h-[75%] bg-gray-300 bg-opacity-15 rounded-lg text-white relative"
        onClick={(e) => e.stopPropagation()}
      >
        {
          coinData ?
            <div className='flex items-center justify-between h-full w-full p-2 relative'>
              <div className={`${isReveal ? 'hidden' : 'flex'} md:flex flex-col justify-between w-full md:w-[45%] h-full py-4`}>
                <div className="flex items-center w-full">
                  <img className='w-[3rem] h-[3rem] mx-1.5' src={coinData.image.large} alt={coinData.id} />
                  <h1 className='text-xl capitalize font-medium'>{coinData.name}</h1>
                  <span className='text-sm py-0.5 px-2 ml-2 bg-cyan text-cyan bg-opacity-25 rounded uppercase'>
                    {coinData.symbol}
                  </span>
                </div>

                <div className="flex w-full mt-6">
                  <div className="flex flex-col w-full">
                    <div className="flex justify-between">
                      <span className='text-sm capitalize text-gray-100'>price</span>
                      <div className={`text-sm px-1 ml-2 font-medium flex items-center rounded uppercase bg-opacity-25 ${coinData.market_data.price_change_percentage_24h > 0 ? "bg-green text-green" : "bg-red text-red"}`}>
                        <span>{Number(coinData.market_data.price_change_percentage_24h).toFixed(2)}%</span>
                        <BiSolidDownArrow className={`w-[1rem] ml-1 ${coinData.market_data.price_change_percentage_24h > 0 ? "text-green rotate-180" : "text-red"}`} />
                      </div>
                    </div>
                  </div>
                </div>

                <h2 className='text-lg font-bold'>
                  {new Intl.NumberFormat('en-US', { style: 'currency', currency: currency, maximumSignificantDigits: 5, }).format(coinData.market_data.current_price[currency])}
                </h2>

                <div className="flex w-full mt-4 justify-between">
                  <div className="flex flex-col">
                    <span className='text-sm capitalize text-gray-100'>Market Cap</span>
                    <h2 className='text-base font-bold'>
                      {new Intl.NumberFormat('en-US', { style: 'currency', currency: currency, minimumFractionDigits: 0, }).format(coinData.market_data.market_cap[currency])}
                    </h2>
                  </div>
                  <div className="flex flex-col">
                    <span className='text-sm capitalize text-gray-100'>fully diluted valuation</span>
                    <h2 className='text-base text-end font-bold'>
                      {new Intl.NumberFormat('en-US', { style: 'currency', currency: currency, notation: 'compact', }).format(coinData.market_data.fully_diluted_valuation[currency])}
                    </h2>
                  </div>
                </div>

                <div className="flex flex-col w-full mt-4 justify-between">
                  <span className='text-sm capitalize text-gray-100'>Total Volume</span>
                  <h2 className='text-base font-bold'>
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: currency, minimumFractionDigits: 0, }).format(coinData.market_data.total_volume[currency])}
                  </h2>
                </div>

                <div className="flex w-full mt-4 justify-between">
                  <HighLowIndicator
                    currentPrice={coinData.market_data.current_price[currency]}
                    high={coinData.market_data.high_24h[currency]}
                    low={coinData.market_data.low_24h[currency]}
                  />
                </div>

                <div className="flex w-full mt-4 justify-between">
                  <div className="flex flex-col">
                    <span className='text-sm capitalize text-gray-100'>Low 24H</span>
                    <h2 className='text-base font-bold'>
                      {new Intl.NumberFormat('en-US', { style: 'currency', currency: currency, minimumFractionDigits: 0, }).format(coinData.market_data.low_24h[currency])}
                    </h2>
                  </div>
                  <div className="flex flex-col">
                    <span className='text-sm capitalize text-gray-100'>High 24H</span>
                    <h2 className='text-base font-bold text-end'>
                      {new Intl.NumberFormat('en-US', { style: 'currency', currency: currency, minimumFractionDigits: 0, }).format(coinData.market_data.high_24h[currency])}
                    </h2>
                  </div>
                </div>

                <div className="flex w-full mt-4 justify-between">
                  <div className="flex flex-col">
                    <span className='text-sm capitalize text-gray-100'>Max Supply</span>
                    <h2 className='text-base font-bold'>
                      {new Intl.NumberFormat('en-US', { minimumFractionDigits: 0, }).format(coinData.market_data.max_supply)}
                    </h2>
                  </div>
                  <div className="flex flex-col">
                    <span className='text-sm capitalize text-gray-100 text-end'>Circ Supply</span>
                    <h2 className='text-base font-bold'>
                      {new Intl.NumberFormat('en-US', { minimumFractionDigits: 0, }).format(coinData.market_data.circulating_supply)}
                    </h2>
                  </div>
                </div>

                <div className="flex w-full mt-4 justify-between">
                  <div className="flex flex-col">
                    <a target='_blank' className='text-sm bg-gray-200 text-gray-100 px-1.5 py-0.5 my-1 rounded' href={coinData?.links?.homepage[0]}>{coinData?.links?.homepage[0].substring(0, 30)}</a>
                    <a target='_blank' className='text-sm bg-gray-200 text-gray-100 px-1.5 py-0.5 my-1 rounded' href={coinData?.links?.blockchain_site[0].substring(0, 30)}>{coinData?.links?.blockchain_site[0].substring(0, 30)}</a>
                    {
                      coinData?.links?.official_forum_url
                      [0] && <a target='_blank' className='text-sm bg-gray-200 text-gray-100 px-1.5 py-0.5 my-1 rounded' href={coinData?.links.official_forum_url
                      [0].substring(0, 30)}>{coinData?.links.official_forum_url
                      [0].substring(0, 30)}</a>
                    }
                  </div>
                  <div className="flex flex-col content-start">
                    <span className='text-end text-sm capitalize text-gray-100'>setiment</span>

                    <div className={`text-sm px-1 ml-2 my-1 font-medium flex items-center rounded uppercase bg-opacity-25 bg-green text-green`}>
                      <span>{Number(coinData.sentiment_votes_up_percentage).toFixed(2)}%</span>
                      <BiSolidDownArrow className={`w-[1rem] ml-1 text-green rotate-180`} />
                    </div>

                    <div className={`text-sm px-1 ml-2 my-1 font-medium flex items-center rounded uppercase bg-opacity-25 bg-red text-red`}>
                      <span>{Number(coinData.sentiment_votes_down_percentage).toFixed(2)}%</span>
                      <BiSolidDownArrow className={`w-[1rem] ml-1 text-red`} />
                    </div>
                  </div>
                </div>

              </div>

              <div className={`${isReveal ? 'flex' : 'hidden'} md:flex flex-col justify-between w-full md:w-[55%] h-full py-4 px-2`}>
                <Chart id={coinData.id} />

                <div className="flex flex-col gap-2 mt-4 capitalize">
                  <h3 className='text-white py-1 border w-fit rounded-md p-2'><span className='text-gray-100 mr-1 text-sm'>market cap rank: </span>{coinData.market_cap_rank}</h3>
                  <h3 className='text-white py-1  border w-fit rounded-md p-2'><span className='text-gray-100 mr-1 text-sm'>coinGecko rank: </span>{coinData.coingecko_rank}</h3>
                  <h3 className='text-white py-1  border w-fit rounded-md p-2'><span className='text-gray-100 mr-1 text-sm'>watchlist users: </span>{coinData.watchlist_portfolio_users}</h3>
                </div>

                <div className="flex items-center gap-4 self-end">
                  <a target={"_blank"} href={`https://twitter.com/${coinData.links.twitter_screen_name}`}><BsTwitter className='text-cyan text-lg' /></a>
                  <a target={"_blank"} href={`https://t.me/${coinData.links.telegram_channel_identifier}`}><BsTelegram className='text-cyan text-lg' /></a>
                  <a target={"_blank"} href={coinData.links.chat_url[0]}><BsDiscord className='text-cyan text-lg' /></a>
                </div>
              </div>

              <div className="absolute right-5 top-2 block md:hidden">
                <label className="switch border-2">
                  <input type="checkbox" onClick={() => setIsReveal((prev) => !prev)} />
                  <span className="slider">
                    <span className="circle"></span>
                  </span>
                </label>
              </div>

            </div> : <div className='w-full h-full flex items-center justify-center'>
              <div className='w-8 h-8 border-4 border-cyan rounded-full border-b-gray-200 animate-spin'
                role='status'
              />
              <span className='ml-3'>Please wait...</span>
            </div>

        }
      </div>
    </div>,
    document.getElementById("modal")
  )
};

export default CryptoDetails;