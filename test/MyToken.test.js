const Token = artifacts.require('MyToken');

const chai = require('chai');
const BN = web3.utils.BN; // web3 automatically injected in truffle tests
const chaiBN = require('chai-bn')(BN);
chai.use(chaiBN);

const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const expect = chai.expect;

contract('Token Test', async (accounts) => {
	it('should place all tokens in my account', async () => {
		// Arrange
		let instance = await Token.deployed();
		let totalSupply = await instance.totalSupply();

		// Assert
		expect(instance.balanceOf(accounts[0])).to.eventually.be.a.bignumber.equal(totalSupply);
	});
});
