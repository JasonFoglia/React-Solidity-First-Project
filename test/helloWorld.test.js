import { assert } from 'truffle-assertions';

contract('HelloWorld', (accounts) => {
    it('should return the correct greeting', async () => {
        const helloWorld = await HelloWorld.deployed();
        const greeting = await helloWorld.greet();
        assert.equal(greeting, 'Hello, World!');
    });
});