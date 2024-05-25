# Jackpot

## Introduction
This repository includes jackpot and revenue-sharing contracts. It also includes the Flexible Hierarchical Drawing Pools to provide a fair card-drawing mechanism. The contract allows for the customization of Hierarchical Drawing Pools so that game developers can freely customize pool probabilities at each level according to their game design at launch, updates, and new releases while maintaining constant and fair pull rates. All the contracts are deployed on the opBNB Testnet.

The revenue-sharing mechanism is divided into three parts:
- Jackpot (80%): Players can claim all the prizes in the jackpot once they collect all the specified cards.
- Referral (10%): If a referral link is used, this portion of the revenue will be transferred to the referral address immediately after each transaction.
- FOMO3D (10%): This portion of the revenue will be evenly distributed based on the number of cards each address has purchased.

The following document contains the setup instructions for our smart contracts, which has several roles to setup. Follow the steps below to set up each contract:
## Contracts Structure
![Alt text](./Jackpot.png?raw=true "Contract Structure")

---

## Setup steps

### Register Contract
- Grants the corresponding roles to the respective contracts. 
    ![image](https://hackmd.io/_uploads/rJefx9sM0.png)
### Marketplace Contract
- setPack
### Hierarchical Prize Pool Contract
1. setTokenPool 
2. setTokenMax 
3. setUnitPool 
4. setDrawingPool  
### VRFManagerOpbnb Contract
- deposit
    - Coordinator gas
---

## Deployed Contracts:
### opBNB Testnet


| Contract Name  | address                                                                                                                                         | Purpose                                                                                                                    |
|:-------------- |:----------------------------------------------------------------------------------------------------------------------------------------------- |:-------------------------------------------------------------------------------------------------------------------------- |
| PaymentToken   | [0x69fBe552E6361A7620Bb2C106259Be301049E087](https://testnet.opbnbscan.com/address/0x69fBe552E6361A7620Bb2C106259Be301049E087?tab=Contract&p=1) | ERC-20 contract for use as our test token, "SA".                                                                                    |
| PrizeNFT       | [0x49430AB34Dad2622b3327B57e517D22a2488E530](https://testnet.opbnbscan.com/address/0x49430AB34Dad2622b3327B57e517D22a2488E530?tab=Contract&p=1) | ERC-1155 contract for minting NFTs.                                                                                         |
| MarketPlace    | [0xe43BeE387e5d89c299730f7B7b581D35af753494](https://testnet.opbnbscan.com/address/0xe43BeE387e5d89c299730f7B7b581D35af753494?tab=Contract&p=1) | Allows users to buy cards. Automatically distributes the revenue from card purchases to other contracts & referrer wallets.               |
| FOMO3D         | [0x227eebC2f5BBb3d636d3F7027690a01A3fbA38DD](https://testnet.opbnbscan.com/address/0x227eebC2f5BBb3d636d3F7027690a01A3fbA38DD?tab=Contract&p=1) | Calculates and stores the earnings from early-buyer profit-sharing.                                                                     |
| Jackpot        | [0xBBda289cEe994B0927e45F9682faCAa1e1658916](https://testnet.opbnbscan.com/address/0xBBda289cEe994B0927e45F9682faCAa1e1658916?tab=Contract&p=1) | Manages the jackpot value, allowing a user to claim all by burning the required cards. |
| Referral       | [0xC8155eDB016b8Dd8863c77D4EE6015326F5b8a9d](https://testnet.opbnbscan.com/address/0xC8155eDB016b8Dd8863c77D4EE6015326F5b8a9d?tab=Contract&p=1) | Calculates and stores referral information.                                                                             |
| VRFManager     | [0xCa24de3a05FDDBCA9F39dd02937cA86cD815A1f6](https://testnet.opbnbscan.com/address/0xCa24de3a05FDDBCA9F39dd02937cA86cD815A1f6?tab=Contract&p=1) | Communicates with the VRFCoordinator provided by Binance Oracle.                |
| Draw           | [0xe0320089466D923f3401F3b50CBEBE51Fba5C868](https://testnet.opbnbscan.com/address/0xe0320089466D923f3401F3b50CBEBE51Fba5C868?tab=Contract&p=1) | Requests a random number from the VRFManager and mints the corresponding NFT(s) to buyer.                                   |
| Register       | [0x7b0989e541c26e6ed0ec65663789dc6d4AAf91D5](https://testnet.opbnbscan.com/address/0x7b0989e541c26e6ed0ec65663789dc6d4AAf91D5?tab=Contract&p=1) | Manage all the contracts.                                                                                                   |
| VRFCoordinator | [0x2B30C31a17Fe8b5dd397EF66FaFa503760D4eaF0](https://testnet.opbnbscan.com/address/0x2B30C31a17Fe8b5dd397EF66FaFa503760D4eaF0?tab=Contract&p=1) | A VRFCoordinator provided by Binance Oracle that generates trusted random numbers.                                           |
---

## Resources
1. VRF Request Status URL: https://oracle.binance.com/docs/vrf/overview

