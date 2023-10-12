import { createContext, useEffect, useState } from "react";


// create context object
export const TrendingContext = createContext({});

// create the provider component
export const TrendingProvider = ({ children }) => {
    const [trendData, setTrendData] = useState();
    
    const getTrendData = async() => {
        try {
            const res = await fetch(`https://api.coingecko.com/api/v3/search/trending`);
            const data = await res.json();
            setTrendData(data.coins);
            console.log(data.coins);
        } catch (error) {
            setTrendData();
            console.log("Limit reached")
        }
    }

    const resetTrendData = () => {
        getTrendData();
        console.log("first")
    }

    useEffect(()=> {
        getTrendData();
    }, [])

    return (
        <TrendingContext.Provider 
            value={{ 
                trendData, 
                resetTrendData}}>
            {children}
        </TrendingContext.Provider>
    )
}