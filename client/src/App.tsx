import './App.css'
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import React from 'react';
import DecentralBank from './truffle_abis/DecentralBank.json';
import Tether from './truffle_abis/Tether.json';
import JAF from './truffle_abis/JAF.json';

interface TetherType {
  [networkId: number]: {
    address: string;
  };
}

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

  private web3: Web3 | null = null;

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

  async componentDidMount(): Promise<void> {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadWeb3(): Promise<void> {
    if (window.ethereum) {
      this.web3 = new Web3(window.ethereum);
      try {
        // Request account access if needed
        await window.ethereum.enable();
      } catch (error) {
        console.error("User denied account access");
      }
    } else if (window.web3) {
      // Legacy dapp browsers...
      this.web3 = new Web3(window.web3.currentProvider);
    } else {
      // Non-dapp browsers...
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
  }

  async loadBlockchainData(): Promise<void> {
    if (!this.web3) { return; }

    const accounts = await this.web3.eth.getAccounts();
    if (!accounts) { return; }

    this.setState({ account: accounts[0] });

    const networkId = await this.web3?.eth.net.getId();
    if (!networkId) { return; }

    const tetherData = (Tether.networks as TetherType)[networkId];
    if (tetherData) {
      const tether = new this.web3.eth.Contract(Tether.abi as AbiItem[], tetherData.address);
      this.setState({ tether });
      let tetherBalance = await tether.methods.balanceOf(this.state.account).call();
      this.setState({ tetherBalance: tetherBalance.toString() });
    } else {
      window.alert('Tether contract not deployed to detected network.');
    }

    const jafData = (JAF.networks as TetherType)[networkId];
    if (jafData) {
      const jaf = new this.web3.eth.Contract(JAF.abi, jafData.address);
      this.setState({ jaf });
      let rewardBalance = await jaf.methods.balanceOf(this.state.account).call();
      this.setState({ rewardBalance: rewardBalance.toString() });
    } else {
      window.alert('JAF contract not deployed to detected network.');
    }

    const decentralBankData = (DecentralBank.networks as TetherType)[networkId];
    if (decentralBankData) {
      const decentralBank = new this.web3.eth.Contract(DecentralBank.abi, decentralBankData.address);
      this.setState({ decentralBank });
      let stakingBalance = await decentralBank.methods.stakingBalance(this.state.account).call();
      this.setState({ stakingBalance: stakingBalance.toString() });
    } else {
      window.alert('DecentralBank contract not deployed to detected network.');
    }
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
