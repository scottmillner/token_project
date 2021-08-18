const MyToken = artifacts.require('./MyToken');
const MyTokenSale = artifacts.require('MyTokenSale');

module.exports = async function (deployer) {
	const accounts = await web3.eth.getAccounts();
	await deployer.deploy(MyToken, 1000000);
	await deployer.deploy(MyTokenSale, 1, accounts[0], MyToken.address);
	const instance = await MyToken.deployed();
	await instance.transfer(MyTokenSale.address, 1000000);
};
