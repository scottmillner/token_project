const TokenSale = artifacts.require('MyTokenSale');
const Token = artifacts.require('MyToken');

const chai = require('./chaisetup');
const BN = web3.utils.BN;
const expect = chai.expect;

require('dotenv').config({ path: '../.env' });

// TODO: break out asserts into individual tests
contract('TokenSale Test', async (accounts) => {
	// Arrange
	const [deployerAccount, recipient, anotherAccount] = accounts;

	it('should not have tokens in the DeployerAccount', async () => {
		// Arrange
		const instance = await Token.deployed();

		// Assert
		await expect(instance.balanceOf(accounts[0])).to.eventually.be.a.bignumber.equal(new BN(0));
	});
});
