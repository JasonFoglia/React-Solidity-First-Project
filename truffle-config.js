import 'babel-register';
import 'babel-polyfill';

export const networks = {
    development: {
        host: "127.0.0.1:",
        port: 7545,
        network_id: "*"
    }
};
export const contracts_directory = './contracts/';
export const contracts_build_directory = './truffle_abis/';
export const compilers = {
    solc: {
        version: "0.8.26",
        optimizer: {
            enabled: true,
            runs: 200
        }
    }
};