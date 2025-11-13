import { ethers } from 'ethers';

const ORBIT_A_ABI = [
  {
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'addressToUserID',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getTotalRegistrationCost',
    outputs: [
      { internalType: 'uint256', name: 'orbitA', type: 'uint256' },
      { internalType: 'uint256', name: 'orbitB', type: 'uint256' },
      { internalType: 'uint256', name: 'total', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '_referrerID', type: 'uint256' }],
    name: 'register',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

const ERC20_ABI = [
  {
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'owner', type: 'address' },
      { internalType: 'address', name: 'spender', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'spender', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

export const registerUserWithMetaMask = async (referrerID = 1) => {
  if (typeof window === 'undefined' || !window.ethereum) {
    throw new Error('MetaMask provider not detected');
  }

  const orbitAAddress = import.meta.env?.VITE_ORBIT_A_ADDRESS;
  const cctTokenAddress = import.meta.env?.VITE_CCT_TOKEN_ADDRESS;

  if (!orbitAAddress || !ethers.isAddress(orbitAAddress)) {
    throw new Error('Invalid or missing VITE_ORBIT_A_ADDRESS');
  }

  if (!cctTokenAddress || !ethers.isAddress(cctTokenAddress)) {
    throw new Error('Invalid or missing VITE_CCT_TOKEN_ADDRESS');
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const userAddress = await signer.getAddress();

  const orbitA = new ethers.Contract(orbitAAddress, ORBIT_A_ABI, signer);
  const cctToken = new ethers.Contract(cctTokenAddress, ERC20_ABI, signer);

  const existingUserID = await orbitA.addressToUserID(userAddress);
  if (existingUserID > 0n) {
    return {
      success: false,
      message: `Wallet already registered (User ID: ${existingUserID.toString()})`,
      userId: existingUserID,
    };
  }

  const registrationCosts = await orbitA.getTotalRegistrationCost();
  const orbitACost = registrationCosts.orbitA ?? registrationCosts[0];
  const orbitBCost = registrationCosts.orbitB ?? registrationCosts[1];
  const totalCost = registrationCosts.total ?? registrationCosts[2];

  if (typeof totalCost !== 'bigint') {
    throw new Error('Unexpected registration cost response from contract');
  }

  const cctBalance = await cctToken.balanceOf(userAddress);
  if (cctBalance < totalCost) {
    throw new Error(
      `Insufficient CCT. Need ${ethers.formatEther(totalCost)} CCT, have ${ethers.formatEther(cctBalance)} CCT`,
    );
  }

  const currentAllowance = await cctToken.allowance(userAddress, orbitAAddress);
  if (currentAllowance < totalCost) {
    const approveTx = await cctToken.approve(orbitAAddress, totalCost * 2n);
    await approveTx.wait();
  }

  const registerTx = await orbitA.register(referrerID);
  const receipt = await registerTx.wait();

  return {
    success: true,
    message: 'Registration transaction confirmed',
    txHash: receipt.hash,
    gasUsed: receipt.gasUsed?.toString(),
    blockNumber: receipt.blockNumber,
    costs: {
      orbitA: ethers.formatEther(orbitACost),
      orbitB: ethers.formatEther(orbitBCost),
      total: ethers.formatEther(totalCost),
    },
  };
};


