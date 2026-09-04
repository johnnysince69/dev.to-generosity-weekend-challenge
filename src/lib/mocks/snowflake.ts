export const mockSnowflake = {
  getGlobalGenerosityData: async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
      totalDonated: 1250400,
      activeCampaigns: 342,
      topCategories: [
        { name: "Education", percentage: 40 },
        { name: "Healthcare", percentage: 30 },
        { name: "Environment", percentage: 20 },
        { name: "Other", percentage: 10 }
      ],
      monthlyTrend: [
        { month: 'Jan', amount: 100000 },
        { month: 'Feb', amount: 120000 },
        { month: 'Mar', amount: 115000 },
        { month: 'Apr', amount: 150000 },
        { month: 'May', amount: 180000 },
      ]
    };
  }
};
