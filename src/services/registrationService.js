import { ethers } from 'ethers';
import OrbitAAbi from '../abis/OrbitA.json';
import CCTTokenAbi from '../abis/CCTToken.json';

const ORBIT_A_ADDRESS = import.meta.env?.VITE_ORBIT_A_ADDRESS ?? '0xYourOrbitAContractAddress';
const CCT_TOKEN_ADDRESS = import.meta.env?.VITE_CCT_TOKEN_ADDRESS ?? '0xYourCCTTokenAddress';

export const registerUser = async (walletConnectProvider, referrerID = 1) => {
  if (!walletConnectProvider) throw new Error('Wallet provider not initialized');

  const provider = new ethers.BrowserProvider(walletConnectProvider);
  const signer = await provider.getSigner();
  const userAddress = await signer.getAddress();
  console.log('User Address:', userAddress);

  const orbitA = new ethers.Contract(ORBIT_A_ADDRESS, OrbitAAbi, signer);
  const cctToken = new ethers.Contract(CCT_TOKEN_ADDRESS, CCTTokenAbi, signer);

  console.log('OrbitA Contract:', orbitA.target);
  console.log('CCT Token Contract:', cctToken.target);

  // Helper to check if function exists
  const hasFunc = (contract, fnName) => typeof contract[fnName] === 'function';

  // --- Check if user is already registered ---
  let existingUserID = 0n;
  try {
    if (hasFunc(orbitA, 'addressToUserID')) {
      existingUserID = (await orbitA.callStatic.addressToUserID(userAddress)).toBigInt();
      if (existingUserID > 0n) {
        console.log('Already registered with User ID:', existingUserID.toString());
        return { success: false, message: 'Already registered', userId: existingUserID.toString() };
      }
    }
  } catch (err) {
    console.warn('Could not fetch existing user ID (ignored):', err.message);
  }

  // --- Get registration cost ---
  let orbitACost = 0n, orbitBCost = 0n, totalCost = 0n;
  try {
    if (hasFunc(orbitA, 'getTotalRegistrationCost')) {
      [orbitACost, orbitBCost, totalCost] = await orbitA.callStatic.getTotalRegistrationCost();
      console.log('Registration Cost: OrbitA', ethers.formatEther(orbitACost), 'CCT');
      console.log('Registration Cost: OrbitB', ethers.formatEther(orbitBCost), 'CCT');
      console.log('Total Cost:', ethers.formatEther(totalCost), 'CCT');
    }
  } catch (err) {
    console.warn('Could not fetch registration cost (ignored):', err.message);
  }

  // --- Check balance ---
  let cctBalance = 0n;
  try {
    if (hasFunc(cctToken, 'balanceOf')) {
      cctBalance = (await cctToken.callStatic.balanceOf(userAddress)).toBigInt();
      console.log('CCT Balance:', ethers.formatEther(cctBalance));
      if (totalCost > 0n && cctBalance < totalCost) {
        throw new Error(`Insufficient CCT. Need ${ethers.formatEther(totalCost)}, have ${ethers.formatEther(cctBalance)}`);
      }
    }
  } catch (err) {
    console.warn('Could not fetch balance (ignored if function missing):', err.message);
  }

  // --- Approve tokens if needed ---
  try {
    if (hasFunc(cctToken, 'allowance') && hasFunc(cctToken, 'approve')) {
      const currentAllowance = (await cctToken.callStatic.allowance(userAddress, ORBIT_A_ADDRESS)).toBigInt();
      if (totalCost > currentAllowance) {
        console.log('Approving CCT...');
        const approveTx = await cctToken.approve(ORBIT_A_ADDRESS, totalCost * 2n);
        const approveReceipt = await approveTx.wait();
        console.log('Approved CCT - TX:', approveReceipt.hash);
      }
    }
  } catch (err) {
    console.warn('Approval failed (ignored backend filter errors):', err.message);
  }

  // --- Register user ---
  try {
    if (hasFunc(orbitA, 'register')) {
      console.log('Registering user with referrer ID:', referrerID);
      const registerTx = await orbitA.register(referrerID);
      const receipt = await registerTx.wait();
      console.log('Registration TX confirmed:', receipt.hash);
      console.log('Gas Used:', receipt.gasUsed.toString());
      console.log('Block:', receipt.blockNumber);

      return { success: true, message: 'User registered', txHash: receipt.hash };
    } else {
      console.warn('Contract function register not found. Cannot register user.');
      return { success: false, message: 'Register function not found' };
    }
  } catch (err) {
    console.error('Registration failed:', err);
    throw err;
  }
};

// Convenience for MetaMask
export const registerUserWithMetaMask = (referrerID = 1) => registerUser(window.ethereum, referrerID);
