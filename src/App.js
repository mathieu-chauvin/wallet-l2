import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";
//import { ethers } from "ethers";


const { ethers } = require("ethers");

/*async function requestAccount() {
  const provider = new ethers.providers.JsonRpcProvider('https://arbitrum-mainnet.infura.io/v3/'+process.env.REACT_APP_INFURA_API_KEY);

  provider.getBlockNumber()
  .then(blockNumber => {
    console.log(blockNumber);
  })
  .catch(error => {
    console.error(error);
  });
}*/

const network = "sepolia";
  const API_KEY = process.env.REACT_APP_INFURA_API_KEY;
  const PRIVATE_KEY = process.env.REACT_APP_PRIVATE_KEY;

  const provider = new ethers.providers.InfuraProvider(
    network,
    API_KEY
  );

  const scrollProvider = new ethers.providers.JsonRpcProvider("https://sepolia-rpc.scroll.io/")

  
  //const provider_Metamask = new ethers.providers.Web3Provider(window.ethereum);
  /*const infuraProvider = new ethers.providers.InfuraProvider(
    "sepolia",
    API_KEY,
  );*/

  // Use the useState hook function to add state variables to a functional component.


function App() {

  const [blockNumber, setBlockNumber] = useState(10);
  const [sepoliaBalance, setSepoliaBalance] = useState(0);
  const [scrollBalance, setScrollBalance] = useState(0);


  useEffect(() => {
    (async () => {
      const latest_block = await provider.getBlockNumber("latest");
      setBlockNumber(latest_block);

      
      
      const balance = await provider.getBalance(process.env.REACT_APP_PUBLIC_KEY);
      setSepoliaBalance(ethers.utils.formatEther(balance));

      const scBalance = await scrollProvider.getBalance(process.env.REACT_APP_PUBLIC_KEY);
      setScrollBalance(ethers.utils.formatEther(scBalance));

       
    })();

    return () => {
      // this now gets called when the component unmounts
    };
  }, []);

 // await updateInfo();
  
  return (
    <div className="App">
      <header className="App-header">
        <ul>
        
        </ul>        <p>
          Edit <code>src/App.js</code> and to reload.
        </p>
        <p>{blockNumber}</p>
        <p>{sepoliaBalance}</p>
        <p>{scrollBalance}</p>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
