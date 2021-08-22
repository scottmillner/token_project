const TokenSale = artifacts.require('MyTokenSale');
const Token = artifacts.require('MyToken');
const KycContract = artifacts.require('KycContract');

const chai = require('./chaisetup');
const BN = web3.utils.BN;
const expect = chai.expect;

require('dotenv').config({ path: '../.env' });

// TODO: break out asserts into individual tests
contract('TokenSale', async (accounts) => {
	// Arrange
	const [deployerAccount, recipient, anotherAccount] = accounts;

	it('should not have tokens in the DeployerAccount', async () => {
		// Arrange
		const instance = await Token.deployed();

		// Assert
		await expect(instance.balanceOf(accounts[0])).to.eventually.be.a.bignumber.equal(new BN(0));
	});

	it('should have all tokens in the contract by default', async () => {
		// Arrange
		const instance = await Token.deployed();
		const balanceOfTokenSale = await instance.balanceOf(TokenSale.address);
		const totalSupply = await instance.totalSupply();

		// Assert
		expect(balanceOfTokenSale).to.be.a.bignumber.equal(totalSupply);
	});

	it('should be possible to buy tokens', async () => {
		// Arrange
		const tokenInstance = await Token.deployed();
		const tokenSaleInstance = await TokenSale.deployed();
		const kycInstance = await KycContract.deployed();
		const balanceBefore = await tokenInstance.balanceOf(deployerAccount);

		// Act
		await kycInstance.setKycCompleted(deployerAccount);

		//Assert
		await expect(tokenSaleInstance.sendTransaction({ from: deployerAccount, value: web3.utils.toWei('1', 'wei') })).to.be.fulfilled;
		await expect(tokenInstance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(balanceBefore.add(new BN(1)));
	});
});
