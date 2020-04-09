import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom'
import {Table} from 'reactstrap'
import {Form,Button} from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css";

function Entry() {
  const [item, SearchData] = useState([]);
  const [cryptos, setCryptos] = useState([]);
  const [origCryptosCount, setOrigCryptosCount] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const url = "https://api.coingecko.com/api/v3/coins/list";
    const response = await fetch(url);
    const info = await response.json();
    console.log(info)
    setCryptos(info);
    setOrigCryptosCount(info);
  };

  const Search = key => {
    const newResults = origCryptosCount.filter(crypto => crypto.name.includes(key));
    console.log('newResults', newResults);
    setCryptos(newResults);
  };

  const cryptoJsx=cryptos.map(crypto=>(
    <tr key={crypto.id}>
            <td className="point">
            {/* <img src={crypto.image.thumb}  alt="symbol"/> */}
            <Link  to={`/entry/${crypto.id}`}>{crypto.id}</Link></td>
            <td className="point"><Link  to={`/entry/${crypto.id}`}>{crypto.symbol}</Link></td>
            <td className="point"><Link  to={`/entry/${crypto.id}`}>{crypto.name}</Link></td>
            {/* <td className="point"><Link  to={`/entry/${crypto.id}`}>{crypto.market_data.current_price.usd}</Link></td>
            <td className="point"><Link  to={`/entry/${crypto.id}`}>{crypto.market_data.total_volume.usd}</Link></td>                    */}
    
    </tr>
));

  return (

<div>                    
                <h2 className="text-capitalize text-center my=5">Cryptocurrencies </h2>
                <div className="float-right p-2">
                <Form inline>
                <input type="text" placeholder="Search.." className="mr-sm-2" 
                  onChange={event => Search(event.target.value)} />
                <Button >Search</Button>
                </Form>
                </div>
                <Table striped bordered hover>
                        <thead>
                            <tr className="text-center">
                            <th>Id</th>
                            <th>Symbol</th>
                            <th>Name</th>
                            {/* <th>Current Price</th>
                            <th>Total Volume</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {cryptoJsx} 
                        </tbody>
                </Table>
                
            </div>
  );
}

export default Entry;
