# Jackpot

## Required tools
- [Node.js](https://nodejs.org/en) version 20+
- [Yarn](https://yarnpkg.com/getting-started/install) installed globally (`npm i -g yarn`) — `version 4.1` or later.
- [Metacraft CLI](https://github.com/cocrafts/metacraft-cli) installed globally (`npm i -g @metacraft/cli`)

## CLI commands
- Development: run `yarn dev` at project root (or `metacraft` under apps/home)
- Build: `yarn build` (or `metacraft bundle` under apps/[name])

## Relayer (api)
Endpoint: https://ps8st4im66.execute-api.ap-south-1.amazonaws.com

#### `POST /faucet` get faucet Native or ERC20 Token
- Body/payload (json) [see details](/blob/main/relayer/handlers/faucet.ts#L3):
    - `tokenAddress`: `string` — accept 'native', 'usdc' or ERC20 contract address 
    - `toAddress`: string — receiver address
    - `amount`: float — amount of Native token or ERC20 to send e.g `2.5` ETH
- Response (json) [see details](/blob/main/relayer/handlers/util.ts#L67):
    - `amount`: number — amount sent
    - `address`: string — receiver address
    - `transactionHash`: string — confirmed transaction hash for e.g verification

#### `GET /hello` greeting — response: `{ message: string }`
- Response (json):
    - `message`: string
