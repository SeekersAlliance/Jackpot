// SPDX-License-Identifier: MIT
pragma solidity = 0.8.23;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import "../interfaces/IMyNFT.sol";
import "../interfaces/IJackpot.sol";


/** 
 * @title 
 * @author SeekersAlliance
 * @notice
 */

 contract Jackpot is Ownable, IJackpot{

    ERC20 public paymentToken;
    IMyNFT public myNFT;

    uint256 public totalValue;
    uint32[] public collectedCardsID;

    constructor(address _initialAdmin, address _paymentToken, address _myNFT, uint32[] memory _collectedCardsID) Ownable(_initialAdmin){
        paymentToken = ERC20(_paymentToken);
        myNFT = IMyNFT(_myNFT);
        collectedCardsID = _collectedCardsID;
    }

    // @inheritdoc IJackpot
    function deposit(address _user, uint256 _value, uint256 _amount) external override onlyOwner{
        if(_user == address(0)) revert InvalidAddress();
        if(_value == 0) revert InvalidValue();
        if(_amount == 0) revert InvalidAmount();
        totalValue += _value;
    }

    // @inheritdoc IJackpot
    function claim() external override{
        address sender = msg.sender;
        if(!_checkCollectedCards(sender)) revert NotCollectedCards();
        _burn(sender);
        paymentToken.transfer(_user, totalValue);
        emit JackpotClaim(sender, totalValue);
    }

    // @inheritdoc IJackpot
    function getTotalValue() external view override returns (uint256 value){
        return totalValue;
    }

    // @inheritdoc IJackpot
    function setCollectedCardsID(uint32[] memory _cardsID) external override onlyOwner{
        collectedCardsID = _cardsID;
    }

    // @inheritdoc IJackpot
    function getCollectedCardsID() external view override returns (uint32[] memory cardsID){
        return collectedCardsID;
    }

    function _checkCollectedCards(address _user) internal view returns (bool){
        for(uint i = 0; i < collectedCardsID.length; i++){
            if(myNFT.balanceOf(_user, collectedCardsID[i]) == 0){
                return false;
            }
        }
        return true;
    }

    function _burn(address _user) internal{
        uint256[] memory ids = new uint256[](collectedCardsID.length);
        uint256[] memory amounts = new uint256[](collectedCardsID.length);
        for(uint i = 0; i < collectedCardsID.length; i++){
            ids[i] = collectedCardsID[i];
            amounts[i] = 1;
        }
        myNFT.burnBatch(_user, ids, amounts);
    }
}