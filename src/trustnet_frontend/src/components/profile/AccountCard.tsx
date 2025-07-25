// components/profile/AccountCard.tsx
import React, { useState } from 'react';
import { Shield, Copy, Check, RefreshCw } from 'lucide-react';
import { Principal } from '@dfinity/principal';

interface AccountCardProps {
  principal: Principal;
  accountId: string;
  balance: string;
  isLoadingBalance: boolean;
  onRefreshBalance: () => Promise<void>;
}

const AccountCard: React.FC<AccountCardProps> = ({
  principal,
  accountId,
  balance,
  isLoadingBalance,
  onRefreshBalance,
}) => {
  const [copiedPrincipal, setCopiedPrincipal] = useState(false);
  const [copiedAccount, setCopiedAccount] = useState(false);

  const handleCopyPrincipal = async () => {
    await navigator.clipboard.writeText(principal.toText());
    setCopiedPrincipal(true);
    setTimeout(() => setCopiedPrincipal(false), 2000);
  };

  const handleCopyAccount = async () => {
    await navigator.clipboard.writeText(accountId);
    setCopiedAccount(true);
    setTimeout(() => setCopiedAccount(false), 2000);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-md">
      {/* Principal ID */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-purple-100 rounded-lg">
            <Shield className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Principal ID</h3>
            <p className="text-sm text-gray-600 font-mono break-all">
              {principal.toText()}
            </p>
          </div>
        </div>
        <button
          onClick={handleCopyPrincipal}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors group"
        >
          {copiedPrincipal ? (
            <Check className="w-5 h-5 text-green-500" />
          ) : (
            <Copy className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
          )}
        </button>
      </div>

      {/* Account ID */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-gray-900">Account ID</h3>
          <p className="text-sm text-gray-600 font-mono break-all">
            {accountId}
          </p>
        </div>
        <button
          onClick={handleCopyAccount}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors group"
        >
          {copiedAccount ? (
            <Check className="w-5 h-5 text-green-500" />
          ) : (
            <Copy className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
          )}
        </button>
      </div>

      {/* Balance */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-gray-900">Balance</h3>
          <p className="text-sm text-gray-600 font-mono">
            {isLoadingBalance ? 'Cargando...' : `${balance} ICP`}
          </p>
        </div>
        <button
          onClick={onRefreshBalance}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors group disabled:opacity-50"
          disabled={isLoadingBalance}
        >
          <RefreshCw
            className={`w-5 h-5 ${
              isLoadingBalance
                ? 'animate-spin text-blue-500'
                : 'text-gray-400 group-hover:text-gray-600'
            }`}
          />
        </button>
      </div>
    </div>
  );
};

export default AccountCard;
