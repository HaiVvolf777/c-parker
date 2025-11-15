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
  const hasFunc = (contract, fnName) => {
    try {
      return contract && typeof contract[fnName] === 'function';
    } catch {
      return false;
    }
  };

  // --- Check if user is already registered ---
  let existingUserID = 0n;
  try {
    if (hasFunc(orbitA, 'addressToUserID')) {
      existingUserID = await orbitA.addressToUserID(userAddress);
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
      const result = await orbitA.getTotalRegistrationCost();
      orbitACost = result[0];
      orbitBCost = result[1];
      totalCost = result[2];
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
      cctBalance = await cctToken.balanceOf(userAddress);
      console.log('CCT Balance:', ethers.formatEther(cctBalance));
      if (totalCost > 0n && cctBalance < totalCost) {
        throw new Error(`Insufficient CCT. Need ${ethers.formatEther(totalCost)}, have ${ethers.formatEther(cctBalance)}`);
      }
    }
  } catch (err) {
    if (err.message.includes('Insufficient CCT')) {
      throw err;
    }
    console.warn('Could not fetch balance (ignored if function missing):', err.message);
  }

  // --- Approve tokens if needed ---
  // Use max uint256 for approval to avoid future approval issues
  const MAX_UINT256 = ethers.MaxUint256;
  try {
    if (hasFunc(cctToken, 'allowance') && hasFunc(cctToken, 'approve')) {
      const currentAllowance = await cctToken.allowance(userAddress, ORBIT_A_ADDRESS);
      console.log('Current allowance:', ethers.formatEther(currentAllowance));
      
      // Always approve if we don't have sufficient allowance or if we couldn't fetch the cost
      // Use a reasonable minimum (1000 tokens) if totalCost is 0
      const minRequiredAllowance = totalCost > 0n ? totalCost : ethers.parseEther('1000');
      
      if (currentAllowance < minRequiredAllowance) {
        console.log('Approving CCT tokens...');
        const approveTx = await cctToken.approve(ORBIT_A_ADDRESS, MAX_UINT256);
        console.log('Approval transaction sent, waiting for confirmation...');
        const approveReceipt = await approveTx.wait();
        console.log('Approved CCT - TX:', approveReceipt.hash);
      } else {
        console.log('Sufficient allowance already exists');
      }
    } else {
      console.warn('Token contract does not have approve/allowance functions');
    }
  } catch (err) {
    console.error('Approval failed:', err);
    throw new Error(`Failed to approve tokens: ${err.message}`);
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

// Convenience function - gets provider from WalletContext
export const registerUserWithWallet = async (provider, referrerID = 1) => {
  if (!provider) {
    throw new Error('Wallet provider not available');
  }
  return registerUser(provider, referrerID);
};
