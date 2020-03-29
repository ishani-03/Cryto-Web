import React , {Component , useState} from  'react'
import {Table} from 'reactstrap'
import {Navbar,Nav,NavDropdown,Form,FormControl,Button} from 'react-bootstrap'
//import axios from 'axios'
import Loading from './loading.gif';

// const CoinGecko = require('coingecko-api');
// const CoinGeckoClient = new CoinGecko();


class Entry extends Component{

    state={
        loading:true,
        cryptos:[],
        searchData:null,
        item:[],
        

    };

    

    
    
    async componentDidMount(){
        
            // let info = await CoinGeckoClient.coins.all();
            // //const result= await info.json();
            // console.log(info.data);
            // this.setState({cryptos:info.data , loading:false})
            // // this.setState({data:data});

            const url="https://api.coingecko.com/api/v3/coins/list"
            const response= await fetch(url);
            const info = await response.json();
            console.log(info[0]);
            this.setState({cryptos:info , loading:false})
    }

    

    // search(infokey){
    //     console.warn(infokey)
    //     fetch("https://api.coingecko.com/api/v3/coins/list?q="+infokey)
    //     .then((datax)=>{
    //         datax.json().then((resp)=>{
    //             console.warn("resp",resp)
    //             this.setState({search:resp})
                
    //         })
    //     })
    // }

   

    render(){


        

        if(this.state.loading){
            return(<div><img src={Loading} alt="Loading..." height="100px" width="100px" className=" mx-auto d-block"/></div>)
        }

        if(!this.state.cryptos.length){
            return(<div>List Not Found!</div>)
        }

        const cryptoJsx=this.state.cryptos.map(crypto=>(
                    <tr key={crypto.id}>
                    <td>{crypto.id}</td>
                    <td>{crypto.symbol}</td>
                    <td>{crypto.name}</td>
                    
                    </tr>
        ));

        return(
            <div>
               

                                        
                <h2 className="text-capitalize text-center my=5">List of Coins</h2>
                <div className="float-right p-2">
                <Form inline>
                <input type="text" placeholder="Search" className="mr-sm-2" 
                onChange={this.handleChange}/>
                <Button >Search</Button>
                </Form>
                </div>
                <Table striped bordered hover>
                        <thead>
                            <tr className="text-center">
                            <th>Id</th>
                            <th>Symbol</th>
                            <th>Name</th>
                            
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
