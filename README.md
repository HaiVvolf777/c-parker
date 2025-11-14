## Environment Variables

The frontend expects the following variables (create a `.env` file in the project root – remember to prefix every key with `VITE_` so Vite exposes it to the browser):

```
VITE_API_BASE_URL=http://localhost:5000/api/v1
VITE_ORBIT_A_ADDRESS=0xYourOrbitAContractAddress
VITE_CCT_TOKEN_ADDRESS=0xYourCCTTokenAddress
```

- `VITE_API_BASE_URL` – base URL for the NestJS backend.
- `VITE_ORBIT_A_ADDRESS` – Orbit A smart-contract address the registration helper should call.
- `VITE_CCT_TOKEN_ADDRESS` – ERC‑20 CCT token contract address used for balance/allowance checks.

After updating the `.env`, restart the Vite dev server so the new values are picked up.
