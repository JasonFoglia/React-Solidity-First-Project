const Tether = artifacts.require('../contracts/Tether.sol');

contract('Tether', (accounts) => {
    it('should return the correct name', async () => {
        const tether = await Tether.deployed();
        const name = tether.name;
        Assert.equal(name, 'Mock Tether');
    });
});