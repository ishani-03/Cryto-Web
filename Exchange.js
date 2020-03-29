import React , {Component} from  'react'
import {Table} from 'reactstrap'
import Loading from './loading.gif';
import {Navbar,Nav,NavDropdown,Form,FormControl,Button} from 'react-bootstrap'
//import axios from 'axios'

const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();

class Exchange extends Component{

    state={
        loading:true,
        cryptos:[]
    };
    
    async componentDidMount(){
        
            let info_ex = await CoinGeckoClient.exchanges.all();;
            //const result= await info.json();
            console.log(info_ex);
            this.setState({cryptos:info_ex.data , loading:false})

            // this.setState({data:data});

            // const url="https://api.coingecko.com/api/v3/exchanges"
            // const response= await fetch(url);
            // const info_ex = await response.json();
            // console.log(info_ex);
    
          
    }

    changeText(currentText) {
        this.setState({currentText});
        console.log({currentText});
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
                                    
                                    <td>{crypto.symbol}<img src={crypto.image} className="mx-auto d-block" height="25px" width="25px" alt="symbol"/></td>
                                    <td>{crypto.name}</td>
                                    <td>{crypto.trade_volume_24h_btc_normalized}</td>
                                    <td>{crypto.year_established}</td>
                                    <td>{crypto.country}</td>
                                    
                            </tr>

                        )
                            // <div key={crypto.id}> {crypto.name} {crypto.id}{crypto.total_volume}</div>
                        );

        return(
            <div>
                <h2 className="text-capitalize text-center my=12">Exchange List</h2>
                <div className="float-right p-2">
                <Form inline>
                <input type="text" placeholder="Search" className="mr-sm-2" onChange={this.changeText.bind(this, 'currentText')}/>
                <Button onClick={this.changeText.bind(this, 'currentText')}>Search</Button>
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
        )
    }
}

export default Exchange
