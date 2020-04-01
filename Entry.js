 import React , {Component , useState} from  'react'
import {Table} from 'reactstrap'
import {Navbar,Nav,NavDropdown,Form,FormControl,Button} from 'react-bootstrap'
import style from './style.css'
import Loading from './loading.gif';
import "bootstrap/dist/css/bootstrap.min.css";
import {default as localforage} from 'localforage';
import ReactDOM from 'react-dom'

const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();

class Entry extends Component{

    state={
        loading:true,
        cryptos:[],
        searchData:null,
        item:[],
        clickData:[],
        marketP:[]
        

    };
    
    componentWillMount(){
        localStorage.getItem('coins') && this.setState({
            cryptos:JSON.parse(localStorage.getItem('coins')),
            loading:false
        })
    }


     componentDidMount(){
         if(!localStorage.getItem('coins')){
            this.fetchData()
         }
         else{
            console.log('data from local storage!')
         }
        
        
    }

    search(key){
        console.log(key);
        fetch("https://api.coingecko.com/api/v3/coins/list?q="+key)
        .then((data)=>{
            data.json().then((resp)=>{
                console.warn("resp:",resp)
                this.setState({searchData:resp})
            }) 
        })
    
    }
    async fetchData(){
        
        let info = await CoinGeckoClient.coins.all();
            console.log(info);
            this.setState({cryptos:info.data , loading:false})
            
    }
    
    clickMe(crypto){
        console.log(crypto);
        this.setState({clickData:crypto})
        const htm=(
            <div className="card card-body my-3 mx-3" >
                
                    <div className="input-group">
                        {this.state.clickData.id}<br></br>
                        {/* <img src={this.state.clickData.thumb}  alt="symbol"/> */}
                        {this.state.clickData.name}<br></br>
                        {this.state.clickData.symbol}<br></br>
                        {this.state.clickData.usd}<br></br>                        
                    </div>
            </div>
        )
        ReactDOM.render(htm, document.getElementById('tab'));
    }
        
        
    

    async marketPrice(){
        const url_market=
        `https://api.coingecko.com/api/v3/coins/${this.state.clickData.id}/market_chart?vs_currency=usd&days=0`
        const response_market= await fetch(url_market);
        const info_market = await response_market.json();
        console.log(info_market);
        this.setState({marketP:info_market , loading:false})
    }


    componentWillUpdate(nextProps,nextState){
        localStorage.setItem('coins',JSON.stringify(nextState.cryptos));
        
    }
    


    render(){      
        
        if(this.state.loading){
            return(<div><img src={Loading} alt="Loading..." height="100px" width="100px" className=" mx-auto d-block"/></div>)
        }

        if(!this.state.cryptos.length){
            return(<div>List Not Found!</div>)
        }
        

            
        
        const cryptoJsx=this.state.cryptos.map(crypto=>(
            <tr key={crypto.id}>

                    
                    
                    {/* <td><a onClick={this.clickMe.bind(this,crypto)} >{crypto.id}</a></td> */}
                    <td><a onClick={this.clickMe.bind(this,crypto)} className="point">
                        <img src={crypto.image.thumb}  alt="symbol"/>{crypto.id}</a></td>
                    <td><a onClick={this.clickMe.bind(this,crypto)} className="point">{crypto.symbol}</a></td>
                    <td><a onClick={this.clickMe.bind(this,crypto)} className="point">{crypto.name}</a></td>
                    <td><a onClick={this.clickMe.bind(this,crypto)} className="point">{crypto.market_data.current_price.usd}</a></td>
                    <td><a onClick={this.clickMe.bind(this,crypto)} className="point">{crypto.market_data.total_volume.usd}</a></td>                   
            
            </tr>
        ));

        return(
            <div>                    
                <h2 className="text-capitalize text-center my=5">Cryptocurrencies </h2>
                <div className="float-right p-2">
                <Form inline>
                <input type="text" placeholder="Search" className="mr-sm-2" 
                onChange={(event)=>this.search(event.target.value)}/>
                <Button >Search</Button>
                </Form>
                </div>
                <p id="tab">
                {/* <div className="card card-body my-3 mx-3" >
                
                    <div className="input-group">
                        {this.state.clickData.name}<br></br>
                        {this.state.clickData.trade_volume_24h_btc_normalized}<br></br>
                        {this.state.clickData.year_established}<br></br>
                        {this.state.clickData.country}<br></br>
                        
                        
                    </div>
                    
            </div> */}
            </p>
                    
                

                <Table striped bordered hover>
                        <thead>
                            <tr className="text-center">
                            <th>Id</th>
                            <th>Symbol</th>
                            <th>Name</th>
                            <th>Current Price</th>
                            <th>Total Volume</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cryptoJsx} 
                        </tbody>
                </Table>
            </div>
        )
    }
}

export default Entry
