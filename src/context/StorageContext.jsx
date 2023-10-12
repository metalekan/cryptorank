import { createContext, useContext, useEffect, useState } from "react";
import { CryptoContext } from "./CryptoContext";

// create context object
export const StorageContext = createContext({});

// create the provider component
export const StorageProvider = ({ children }) => {
    const [allCoins, setAllCoins] = useState([]);
    const [savedData, setSavedData] = useState([]);

    const { currency, sortBy } = useContext(CryptoContext);
    
    const saveCoins = (coinId)=> {
        let oldCoins = JSON.parse(localStorage.getItem("coins"));

        if (oldCoins.includes(coinId)) {
            return null;
        } else {
            let newCoin = [...oldCoins, coinId];
            setAllCoins(newCoin);
            localStorage.setItem("coins", JSON.stringify(newCoin))
        }
    }

    const removeCoin = (coinId) => {
        let oldCoins = JSON.parse(localStorage.getItem("coins"));

        let newCoin = oldCoins.filter(coin => coin !== coinId);
        setAllCoins(newCoin);
        localStorage.setItem("coins", JSON.stringify(newCoin))

    }

    const getSavedData = async(totalCoins = allCoins) => {
        try {
            const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${totalCoins.join(",")}&order=${sortBy}&sparkline=false&price_change_percentage=1h%2C24h%2C7d&locale=en`);
            const data = await res.json();
            setSavedData(data);
            // console.log(data);
        } catch (error) {
            console.log("Limit reached")
        }
    }

    const resetSavedData = () => {
        getSavedData();
        console.log("first")
    }

    useEffect(() => {
        if (allCoins.length > 0) {
            getSavedData(allCoins)
        } else {
            setSavedData();
        }
    }, [allCoins])


    useEffect(() => {
        let isThere = JSON.parse(localStorage.getItem("coins")) || false;

        if (!isThere) {
            //Set the local storage with an empty array
            localStorage.setItem("coins", JSON.stringify([]))
        } else {
            //Set the state with the current value from the local storage 
            let totalCoins = JSON.parse(localStorage.getItem("coins"))
            setAllCoins(totalCoins)
            if (totalCoins.length > 0) {
                getSavedData(totalCoins);
            }
        }
    }, [])

    return (
        <StorageContext.Provider
            value={{
                saveCoins, allCoins, removeCoin, savedData, resetSavedData
            }}>
            {children}
        </StorageContext.Provider>
    )
}