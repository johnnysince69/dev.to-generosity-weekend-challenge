export const mockSolana = {
  donate: async (amount: number, campaignId: string): Promise<{ success: boolean; transactionId: string }> => {
    console.debug(`Donating ${amount} to ${campaignId}`);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return {
      success: true,
      transactionId: `sol_tx_${Math.random().toString(36).substring(7)}`,
    };
  },
  getRecentTransactions: async (campaignId: string) => {
      console.debug(`Fetching transactions for ${campaignId}`);
      await new Promise((resolve) => setTimeout(resolve, 500));
      return [
          { amount: 50, timestamp: Date.now() - 1000 * 60 * 5, txId: 'sol_tx_123' },
          { amount: 100, timestamp: Date.now() - 1000 * 60 * 60, txId: 'sol_tx_456' },
      ];
  }
};
