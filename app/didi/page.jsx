
async function getPriceData() {
  const res = await fetch('https://juniorlaringozyaslari.vercel.app/api/coinprice');

  if (!res.ok) {
    
    throw new Error('Failed to fetch data');
  }
 
  return res.json();
}
async function getCoinData() {
  const res = await fetch('https://juniorlaringozyaslari.vercel.app/api/coininfo');

 
  
  if (!res.ok) {
   
    throw new Error('Failed to fetch data');
  }
 
  return res.json();

}


export default async function Page() {
  const coinPriceData = await getPriceData();
  const coinData = await getCoinData();  
 
  // Promise Önemli :) 
 const [coinprice, coin] = await Promise.all([coinPriceData, coinData]);

const coinPrices= coinprice.coinprices;
const coinList= coin.coinlist;


const matchedData = [];

coinPrices.forEach((coinPriceObj) => {
  const matchingCoin = coinList.find((coin) => coin.Coin === coinPriceObj.coinName);

  if (matchingCoin) {
    const coinPrice = coinPriceObj.coinPrice;
    const coinData = {
      coin: matchingCoin.Coin,
      name: matchingCoin.Name,
      price: coinPrice,
   
    };
    matchedData.push(coinData);
  }
});


console.log(matchedData);

  


  return(
    <main>
        adana
        {matchedData.map((price,i)=> (
            <div className="flex items-center gap-3 justify-center bg-gray-700" key={i} >
            
              {price.coin}  {" - "} 

              {price.name}  {" - "} 
              {price.price}
               
                </div>
            
        ))}
    </main>
  )
} 



     
  