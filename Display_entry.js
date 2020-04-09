import React,  {useState , useEffect} from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import Loading from './loading.gif';
import App from './App.css'
import {Table} from 'reactstrap'
import {Form,Button} from 'react-bootstrap'


function Display_entry({match}){

    useEffect(()=>{

        fectchItem()
        console.log(match)
        console.log("clicked")
    },[]);

    const[crypto , setCrypto]=useState(null);

    const fectchItem=async()=>{
        const data= await fetch
        (`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${match.params.id}&order=market_cap_desc&per_page=100&page=1&sparkline=false`);
        const info=await data.json();
        console.log(info)
        setCrypto(info);
    }

    
      
      
  

    return(
      <div>
        
        {crypto === null ? <img src={Loading} alt="Loading..." height="100px" width="100px" className=" mx-auto d-block"/> : 
        <div>
          <h1 className="mx-5 ">
            {crypto[0].name} &nbsp;&nbsp;${crypto[0].current_price}
          </h1>
          <Table className="tab">
                        <thead>
                            <tr className="text-center">
                              <th>Highest(24h)</th>
                              <td>{crypto[0].high_24h}</td>
                            </tr>
                        </thead>
                        <thead>
                            <tr className="text-center">
                            <th>Lowest(24h)</th>
                            <td>{crypto[0].low_24h}</td>
                            </tr>
                        </thead>
                        <thead>
                            <tr className="text-center">
                            <th>Last Updated</th>
                            <td>{crypto[0].last_updated}</td>
                            </tr>
                        </thead>
                        <thead>
                            <tr className="text-center">
                            <th>Total Supply</th>
                            <td>{crypto[0].total_supply}</td>
                            </tr>
                        </thead>
                        <thead>
                            <tr className="text-center">
                            <th>Market capacity</th>
                            <td>{crypto[0].market_cap}</td>
                            </tr>
                        </thead>
                        <thead>
                            <tr className="text-center">
                            <th>All-Time High</th>
                            <td>{crypto[0].ath}</td>
                            </tr>
                        </thead>

                        <tbody>
                        </tbody>
                </Table>
                
        </div>
        
        }
        
      </div>
      
    );

}
export default Display_entry;