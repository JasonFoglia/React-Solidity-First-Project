import './App.css'
import Web3 from 'web3';
import React from 'react';
import DecentralBank from './truffle_abis/DecentralBank.json';
import Tether from './truffle_abis/Tether.json';
import JAF from './truffle_abis/JAF.json';

declare global {
  interface Window {
    ethereum?: any;
    web3?: any;
  }
}

interface AppState {
  account: string;
  tether: object;
  jaf: object;
  decentralBank: object;
  tetherBalance: string;
  rewardBalance: string;
  stakingBalance: string;
  loading: boolean;
}

class App extends React.Component<{}, AppState> {

  constructor(props: any) {
    super(props);
    this.state = {
      account: '0x0',
      tether: {},
      jaf: {},
      decentralBank: {},
      tetherBalance: '0',
      rewardBalance: '0',
      stakingBalance: '0',
      loading: true
    };
  }

  async componentDidMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
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

  async loadBlockchainData() {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });

    const networkId = await web3.eth.net.getId();
    console.log(networkId);
  }

  render() {

    return (
      <>
        <div>
          <h1>Hello Web3.js and Solidity</h1>
          <p>Your account: {this.state.account}</p>
        </div>
      </>
    )
  }
}

export default App
