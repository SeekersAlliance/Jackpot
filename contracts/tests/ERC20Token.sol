// SPDX-License-Identifier: MIT
pragma solidity = 0.8.23;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract ERC20Token is ERC20, Ownable {
    uint8 decimal;
    constructor(uint8 _decimals, address initialOwner, string memory name)
        ERC20("TestToken", name)
        Ownable(initialOwner)
    {
        _mint(msg.sender, 100000 * 10 ** _decimals);
        decimal = _decimals;
    }

    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }

    function decimals() public view override returns(uint8) {
        return decimal;
    }
}
