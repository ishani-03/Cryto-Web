import React,  {useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Table} from 'reactstrap'
import {Form,Button} from 'react-bootstrap'
// import style from './style.css'
// import Loading from './loading.gif';
import "bootstrap/dist/css/bootstrap.min.css";


const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();

function Entry(){

    useEffect(()=>{
        fetchItems_ex();
    },[]);

    const[cryptos_ex,setCryptos_ex]=useState([]);
    const [origCryptosCount, setOrigCryptosCount] = useState([]);

    const fetchItems_ex=async()=>{
           const info_ex = await CoinGeckoClient.exchanges.all();
            console.log(info_ex.data);
            setCryptos_ex(info_ex.data)
            
            
    }

    const Search = key => {
        const newResults = origCryptosCount.filter(crypto => crypto.name.includes(key));
        console.log('newResults', newResults);
        setCryptos_ex(newResults);
      };

    const cryptoJsx_ex = [].concat(cryptos_ex)
                        .sort((a, b) => a.trade_volume_24h_btc_normalized > b.trade_volume_24h_btc_normalized)
                        .map((crypto_ex) => (
                            <tr key={crypto_ex.id}>
                                    
                                    <td><Link  to={`/exchange/${crypto_ex.id}`}>{crypto_ex.symbol}
                                    <img src={crypto_ex.image} 
                                    className="mx-auto d-block" height="25px" width="25px" alt="symbol"/></Link></td>
                                    <td><Link  to={`/exchange/${crypto_ex.id}`}><span className="text-dark">{crypto_ex.name}</span></Link></td>
                                    <td><Link  to={`/exchange/${crypto_ex.id}`}>{crypto_ex.trade_volume_24h_btc_normalized}</Link></td>
                                    <td><Link  to={`/exchange/${crypto_ex.id}`}><span className="text-dark">{crypto_ex.year_established}</span></Link></td>
                                    <td><Link  to={`/exchange/${crypto_ex.id}`}><span className="text-dark">{crypto_ex.country}</span></Link></td>
                                    
                            </tr>

                        )
                      );

    return(
        <div>
                <h2 className="text-capitalize text-center my=12">Exchanges</h2>
                <div className="float-right p-2">
                <Form inline>
                <input type="text" placeholder="Search" className="mr-sm-2"
                onChange={event => Search(event.target.value)} />
                <Button >Search</Button>
                </Form>
                </div>
                 <Table striped bordered hover>
                        <thead>
                            <tr className="text-center">
                            <th>Symbol</th>
                            <th>Name</th>
                            <th>Volume(normalized)</th>
                            <th>Year</th>
                            <th>Country</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cryptoJsx_ex} 
                        </tbody>
                </Table>
            </div>
    );

}
export default Entry