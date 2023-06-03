"use client"
import React, { useEffect, useState } from 'react';

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const priceData = await getPriceData();
    const coinData = await getCoinData();

    const mergedData = mergeData(priceData, coinData);
    setData(mergedData);
  };

  const getPriceData = async () => {
    const response = await fetch('https://juniorlaringozyaslari.vercel.app/api/coinprice');
    const data = await response.json();
    return data;
  };

  const getCoinData = async () => {
    const response = await fetch('https://juniorlaringozyaslari.vercel.app/api/coininfo');
    const data = await response.json();
    return data;
  };

  const mergeData = (priceData, coinData) => {
    const mergedData = [];

    priceData.forEach((priceItem) => {
      const coinName = priceItem.coinName;

      const coinItem = coinData.find((coin) => coin.name === coinName);

      if (coinItem) {
        const mergedItem = {
          coinName,
          price: priceItem.price,
          // Diğer ortak değerleri de ekleyebilirsiniz
        };
        mergedData.push(mergedItem);
      }
      console.log(mergedData)
    });

    return mergedData;
  };

  return (
    <div>
      <h1>Merged Data</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            Coin: {item.coinName}, Price: {item.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
