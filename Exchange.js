import React , {Component} from  'react'
import {Table} from 'reactstrap'
import Loading from './loading.gif';
import style from './style.css'
import {Navbar,Nav,NavDropdown,Form,FormControl,Button} from 'react-bootstrap'
import ReactDOM from 'react-dom'


const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();

class Exchange extends Component{

    state={
        loading:true,
        cryptos:[],
        clickData:[],
    };
    
    componentWillMount(){
        localStorage.getItem('Exchanges') && this.setState({
            cryptos:JSON.parse(localStorage.getItem('Exchanges')),
            loading:false
        })
    }

     componentDidMount(){
         if(!localStorage.getItem('Exchanges')){
            this.fetchDataEx()
         }
         else{
            console.log('data from local storage!')
         }
        
        
    }
    async fetchDataEx(){
            let info_ex = await CoinGeckoClient.exchanges.all();
            console.log(info_ex);
            this.setState({cryptos:info_ex.data , loading:false})
    }

    search(key){
        console.log(key);
        fetch("https://api.coingecko.com/api/v3/exchanges/list?q="+key)
        .then((data)=>{
            data.json().then((resp)=>{
                console.warn("resp:",resp)
                this.setState({searchData:resp})
            }) 
        })
    
    }
    
    clickMe(crypto){
        
        // alert(crypto.id);
        console.log(crypto);
        this.setState({clickData:crypto})
        const htm=(
            <div className="card card-body my-3 mx-3" >
                
                    <div className="input-group">
                        Name:{crypto.name}<br></br>
                        Volume{crypto.trade_volume_24h_btc_normalized}<br></br>
                        Year:{crypto.year_established}<br></br>
                        Country:{crypto.country}<br></br>
                    </div>
                    
            </div>
        )
        ReactDOM.render(htm, document.getElementById('tab'));
    }
    
    componentWillUpdate(nextProps,nextState){
        localStorage.setItem('Exchanges',JSON.stringify(nextState.cryptos));
        localStorage.setItem('Date',Date.now());
    }


    render(){

        if(this.state.loading){
            return(<div><img src={Loading} alt="Loading..." height="100px" width="100px" className=" mx-auto d-block"/></div>)
        }

        if(!this.state.cryptos.length){
            return(<div>List Not Found!</div>)
        }

        

        const cryptoJsx_ex = [].concat(this.state.cryptos)
                        .sort((a, b) => a.trade_volume_24h_btc_normalized > b.trade_volume_24h_btc_normalized)
                        .map((crypto) => (
                            <tr key={crypto.id}>
                                    
                                    <td ><a onClick={this.clickMe.bind(this,crypto)} className="point">{crypto.symbol}
                                    <img src={crypto.image} className="mx-auto d-block" height="25px" width="25px" alt="symbol"/></a></td>
                                    <td ><a onClick={this.clickMe.bind(this,crypto)} className="point">{crypto.name}</a></td>
                                    <td ><a onClick={this.clickMe.bind(this,crypto)} className="point">{crypto.trade_volume_24h_btc_normalized}</a></td>
                                    <td ><a onClick={this.clickMe.bind(this,crypto)} className="point">{crypto.year_established}</a></td>
                                    <td ><a onClick={this.clickMe.bind(this,crypto)} className="point">{crypto.country}</a></td>
                                    
                            </tr>
                            

                        )
                      );

        return(
            <div>
                <h2 className="text-capitalize text-center my=12">Exchanges</h2>
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
        )
    }

    
}

export default Exchange
