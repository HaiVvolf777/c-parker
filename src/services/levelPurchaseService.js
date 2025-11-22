import { ethers } from 'ethers';
import OrbitAAbi from '../abis/OrbitA.json';
import OrbitBAbi from '../abis/OrbitB.json';
import CCTTokenAbi from '../abis/CCTToken.json';
import { getUserLevels } from './apiClient.js';

const ORBIT_A_ADDRESS = import.meta.env?.VITE_ORBIT_A_ADDRESS ?? '0xYourOrbitAContractAddress';
const ORBIT_B_ADDRESS = import.meta.env?.VITE_ORBIT_B_ADDRESS ?? '0xYourOrbitBContractAddress';
const CCT_TOKEN_ADDRESS = import.meta.env?.VITE_CCT_TOKEN_ADDRESS ?? '0xYourCCTTokenAddress';

// Helper to check if function exists
const hasFunc = (contract, fnName) => {
  try {
    return contract && typeof contract[fnName] === 'function';
  } catch {
    return false;
  }
};

/**
 * Purchase Orbit A Level
 * @param {Object} walletConnectProvider - Wallet provider
 * @param {number} level - Level number to purchase (1-10)
 * @returns {Promise<Object>} Result object with success status and message
 */
export const purchaseOrbitALevel = async (walletConnectProvider, level) => {
  if (!walletConnectProvider) throw new Error('Wallet provider not initialized');
  if (!level || level < 1 || level > 10) throw new Error('Invalid level number. Must be between 1 and 10');

  const provider = new ethers.BrowserProvider(walletConnectProvider);
  const signer = await provider.getSigner();
  const userAddress = await signer.getAddress();

  const orbitA = new ethers.Contract(ORBIT_A_ADDRESS, OrbitAAbi, signer);
  const cctToken = new ethers.Contract(CCT_TOKEN_ADDRESS, CCTTokenAbi, signer);

  try {
    // Get user ID
    let userId = 0n;
    if (hasFunc(orbitA, 'addressToUserID')) {
      userId = await orbitA.addressToUserID(userAddress);
      if (userId === 0n) {
        throw new Error('User not registered. Please register first.');
      }
    } else {
      throw new Error('Contract function addressToUserID not found');
    }

    // Check if level is already active (blockchain check)
    let blockchainSaysActive = false;
    if (hasFunc(orbitA, 'isLevelActive')) {
      blockchainSaysActive = await orbitA.isLevelActive(userId, level);
      if (blockchainSaysActive) {
        // Also check database to see if there's a sync issue
        try {
          const dbLevels = await getUserLevels(Number(userId), { orbit: 'ORBIT_A' });
          const dbLevel = dbLevels?.find(l => l.levelNumber === level && l.isActive);
          
          if (!dbLevel) {
            // Blockchain says active but database doesn't - sync issue
            console.warn(`[OrbitA] Level ${level} is active on blockchain but not in database. Database sync may be needed.`);
            return { 
              success: false, 
              message: `Level ${level} is already active on the blockchain, but the database is out of sync. Please contact support or wait for the database to sync.` 
            };
          } else {
            // Both blockchain and database agree - level is active
            return { success: false, message: `Level ${level} is already active!` };
          }
        } catch (dbCheckErr) {
          // If database check fails, still respect blockchain state
          console.error('Error checking database for level status:', dbCheckErr);
          return { success: false, message: `Level ${level} is already active on the blockchain!` };
        }
      }
    }

    // Check if can purchase (for levels 2-10)
    if (level >= 2 && hasFunc(orbitA, 'canPurchaseLevel')) {
      const canBuy = await orbitA.canPurchaseLevel(userId, level);
      if (!canBuy) {
        return { success: false, message: `Cannot purchase Level ${level}. Prerequisites not met.` };
      }
    }

    // Calculate required CCT
    let requiredCCT = 0n;
    if (hasFunc(orbitA, 'calculateCCTAmount')) {
      requiredCCT = await orbitA.calculateCCTAmount(level);
    } else {
      throw new Error('Contract function calculateCCTAmount not found');
    }

    // Check balance
    if (hasFunc(cctToken, 'balanceOf')) {
      const balance = await cctToken.balanceOf(userAddress);
      if (balance < requiredCCT) {
        const requiredFormatted = ethers.formatEther(requiredCCT);
        const balanceFormatted = ethers.formatEther(balance);
        throw new Error(`Insufficient CCT! Need ${requiredFormatted} CCT, have ${balanceFormatted} CCT`);
      }
    }

    // Check and approve if needed
    if (hasFunc(cctToken, 'allowance') && hasFunc(cctToken, 'approve')) {
      const currentAllowance = await cctToken.allowance(userAddress, ORBIT_A_ADDRESS);
      if (currentAllowance < requiredCCT) {
        try {
          const MAX_UINT256 = ethers.MaxUint256;
          const approveTx = await cctToken.approve(ORBIT_A_ADDRESS, MAX_UINT256);
          await approveTx.wait();
        } catch (approveErr) {
          // Check if allowance is now sufficient (user might have approved manually)
          const updatedAllowance = await cctToken.allowance(userAddress, ORBIT_A_ADDRESS);
          if (updatedAllowance < requiredCCT) {
            const errorMsg = approveErr.reason || approveErr.message || 'Transaction failed';
            if (errorMsg.includes('user rejected') || errorMsg.includes('User denied')) {
              throw new Error('Token approval was cancelled. Please approve the transaction to continue.');
            } else if (errorMsg.includes('insufficient funds') ) {
              throw new Error('Insufficient funds for gas fees. Please ensure you have enough MATIC/Polygon tokens.');
            } else if (errorMsg.includes('Internal JSON-RPC error')) {
              throw new Error('Network error during approval. Please check your connection and try again.');
            } else {
              throw new Error(`Token approval failed: ${errorMsg}. Please try again.`);
            }
          }
          // If allowance is now sufficient, continue
        }
      }
    }

    // Buy level
    if (hasFunc(orbitA, 'buyLevel')) {
      try {
        const buyTx = await orbitA.buyLevel(level);
        const receipt = await buyTx.wait();

        return {
          success: true,
          message: `Level ${level} purchased successfully!`,
          txHash: receipt.hash,
          level: level,
        };
      } catch (buyErr) {
        const errorMsg = buyErr.reason || buyErr.message || 'Transaction failed';
        if (errorMsg.includes('user rejected') || errorMsg.includes('User denied')) {
          throw new Error('Purchase transaction was cancelled. Please try again.');
        } else if (errorMsg.includes('insufficient funds') ) {
          throw new Error('Insufficient funds for gas fees. Please ensure you have enough MATIC/Polygon tokens.');
        } else if (errorMsg.includes('Internal JSON-RPC error')) {
          throw new Error('Network error during purchase. Please check your connection and try again.');
        } else if (errorMsg.includes('Insufficient allowance')) {
          throw new Error('Token allowance insufficient. Please approve tokens first.');
        } else {
          throw new Error(`Purchase failed: ${errorMsg}. Please try again.`);
        }
      }
    } else {
      throw new Error('Contract function buyLevel not found');
    }
  } catch (err) {
    console.error('Purchase Orbit A Level error:', err);
    // Re-throw with user-friendly message if it's already a formatted error
    if (err.message && !err.message.includes('Purchase Orbit A Level error')) {
      throw err;
    }
    // Otherwise, provide a generic error
    throw new Error(err.message || 'Failed to purchase level. Please try again.');
  }
};

