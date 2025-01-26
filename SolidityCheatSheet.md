## Solidity Cheat Sheet - [Back](README.md)

### Basics
- **// SPDX-License-Identifier: MIT** : Other licenses can be used but this is needed
- **pragma solidity ^0.8.0;** : This line sets the Solidity compiler version.
- **contract ContractName {}** : Defines a new contract.

### Data Types
- **uint** : Unsigned integer (256-bit by default).
- **int** : Signed integer.
- **bool** : Boolean.
- **address** : Ethereum address.
- **string** : A string of characters.
- **byte/bytes** : Fixed/variable-size byte arrays.

### Variables
- **state variables** : Declared inside a contract but outside functions, stored on the blockchain.
- **local variables** : Declared inside functions, not stored on the blockchain.

```solidity
uint public myVar;
string internal name;
bool private status;
```

### Functions
- **function functionName() public { }** : Declares a function.
- **view** : For functions that do not alter the state.
- **pure** : For functions that neither read nor modify the state.
- **payable** : For functions that can receive Ether.
- **memory | storage | calldata** : For parameters functions that such as strings and bytes.

```solidity
function setVar(uint _value) public {
    myVar = _value;
}

function getVar() public view returns (uint) {
    return myVar;
}
```

### Modifiers
- **onlyOwner** : Custom modifier to restrict access.

```solidity
modifier onlyOwner() {
    require(msg.sender == owner);
    _;
}
```

### Events
- **event EventName(type indexed _param1, type _param2);** : Declare an event.
- **emit EventName(_param1, _param2);** : Trigger an event.

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

### Mappings
- **mapping(keyType => valueType)** : Key-value pairs.

```solidity
mapping(address => uint) public balances;
```

### Arrays
- **type[] arrayName** : Dynamic array.
- **type[size] arrayName** : Static array.

```solidity
uint[] public dynamicArray;
uint[10] public staticArray;
```

### Structs
- **struct StructName { type member1; type member2; }** : Defines a structure.

```solidity
struct Person {
    string name;
    uint age;
}

Person[] public people;
```

### Inheritance
- **contract ChildContract is ParentContract { }** : Inherit from another contract.

```solidity
contract MyContract is ParentContract { }
```

### Access Control
- **public** : Accessible by anyone.
- **private** : Accessible only within the contract.
- **internal** : Accessible within the contract and derived contracts.
- **external** : Accessible only outside the contract.
