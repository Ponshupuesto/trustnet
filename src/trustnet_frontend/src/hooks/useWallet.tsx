// hooks/useWallet.ts
import { useState, useEffect, useCallback } from 'react';
import { Principal } from '@dfinity/principal';
import { AccountIdentifier } from '@dfinity/ledger-icp';
import { icp_ledger_canister } from '../../../declarations/icp_ledger_canister';

// Tipos basados en el IDL del ICP Ledger
interface Tokens {
  e8s: bigint;
}

interface AccountBalanceArgs {
  account: Uint8Array; // AccountIdentifier como Vec(Nat8)
}

interface SubAccount {
  0: Uint8Array;
}

interface TimeStamp {
  timestamp_nanos: bigint;
}

interface TransferArgs {
  to: Uint8Array; // AccountIdentifier
  fee: Tokens;
  memo: bigint;
  from_subaccount: [] | [Uint8Array];
  created_at_time: [] | [TimeStamp];
  amount: Tokens;
}

interface TransferError {
  TxTooOld?: { allowed_window_nanos: bigint };
  BadFee?: { expected_fee: Tokens };
  TxDuplicate?: { duplicate_of: bigint };
  TxCreatedInFuture?: null;
  InsufficientFunds?: { balance: Tokens };
}

interface TransferResult {
  Ok?: bigint;
  Err?: TransferError;
}

interface Transaction {
  to: string;
  amount: string;
  memo?: number;
  fee?: string;
}

interface UseWalletProps {
  principal?: Principal;
  subaccount?: Uint8Array;
  autoRefreshInterval?: number;
}

interface UseWalletReturn {
  // Balance
  balance: string;
  isLoadingBalance: boolean;
  balanceError: string | null;
  refreshBalance: () => Promise<void>;
  
  // Account Info
  accountIdentifier: AccountIdentifier;
  accountIdentifierHex: string;
  accountIdentifierBytes: Uint8Array;
  
  // Transferencias
  transfer: (transaction: Transaction) => Promise<{ success: boolean; blockHeight?: bigint; error?: string }>;
  isTransferring: boolean;
  transferError: string | null;
  
  // Utilidades
  estimateFee: () => Promise<string>;
  validateAddress: (address: string) => boolean;
  textToAccountIdentifier: (text: string) => Uint8Array | null;
  
  // Estado general
  isInitialized: boolean;
}

// Fee estándar del ICP Ledger (0.0001 ICP)
const STANDARD_FEE = BigInt(10_000);

