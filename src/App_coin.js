// https://nomadcoders.co/react-for-beginners/lectures/3288

import { useState, useEffect } from "react";

// api.coinpaprika.com/v1/tickers
function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [myMoney, setMyMoney] = useState(0);
  const [getCoin, setGetCoin] = useState(0);
  const writeMoney = (e) => setMyMoney(e.target.value);
  const selectCoin = (e) => setGetCoin(e.target.value);


  useEffect(()=>{
    fetch('https://api.coinpaprika.com/v1/tickers?limit=10')
    .then((response) => response.json())
    .then((json) => {
      // console.log(json)
      setCoins(json);
      setLoading(false);
    });
  },[])

  return (
    <div>
      <h1>The Coins! ({coins.length})</h1>
      <div>
        <input type="number" value={myMoney} onChange={writeMoney} placeholder="WRITE UR USD"></input>
      </div>
      {loading ? <strong>Loadings...</strong> :
        <div>
          <select onChange={selectCoin}>
              <option key="-1">
                select coin
              </option>
            {coins.map((coin, index) =>
              <option key={index} value={coin.quotes.USD.price}>
                {coin.name}({coin.symbol}): ${(coin.quotes.USD.price).toFixed(2)}
              </option>
              )
            }
          </select>
          <div>
            <h2>Coins you can buy: { getCoin > 0 ? (myMoney / getCoin).toFixed(2) : null}</h2>
          </div>
        </div>
      }


      {/* 
      <ul>
        {coins.map((coin, index)=>{
          return <li key={coin.id}>{coin.name} ({coin.symbol}): {coin.quotes.USD.price} USD </li>
        })}
      </ul>
       */}
    </div>
  )

}

export default App