/**
 * Purchase Orbit B Level
 * @param {Object} walletConnectProvider - Wallet provider
 * @param {number} level - Level number to purchase (1-10)
 * @returns {Promise<Object>} Result object with success status and message
 */
export const purchaseOrbitBLevel = async (walletConnectProvider, level) => {
  if (!walletConnectProvider) throw new Error('Wallet provider not initialized');
  if (!level || level < 1 || level > 10) throw new Error('Invalid level number. Must be between 1 and 10');

  const provider = new ethers.BrowserProvider(walletConnectProvider);
  const signer = await provider.getSigner();
  const userAddress = await signer.getAddress();

  const orbitA = new ethers.Contract(ORBIT_A_ADDRESS, OrbitAAbi, signer);
  const orbitB = new ethers.Contract(ORBIT_B_ADDRESS, OrbitBAbi, signer);
  const cctToken = new ethers.Contract(CCT_TOKEN_ADDRESS, CCTTokenAbi, signer);

  try {
    // Get user ID from Orbit A
    let userId = 0n;
    if (hasFunc(orbitA, 'addressToUserID')) {
      userId = await orbitA.addressToUserID(userAddress);
      if (userId === 0n) {
        throw new Error('User not registered. Please register first.');
      }
    } else {
      throw new Error('Contract function addressToUserID not found');
    }

    // Check if Orbit B is activated
    if (hasFunc(orbitB, 'isOrbitBActive')) {
      const isOrbitBActive = await orbitB.isOrbitBActive(userId);
      if (!isOrbitBActive) {
        throw new Error('Orbit B not activated. Activate during registration.');
      }
    }

    // Check if level is already active (blockchain check)
    let blockchainSaysActive = false;
    if (hasFunc(orbitB, 'isLevelActive')) {
      blockchainSaysActive = await orbitB.isLevelActive(userId, level);
      if (blockchainSaysActive) {
        // Also check database to see if there's a sync issue
        try {
          const dbLevels = await getUserLevels(Number(userId), { orbit: 'ORBIT_B' });
          const dbLevel = dbLevels?.find(l => l.levelNumber === level && l.isActive);
          
          if (!dbLevel) {
            // Blockchain says active but database doesn't - sync issue
            console.warn(`[OrbitB] Level ${level} is active on blockchain but not in database. Database sync may be needed.`);
            return { 
              success: false, 
              message: `Level ${level} is already active on the blockchain, but the database is out of sync. Please contact support or wait for the database to sync.` 
            };
          } else {
            // Both blockchain and database agree - level is active
            return { success: false, message: `Level ${level} is already active!` };
          }
        } catch (dbCheckErr) {
          // If database check fails, still respect blockchain state
          console.error('Error checking database for level status:', dbCheckErr);
          return { success: false, message: `Level ${level} is already active on the blockchain!` };
        }
      }
    }

    // Check if can purchase (for levels 2-10)
    if (level >= 2 && hasFunc(orbitB, 'canPurchaseLevel')) {
      const canBuy = await orbitB.canPurchaseLevel(userId, level);
      if (!canBuy) {
        return { success: false, message: `Cannot purchase Level ${level}. Prerequisites not met.` };
      }
    }

    // Calculate required CCT
    let requiredCCT = 0n;
    if (hasFunc(orbitB, 'calculateCCTAmount')) {
      requiredCCT = await orbitB.calculateCCTAmount(level);
    } else {
      throw new Error('Contract function calculateCCTAmount not found');
    }

    // Check balance
    if (hasFunc(cctToken, 'balanceOf')) {
      const balance = await cctToken.balanceOf(userAddress);
      if (balance < requiredCCT) {
        const requiredFormatted = ethers.formatEther(requiredCCT);
        const balanceFormatted = ethers.formatEther(balance);
        throw new Error(`Insufficient CCT! Need ${requiredFormatted} CCT, have ${balanceFormatted} CCT`);
      }
    }

    // Check and approve if needed
    if (hasFunc(cctToken, 'allowance') && hasFunc(cctToken, 'approve')) {
      const currentAllowance = await cctToken.allowance(userAddress, ORBIT_B_ADDRESS);
      if (currentAllowance < requiredCCT) {
        try {
          const MAX_UINT256 = ethers.MaxUint256;
          const approveTx = await cctToken.approve(ORBIT_B_ADDRESS, MAX_UINT256);
          await approveTx.wait();
        } catch (approveErr) {
          // Check if allowance is now sufficient (user might have approved manually)
          const updatedAllowance = await cctToken.allowance(userAddress, ORBIT_B_ADDRESS);
          if (updatedAllowance < requiredCCT) {
            const errorMsg = approveErr.reason || approveErr.message || 'Transaction failed';
            if (errorMsg.includes('user rejected') || errorMsg.includes('User denied')) {
              throw new Error('Token approval was cancelled. Please approve the transaction to continue.');
            } else if (errorMsg.includes('insufficient funds') ) {
              throw new Error('Insufficient funds for gas fees. Please ensure you have enough MATIC/Polygon tokens.');
            } else if (errorMsg.includes('Internal JSON-RPC error')) {
              throw new Error('Network error during approval. Please check your connection and try again.');
            } else {
              throw new Error(`Token approval failed: ${errorMsg}. Please try again.`);
            }
          }
          // If allowance is now sufficient, continue
        }
      }
    }

    // Buy level
    if (hasFunc(orbitB, 'buyLevel')) {
      try {
        const buyTx = await orbitB.buyLevel(level);
        const receipt = await buyTx.wait();

        return {
          success: true,
          message: `Orbit B Level ${level} purchased successfully!`,
          txHash: receipt.hash,
          level: level,
        };
      } catch (buyErr) {
        const errorMsg = buyErr.reason || buyErr.message || 'Transaction failed';
        if (errorMsg.includes('user rejected') || errorMsg.includes('User denied')) {
          throw new Error('Purchase transaction was cancelled. Please try again.');
        } else if (errorMsg.includes('insufficient funds') ) {
          throw new Error('Insufficient funds for gas fees. Please ensure you have enough MATIC/Polygon tokens.');
        } else if (errorMsg.includes('Internal JSON-RPC error')) {
          throw new Error('Network error during purchase. Please check your connection and try again.');
        } else if (errorMsg.includes('Insufficient allowance')) {
          throw new Error('Token allowance insufficient. Please approve tokens first.');
        } else {
          throw new Error(`Purchase failed: ${errorMsg}. Please try again.`);
        }
      }
    } else {
      throw new Error('Contract function buyLevel not found');
    }
  } catch (err) {
    console.error('Purchase Orbit B Level error:', err);
    // Re-throw with user-friendly message if it's already a formatted error
    if (err.message && !err.message.includes('Purchase Orbit B Level error')) {
      throw err;
    }
    // Otherwise, provide a generic error
    throw new Error(err.message || 'Failed to purchase level. Please try again.');
  }
};

/**
 * Convenience function - Purchase Orbit A Level with provider from WalletContext
 * @param {Object} provider - Wallet provider from WalletContext
 * @param {number} level - Level number to purchase
 * @returns {Promise<Object>} Result object
 */
export const purchaseOrbitALevelWithWallet = async (provider, level) => {
  if (!provider) {
    throw new Error('Wallet provider not available');
  }
  return purchaseOrbitALevel(provider, level);
};

/**
 * Convenience function - Purchase Orbit B Level with provider from WalletContext
 * @param {Object} provider - Wallet provider from WalletContext
 * @param {number} level - Level number to purchase
 * @returns {Promise<Object>} Result object
 */
export const purchaseOrbitBLevelWithWallet = async (provider, level) => {
  if (!provider) {
    throw new Error('Wallet provider not available');
  }
  return purchaseOrbitBLevel(provider, level);
};

