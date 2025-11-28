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
  
  // Get network info for debugging
  try {
    const network = await provider.getNetwork();
    // console.log('Network Info:', {
    //   chainId: network.chainId.toString(),
    //   name: network.name
    // });
  } catch (err) {
    console.warn('Could not get network info:', err.message);
  }
  
  // console.log('User Address:', userAddress);

  const orbitA = new ethers.Contract(ORBIT_A_ADDRESS, OrbitAAbi, signer);
  const cctToken = new ethers.Contract(CCT_TOKEN_ADDRESS, CCTTokenAbi, signer);

  // console.log('OrbitA Contract:', orbitA.target);
  // console.log('CCT Token Contract:', cctToken.target);

  const hasFunc = (contract, fnName) => {
    try {
      return contract && typeof contract[fnName] === 'function';
    } catch {
      return false;
    }
  };

  const safeCall = async (contract, fnName, ...args) => {
    try {
      if (!hasFunc(contract, fnName)) {
        return null;
      }
      const result = await contract[fnName](...args);
      return result;
    } catch (err) {
      if (err.code === 'BAD_DATA' || err.message?.includes('could not decode')) {
        console.warn(`Function ${fnName} returned empty data - may not exist on deployed contract`);
        return null;
      }
      throw err;
    }
  };

  let existingUserID = 0n;
  try {
    const userIDResult = await safeCall(orbitA, 'addressToUserID', userAddress);
    if (userIDResult !== null && userIDResult !== undefined) {
      existingUserID = BigInt(userIDResult.toString());
      if (existingUserID > 0n) {
        // console.log('Already registered with User ID:', existingUserID.toString());
        return { success: false, message: 'Already registered', userId: existingUserID.toString() };
      }
    }
  } catch (err) {
    console.warn('Could not fetch existing user ID (ignored):', err.message);
  }

  let orbitACost = 0n, orbitBCost = 0n, totalCost = 0n;
  try {
    const costResult = await safeCall(orbitA, 'getTotalRegistrationCost');
    if (costResult !== null && costResult !== undefined) {
      orbitACost = BigInt(costResult[0].toString());
      orbitBCost = BigInt(costResult[1].toString());
      totalCost = BigInt(costResult[2].toString());
      // console.log('Registration Cost: OrbitA', ethers.formatEther(orbitACost), 'CCT');
      // console.log('Registration Cost: OrbitB', ethers.formatEther(orbitBCost), 'CCT');
      // console.log('Total Cost:', ethers.formatEther(totalCost), 'CCT');
    }
  } catch (err) {
    console.warn('Could not fetch registration cost (ignored):', err.message);
  }

  let cctBalance = 0n;
  try {
    // Direct call to balanceOf instead of safeCall to get better error messages
    if (hasFunc(cctToken, 'balanceOf')) {
      // console.log('Checking CCT balance for address:', userAddress);
      // console.log('CCT Token contract address:', CCT_TOKEN_ADDRESS);
      
      try {
        const balanceResult = await cctToken.balanceOf(userAddress);
        if (balanceResult !== null && balanceResult !== undefined) {
          cctBalance = BigInt(balanceResult.toString());
          const formattedBalance = ethers.formatEther(cctBalance);
          // console.log('CCT Balance:', formattedBalance);
          
          // Also check the raw balance value for debugging
          // console.log('CCT Balance (raw):', balanceResult.toString());
          
          if (totalCost > 0n && cctBalance < totalCost) {
            throw new Error(`Insufficient CCT. Need ${ethers.formatEther(totalCost)}, have ${formattedBalance}`);
          }
        } else {
          console.warn('balanceOf returned null/undefined');
        }
      } catch (balanceErr) {
        console.error('Error calling balanceOf:', balanceErr);
        console.error('Error details:', {
          code: balanceErr.code,
          message: balanceErr.message,
          reason: balanceErr.reason,
          data: balanceErr.data
        });
        
        // If it's a network/contract issue, provide helpful error message
        if (balanceErr.code === 'CALL_EXCEPTION' || balanceErr.message?.includes('could not decode')) {
          const errorMsg = `Could not read CCT balance from contract. This might be a network mismatch issue.\n` +
            `Please ensure you're connected to the correct network where the CCT token is deployed.\n` +
            `Contract address: ${CCT_TOKEN_ADDRESS}\n` +
            `Error: ${balanceErr.message || 'Unknown error'}`;
          console.error('⚠️', errorMsg);
          throw new Error(errorMsg);
        } else {
          throw new Error(`Failed to check CCT balance: ${balanceErr.message || 'Unknown error'}`);
        }
      }
    } else {
      console.warn('balanceOf function not found on CCT token contract');
    }
  } catch (err) {
    if (err.message.includes('Insufficient CCT')) {
      throw err;
    }
    if (err.message.includes('Failed to check CCT balance')) {
      throw err;
    }
    console.warn('Could not fetch balance:', err.message);
  }

  const MAX_UINT256 = ethers.MaxUint256;
  try {
    if (hasFunc(cctToken, 'allowance') && hasFunc(cctToken, 'approve')) {
      const currentAllowanceResult = await safeCall(cctToken, 'allowance', userAddress, ORBIT_A_ADDRESS);
      
      if (currentAllowanceResult !== null && currentAllowanceResult !== undefined) {
        const currentAllowance = BigInt(currentAllowanceResult.toString());
        // console.log('Current allowance:', ethers.formatEther(currentAllowance));

        const minRequiredAllowance = totalCost > 0n ? totalCost : ethers.parseEther('1000');
        
        if (currentAllowance < minRequiredAllowance) {
          try {
            // console.log('Approving CCT tokens...');
            const approveTx = await cctToken.approve(ORBIT_A_ADDRESS, MAX_UINT256);
            // console.log('Approval transaction sent, waiting for confirmation...');
            const approveReceipt = await approveTx.wait();
            // console.log('Approved CCT - TX:', approveReceipt.hash);
          } catch (approveErr) {
            const updatedAllowanceResult = await safeCall(cctToken, 'allowance', userAddress, ORBIT_A_ADDRESS);
            if (updatedAllowanceResult !== null && updatedAllowanceResult !== undefined) {
              const updatedAllowance = BigInt(updatedAllowanceResult.toString());
              if (updatedAllowance < minRequiredAllowance) {
                const errorMsg = approveErr.reason || approveErr.message || 'Transaction failed';
                console.error('Approval failed:', approveErr);
                
                if (errorMsg.includes('user rejected') || errorMsg.includes('User denied')) {
                  throw new Error('Token approval was cancelled. Please approve the transaction to continue with registration.');
                } else if (errorMsg.includes('insufficient funds') ) {
                  throw new Error('Insufficient funds for gas fees. Please ensure you have enough MATIC/Polygon tokens.');
                } else if (errorMsg.includes('Internal JSON-RPC error')) {
                  throw new Error('Network error during approval. Please check your connection and try again.');
                } else {
                  throw new Error(`Token approval failed: ${errorMsg}. Please try again.`);
                }
              }
              // console.log('Allowance is now sufficient, continuing with registration...');
            } else {
              console.warn('Could not verify allowance after approval attempt. Proceeding with registration...');
            }
          }
        } else {
          // console.log('Sufficient allowance already exists');
        }
      } else {
        console.warn('Could not check current allowance. Attempting to approve tokens...');
        try {
          const approveTx = await cctToken.approve(ORBIT_A_ADDRESS, MAX_UINT256);
          // console.log('Approval transaction sent, waiting for confirmation...');
          const approveReceipt = await approveTx.wait();
          // console.log('Approved CCT - TX:', approveReceipt.hash);
        } catch (approveErr) {
          const errorMsg = approveErr.reason || approveErr.message || 'Transaction failed';
          if (errorMsg.includes('user rejected') || errorMsg.includes('User denied')) {
            throw new Error('Token approval was cancelled. Please approve the transaction to continue with registration.');
          } else if (errorMsg.includes('insufficient funds')) {
            throw new Error('Insufficient funds for gas fees. Please ensure you have enough MATIC/Polygon tokens.');
          } else {
            console.warn('Could not approve tokens, but proceeding with registration. The register function will handle any allowance issues.');
          }
        }
      }
    } else {
      console.warn('Token contract does not have approve/allowance functions');
    }
  } catch (err) {
    console.error('Approval failed:', err);
    if (err.message && (
      err.message.includes('Token approval was cancelled') ||
      err.message.includes('Insufficient funds') ||
      err.message.includes('Network error') ||
      err.message.includes('Token approval failed')
    )) {
      throw err;
    }
    if (err.code === 'BAD_DATA' || err.message?.includes('could not decode')) {
      console.warn('Could not check/approve tokens due to contract call issues. Proceeding with registration...');
    } else {
      throw new Error(`Failed to approve tokens: ${err.message || 'Unknown error'}`);
    }
  }

  try {
    if (hasFunc(orbitA, 'register')) {
      // console.log('Registering user with referrer ID:', referrerID);
      try {
        const registerTx = await orbitA.register(referrerID);
        const receipt = await registerTx.wait();
        // console.log('Registration TX confirmed:', receipt.hash);
        // console.log('Gas Used:', receipt.gasUsed.toString());
        // console.log('Block:', receipt.blockNumber);

        return { success: true, message: 'User registered successfully!', txHash: receipt.hash };
      } catch (registerErr) {
        const errorMsg = registerErr.reason || registerErr.message || 'Transaction failed';
        console.error('Registration transaction failed:', registerErr);
        
        if (errorMsg.includes('user rejected') || errorMsg.includes('User denied')) {
          throw new Error('Registration transaction was cancelled. Please try again.');
        } else if (errorMsg.includes('insufficient funds') ) {
          throw new Error('Insufficient funds for gas fees. Please ensure you have enough MATIC/Polygon tokens.');
        } else if (errorMsg.includes('Internal JSON-RPC error')) {
          throw new Error('Network error during registration. Please check your connection and try again.');
        } else if (errorMsg.includes('Insufficient allowance')) {
          throw new Error('Token allowance insufficient. Please approve tokens first.');
        } else {
          throw new Error(`Registration failed: ${errorMsg}. Please try again.`);
        }
      }
    } else {
      console.warn('Contract function register not found. Cannot register user.');
      return { success: false, message: 'Register function not found' };
    }
  } catch (err) {
    console.error('Registration failed:', err);
    if (err.message && (
      err.message.includes('Registration transaction was cancelled') ||
      err.message.includes('Insufficient funds') ||
      err.message.includes('Network error') ||
      err.message.includes('Token allowance insufficient') ||
      err.message.includes('Registration failed')
    )) {
      throw err;
    }
    throw new Error(err.message || 'Failed to register user. Please try again.');
  }
};

export const registerUserWithWallet = async (provider, referrerID = 1) => {
  if (!provider) {
    throw new Error('Wallet provider not available');
  }
  return registerUser(provider, referrerID);
};
