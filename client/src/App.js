import React, { Component } from 'react';
import MyToken from './contracts/MyToken.json';
import MyTokenSale from './contracts/MyTokenSale.json';
import KycContract from './contracts/KycContract.json';
import getWeb3 from './getWeb3';

import './App.css';

class App extends Component {
	state = { isLoaded: false, kycAddress: '0x123...', tokenSaleAddress: null };

	componentDidMount = async () => {
		try {
			// Get network provider and web3 instance.
			this.web3 = await getWeb3();

			// Use web3 to get the user's accounts.
			this.accounts = await this.web3.eth.getAccounts();

			// MyToken instance
			this.networkId = await this.web3.eth.net.getId();
			this.deployedNetworkMyToken = MyToken.networks[this.networkId];
			this.myTokenInstance = new this.web3.eth.Contract(MyToken.abi, this.deployedNetworkMyToken && this.deployedNetworkMyToken.address);

			// MyTokenSale instance
			this.deployedNetworkMyTokenSale = MyTokenSale.networks[this.networkId];
			this.myTokenSaleInstance = new this.web3.eth.Contract(
				MyTokenSale.abi,
				this.deployedNetworkMyTokenSale && this.deployedNetworkMyTokenSale.address
			);

			// Kyc instance
			this.deployedNetworkKycContract = KycContract.networks[this.networkId];
			this.KycContract = new this.web3.eth.Contract(
				KycContract.abi,
				this.deployedNetworkKycContract && this.deployedNetworkKycContract.address
			);

			// Set web3, accounts, and contract to the state, and then proceed with an
			// example of interacting with the contract's methods.
			this.setState({ isLoaded: true, tokenSaleAddress: this.deployedNetworkMyTokenSale.address });
		} catch (error) {
			// Catch any errors for any of the above operations.
			alert(`Failed to load web3, accounts, or contract. Check console for details.`);
			console.error(error);
		}
	};

	handleInputChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;

		this.setState({
			[name]: value,
		});
	};

	handleKycWhitelisting = async (event) => {
		await this.KycContract.methods.setKycCompleted(this.state.kycAddress).send({ from: this.accounts[0] });
		alert(`KYC for ${this.state.kycAddress} is completed.`);
	};

	render() {
		if (!this.state.isLoaded) {
			return <div>Loading Web3, accounts, and contract...</div>;
		}
		return (
			<div className='App'>
				<h1>StarDucks Cappucino Token Sale</h1>
				<h2>Get your tokens today!!</h2>
				<h2>Kyc Whitelisting</h2>
				Address to allow: <input type='text' name='kycAddress' value={this.state.kycAddress} onChange={this.handleInputChange} />
				<button type='button' onClick={this.handleKycWhitelisting}>
					Add to whitelist
				</button>
				<h2>Buy Tokens</h2>
				<p>To buy tokens, send Wei to this address: {this.state.tokenSaleAddress}</p>
			</div>
		);
	}
}

export default App;