export const useWallet = ({
  principal,
  subaccount,
  autoRefreshInterval
}: UseWalletProps = {}): UseWalletReturn => {
  // Estados
  const [balance, setBalance] = useState<string>('0.00000000');
  const [isLoadingBalance, setIsLoadingBalance] = useState(false);
  const [balanceError, setBalanceError] = useState<string | null>(null);
  const [isTransferring, setIsTransferring] = useState(false);
  const [transferError, setTransferError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Calcular Account Identifier
  if (!principal) {
  throw new Error("Principal is required to generate an account identifier.");
}
  const accountIdentifier = AccountIdentifier.fromPrincipal({  
        principal 
});
    
  const accountIdentifierHex = accountIdentifier?.toHex() || '';
  const accountIdentifierBytes = accountIdentifier?.toUint8Array() || new Uint8Array();
  
  // Función para convertir texto a AccountIdentifier
  const textToAccountIdentifier = useCallback((text: string): Uint8Array | null => {
    try {
      // Si es un hex de 64 caracteres (Account Identifier)
      if (/^[a-f0-9]{64}$/i.test(text)) {
        // Convertir hex a bytes
        const bytes = new Uint8Array(32);
        for (let i = 0; i < 32; i++) {
          bytes[i] = parseInt(text.substr(i * 2, 2), 16);
        }
        return bytes;
      }
      
      // Si es un Principal ID
      try {
        const principal = Principal.fromText(text);
        const accountId = AccountIdentifier.fromPrincipal({ principal, subAccount: undefined });
        return accountId.toUint8Array();
      } catch {
        return null;
      }
    } catch {
      return null;
    }
  }, []);
  
  // Función para obtener el balance
  const refreshBalance = useCallback(async () => {
    if (!principal || !accountIdentifier) {
      setBalanceError('No principal provided');
      return;
    }
    
    setIsLoadingBalance(true);
    setBalanceError(null);
    
    try {
      const balanceArgs: AccountBalanceArgs = {
        account: accountIdentifierBytes
      };
      
      const balanceResult = await icp_ledger_canister.account_balance(balanceArgs);
      
      // Convertir de e8s a ICP
      const icpBalance = Number(balanceResult.e8s) / 100_000_000;
      setBalance(icpBalance.toFixed(8));
    } catch (error) {
      console.error('Error fetching balance:', error);
      setBalanceError(error instanceof Error ? error.message : 'Failed to fetch balance');
    } finally {
      setIsLoadingBalance(false);
    }
  }, [principal, accountIdentifier, accountIdentifierBytes]);
  
  // Función para transferir ICP
  const transfer = useCallback(async (transaction: Transaction) => {
    if (!principal) {
      return { 
        success: false, 
        error: 'No principal available' 
      };
    }
    
    setIsTransferring(true);
    setTransferError(null);
    
    try {
      // Convertir dirección destino a bytes
      const toAccountBytes = textToAccountIdentifier(transaction.to);
      if (!toAccountBytes) {
        throw new Error('Dirección de destino inválida');
      }
      
      // Convertir amount a e8s
      const amountE8s = BigInt(Math.floor(parseFloat(transaction.amount) * 100_000_000));
      
      // Fee en e8s
      const feeE8s = transaction.fee 
        ? BigInt(Math.floor(parseFloat(transaction.fee) * 100_000_000))
        : STANDARD_FEE;
      
      // Preparar argumentos para la transferencia
      const transferArgs: TransferArgs = {
        to: toAccountBytes,
        fee: { e8s: feeE8s },
        memo: BigInt(transaction.memo || 0),
        from_subaccount: subaccount ? [subaccount] : [],
        created_at_time: [], // Opcional
        amount: { e8s: amountE8s }
      };
      
      // Ejecutar transferencia
      const result = await icp_ledger_canister.transfer(transferArgs);
      
      if ('Ok' in result && result.Ok !== undefined) {
        // Actualizar balance después de transferencia exitosa
        await refreshBalance();
        
        return {
          success: true,
          blockHeight: result.Ok
        };
      } else if ('Err' in result && result.Err) {
        // Manejar errores
        let errorMessage = 'Transfer failed';
        const error = result.Err;
        
        if ('InsufficientFunds' in error) {
  const balance = Number(error.InsufficientFunds.balance.e8s) / 100_000_000;
  errorMessage = `Fondos insuficientes. Balance actual: ${balance.toFixed(8)} ICP`;
} else if ('BadFee' in error) {
  const expectedFee = Number(error.BadFee.expected_fee.e8s) / 100_000_000;
  errorMessage = `Fee inválido. Esperado: ${expectedFee.toFixed(8)} ICP`;
} else if ('TxTooOld' in error) {
  errorMessage = 'Transacción muy antigua';
} else if ('TxDuplicate' in error) {
  errorMessage = `Transacción duplicada. Block original: ${error.TxDuplicate.duplicate_of}`;
} else if ('TxCreatedInFuture' in error) {
  errorMessage = 'Transacción creada en el futuro';
}

        
        throw new Error(errorMessage);
      }
      
      throw new Error('Resultado inesperado de la transferencia');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Transfer failed';
      setTransferError(errorMessage);
      return {
        success: false,
        error: errorMessage
      };
    } finally {
      setIsTransferring(false);
    }
  }, [principal, subaccount, textToAccountIdentifier, refreshBalance]);
  
  // Función para estimar fee
  const estimateFee = useCallback(async (): Promise<string> => {
    try {
      const feeResult = await icp_ledger_canister.transfer_fee({});
      const feeIcp = Number(feeResult.transfer_fee.e8s) / 100_000_000;
      return feeIcp.toFixed(8);
    } catch {
      // Fee por defecto si falla
      return '0.00010000';
    }
  }, []);
  
  // Función para validar dirección
  const validateAddress = useCallback((address: string): boolean => {
    return textToAccountIdentifier(address) !== null;
  }, [textToAccountIdentifier]);
  
  // Cargar datos iniciales
  useEffect(() => {
    if (principal && accountIdentifier && !isInitialized) {
      setIsInitialized(true);
      refreshBalance();
    }
  }, [principal, accountIdentifier, isInitialized, refreshBalance]);
  
  // Auto-refresh del balance
  useEffect(() => {
    if (!autoRefreshInterval || !principal || !accountIdentifier) return;
    
    const interval = setInterval(() => {
      refreshBalance();
    }, autoRefreshInterval);
    
    return () => clearInterval(interval);
  }, [autoRefreshInterval, principal, accountIdentifier, refreshBalance]);
  
  return {
    // Balance
    balance,
    isLoadingBalance,
    balanceError,
    refreshBalance,
    
    // Account Info
    accountIdentifier: accountIdentifier!,
    accountIdentifierHex,
    accountIdentifierBytes,
    
    // Transferencias
    transfer,
    isTransferring,
    transferError,
    
    // Utilidades
    estimateFee,
    validateAddress,
    textToAccountIdentifier,
    
    // Estado general
    isInitialized
  };
};