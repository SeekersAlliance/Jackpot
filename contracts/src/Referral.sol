// SPDX-License-Identifier: MIT
pragma solidity = 0.8.23;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import "../interfaces/IReferral.sol";

/** 
 * @title 
 * @author SeekersAlliance
 * @notice
 */

contract Referral is Ownable, IReferral{
        mapping (address => ReferralInfo[]) public historyReferralInfo;

        constructor(address _initialAdmin) Ownable(_initialAdmin){
        }

        // @inheritdoc IReferral
        function deposit(address _sender, address _referral, uint256 _value, uint32 _amount) external onlyOwner{
            if(_sender == address(0)) revert InvalidAddress();
            if(_referral == address(0)) revert InvalidAddress();
            if(_value == 0) revert InvalidValue();
            if(_amount == 0) revert InvalidAmount();

            historyReferralInfo[_referral].push(ReferralInfo(_value, _amount, _sender));
            emit ReferralDeposit(_sender, _referral, _value, _amount);
        }

        // @inheritdoc IReferral
        function getHistoryReferralInfo(address _user) external view returns (ReferralInfo[] memory){
            return historyReferralInfo[_user];
        }

        // @inheritdoc IReferral
        function getTotalReferralInfo(address _user) external view returns (TotalReferralInfo memory){
            ReferralInfo[] memory history = historyReferralInfo[_user];
            TotalReferralInfo memory total;
            for(uint i = 0; i < history.length; i++){
                total.value += history[i].value;
                total.amount += history[i].amount;
                total.count++;
            }
            return total;
        }

}