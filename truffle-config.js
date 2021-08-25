const path = require('path');
require('dotenv').config({ path: './.env' });
const HDWalletProvider = require('@truffle/hdwallet-provider');
const accountIndex = 0;

module.exports = {
	// See <http://truffleframework.com/docs/advanced/configuration>
	// to customize your Truffle configuration!
	contracts_build_directory: path.join(__dirname, 'client/src/contracts'),
	networks: {
		// use Ganache during tests
		develop: {
			host: '127.0.0.1',
			port: 7545,
			network_id: 5777,
		},
		ganache_local: {
			provider: function () {
				return new HDWalletProvider(process.env.MNEMONIC, 'http://127.0.0.1:7545', accountIndex);
			},
			network_id: 5777,
		},
	},
	compilers: {
		solc: {
			version: '^0.6.0',
			optimizer: {
				enabled: true,
				runs: 200,
			},
		},
	},
};
