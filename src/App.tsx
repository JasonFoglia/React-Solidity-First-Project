import './App.css'
import Web3 from 'web3';
import React from 'react';

declare global {
  interface Window {
    ethereum?: any;
    web3?: any;
  }
}

class App extends React.Component {

  async componentWillMount() {
    await this.loadWeb3();
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
  }

  constructor(props: any) {
    super(props);
    this.state = {
      account: '0x0'
    };
  }

  render() {

    return (
      <>
        <div></div>
      </>
    )
  }
}

export default App
