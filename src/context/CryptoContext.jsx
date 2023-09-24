import { createContext, useEffect, useState } from "react";


// create context object
export const CryptoContext = createContext({});

// create the provider component
export const CryptoProvider = ({ children }) => {
    const [cryptoData, setCryptoData] = useState();
    const [searchData, setSearchData] = useState();
    const [coinData, setCoinData] = useState();

    const [coinSearch, setCoinSearch] = useState("");

    const [currency, setCurrency] = useState("usd");
    const [sortBy, setSortBy] = useState("market_cap_desc");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(250);
    const [perPage, setPerPage] = useState(20)

    
    const getCryptoData = async() => {
        try {
            const res = await fetch(`https://api.coingecko.com/api/v3/coins/list`);
            const data = await res.json();
            setTotalPages(data.length)
        } catch (error) {
            console.log("Limit reached")
        }

        try {
            const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${coinSearch}&order=${sortBy}&per_page=${perPage}&page=${page}&sparkline=false&price_change_percentage=1h%2C24h%2C7d&locale=en`);
            const data = await res.json();
            setCryptoData(data);
            console.log(data);
        } catch (error) {
            console.log("Limit reached")
        }
    }

    const getCoinData = async(coinId) => {
        try {
            const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=true&sparkline=false`);
            const data = await res.json();
            console.log(data)
            setCoinData(data);
        } catch (error) {
            console.log(error);
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

    const resetFunction = () => {
        setPage(1)
        setCoinSearch("")
    }

    useEffect(()=> {
        getCryptoData();
    }, [coinSearch, currency, sortBy, page, perPage, setPerPage])

    return (
        <CryptoContext.Provider 
            value={{ 
                cryptoData, 
                searchData, 
                coinData,
                getCoinData,
                getSearchResult, 
                setCoinSearch, 
                setSearchData, 
                currency, 
                setCurrency, 
                sortBy, 
                setSortBy, 
                page, 
                setPage, 
                totalPages,
                resetFunction, perPage, setPerPage}}>
            {children}
        </CryptoContext.Provider>
    )
}