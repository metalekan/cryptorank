import { createContext, useEffect, useState } from "react";


// create context object
export const CryptoContext = createContext({});

// create the provider component
export const CryptoProvider = ({ children }) => {
    const [cryptoData, setCryptoData] = useState();
    const [searchData, setSearchData] = useState();

    const getCryptoData = async() => {
        try {
            const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d&locale=en`);
            const data = await res.json();
            setCryptoData(data);
        } catch (error) {
            console.log(error)
        }
    }

    const getSearchResult = async(query) => {
        try {
            const res = await fetch(`https://api.coingecko.com/api/v3/search?query=${query}
            `);
            const data = await res.json();
            setSearchData(data.coins);
            console.log(data.coins)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=> {
        getCryptoData();
    })

    return (
        <CryptoContext.Provider value={{ cryptoData, searchData, getSearchResult }}>
            {children}
        </CryptoContext.Provider>
    )
}