import React, { useContext, useEffect, useState } from 'react'

import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';

import { CryptoContext } from '../context/CryptoContext';


function CustomTooltip({ payload, label, active, currency }) {
    if (active && payload && payload.length > 0) {
        return (
            <div className="custom-tooltip">
                <p className="label text-sm text-cyan">{`${label} : ${new Intl.NumberFormat('en-US', { style: 'currency', currency: currency, minimumFractionDigits: 5, }).format(payload[0].value)}`}</p>
            </div>
        );
    }

    return null;
}

const ChartCompenent = ({ data, currency, type }) => {
    return (
        <ResponsiveContainer height={"90%"}>
            <LineChart width={400} height={400} data={data}>
                <Line type="monotone" dataKey={type} stroke="#14ffec" strokeWidth={"1px"} />
                <CartesianGrid stroke="#323232" strokeDasharray="3 3" />
                <XAxis dataKey="date" hide />
                <YAxis dataKey={type} hide domain={["auto", "auto"]} />
                <Tooltip content={<CustomTooltip currency={currency} />} cursor={false} wrapperStyle={{outline: "none"}}  />
                <Legend />
            </LineChart>
        </ResponsiveContainer>
    )
};

const Chart = ({ id }) => {
    const [chartData, setChartData] = useState();
    const {currency} = useContext(CryptoContext);
    const [type, setType] = useState("prices");
    const [days, setDays] = useState(7);

    useEffect(() => {
        const getChartData = async () => {
            try {
                const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=daily`);
                const data = await res.json();

                let newData = data[type].map((item) => {
                    return {
                        date: new Date(item[0]).toLocaleDateString(),
                        [type]: item[1],
                    }
                })
                // console.log(data);
                setChartData(newData)
            } catch (error) {
                console.log("Limit reached")
            }
        }

        getChartData(id)

    }, [id, type, days])



    return (
        <div className='w-full h-[60%]'>
            <ChartCompenent data={chartData} currency={currency} type={type} />
            <div className="flex capitalize">
                <button className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize ${type === "prices" ? 'bg-cyan text-cyan' : 'bg-gray-200 text-gray-100'}`} onClick={()=> {setType("prices")}}>price</button>
                <button className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize ${type === "market_caps" ? 'bg-cyan text-cyan' : 'bg-gray-200 text-gray-100'}`} onClick={()=> {setType("market_caps")}}>market cap</button>
                <button className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize ${type === "total_volumes" ? 'bg-cyan text-cyan' : 'bg-gray-200 text-gray-100'}`} onClick={()=> {setType("total_volumes")}}>total volume</button>

                <button className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize ${days === 7 ? 'bg-cyan text-cyan' : 'bg-gray-200 text-gray-100'}`} onClick={()=> {setDays(7)}}>7d</button>
                <button className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize ${days === 14 ? 'bg-cyan text-cyan' : 'bg-gray-200 text-gray-100'}`} onClick={()=> {setDays(14)}}>14d</button>
                <button className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize ${days === 30 ? 'bg-cyan text-cyan' : 'bg-gray-200 text-gray-100'}`} onClick={()=> {setDays(30)}}>30d</button>
            </div>
        </div>
    )
}

export default Chart