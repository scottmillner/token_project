const Token = artifacts.require('MyToken');

const chai = require('./chaisetup');
const BN = web3.utils.BN;
const expect = chai.expect;

// TODO: break out asserts into individual tests
contract('Token Test', async (accounts) => {
	const [deployerAccount, recipient, anotherAccount] = accounts;

	beforeEach(async () => {
		this.testToken = await Token.new(1000000);
	});

	it('should place all tokens in my account', async () => {
		// Arrange
		const instance = this.testToken;
		const totalSupply = await instance.totalSupply();

		// Assert
		await expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);
	});

	it('is possible to send tokens between accounts', async () => {
		// Arrange
		const numOfTokensToSend = 1;
		const instance = this.testToken;
		const totalSupply = await instance.totalSupply();

		// Act/Assert
		await expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);
		await expect(instance.transfer(recipient, new BN(numOfTokensToSend))).to.eventually.be.fulfilled;
		await expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(numOfTokensToSend)));
		await expect(instance.balanceOf(recipient)).to.eventually.be.a.bignumber.equal(new BN(numOfTokensToSend));
	});

	it('is not possible to send more tokens than available in total', async () => {
		// Arrange
		const instance = this.testToken;
		const balanceOfDeployer = await instance.balanceOf(deployerAccount);

		// Act/Assert
		await expect(instance.transfer(recipient, new BN(balanceOfDeployer + 1))).to.eventually.be.rejected;
		await expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(balanceOfDeployer);
	});
});
