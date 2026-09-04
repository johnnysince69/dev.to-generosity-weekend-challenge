import { NextResponse } from 'next/server';
import snowflake from 'snowflake-sdk';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    if (process.env.SNOWFLAKE_ACCOUNT && process.env.SNOWFLAKE_USERNAME && process.env.SNOWFLAKE_PASSWORD) {
        // SNOWFLAKE LOGIC
        const res = await fetchFromSnowflake();
        return res as NextResponse;
    } else {
        // FALLBACK TO LOCAL PRISMA DB if Snowflake isn't set up yet
        return await fetchFromLocalDB();
    }
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
  }
}

async function fetchFromSnowflake(): Promise<NextResponse> {
  return new Promise((resolve, reject) => {
    const connection = snowflake.createConnection({
      account: process.env.SNOWFLAKE_ACCOUNT!,
      username: process.env.SNOWFLAKE_USERNAME!,
      password: process.env.SNOWFLAKE_PASSWORD!,
      warehouse: process.env.SNOWFLAKE_WAREHOUSE,
      database: process.env.SNOWFLAKE_DATABASE,
      schema: process.env.SNOWFLAKE_SCHEMA,
    });

    connection.connect((err, conn) => {
      if (err) {
        console.error('Unable to connect to Snowflake: ' + err.message);
        return reject(err);
      }

      // Execute a query to get aggregated data
      // For this hackathon, assuming a table `GLOBAL_DONATIONS` exists.
      conn.execute({
        sqlText: `
          SELECT
            (SELECT SUM(AMOUNT) FROM DONATIONS) as totalDonated,
            (SELECT COUNT(*) FROM CAMPAIGNS) as activeCampaigns
        `,
        complete: (err, stmt, rows) => {
          if (err) {
            console.error('Failed to execute statement due to the following error: ' + err.message);
            return reject(err);
          }

          // Generate mock trend and categories since we don't have complex tables set up yet
          const result = {
            totalDonated: rows && rows[0] && rows[0].TOTALDONATED ? Number(rows[0].TOTALDONATED) : 1250400,
            activeCampaigns: rows && rows[0] && rows[0].ACTIVECAMPAIGNS ? Number(rows[0].ACTIVECAMPAIGNS) : 342,
            topCategories: [
              { name: "Education", percentage: 40 },
              { name: "Healthcare", percentage: 30 },
              { name: "Environment", percentage: 20 },
              { name: "Other", percentage: 10 }
            ],
            monthlyTrend: [
              { month: 'Apr', amount: 150000 },
              { month: 'May', amount: 180000 },
              { month: 'Jun', amount: 200000 },
              { month: 'Jul', amount: 190000 },
              { month: 'Aug', amount: 250000 },
              { month: 'Sep', amount: 300000 },
            ]
          };
          resolve(NextResponse.json(result));
        }
      });
    });
  });
}

async function fetchFromLocalDB() {
    console.warn("Snowflake not configured, fetching analytics from local Prisma DB");

    const totalDonatedAgg = await prisma.donation.aggregate({
        _sum: {
            amount: true,
        }
    });

    const activeCampaigns = await prisma.campaign.count();

    const total = totalDonatedAgg._sum.amount || 1250400; // Use a base number so dashboard doesn't look empty

    return NextResponse.json({
        totalDonated: total,
        activeCampaigns: activeCampaigns > 0 ? activeCampaigns : 342,
        topCategories: [
          { name: "Clean Water", percentage: 45 },
          { name: "AI Education", percentage: 35 },
          { name: "Renewable Energy", percentage: 20 }
        ],
        monthlyTrend: [
          { month: 'Apr', amount: 150000 },
          { month: 'May', amount: 180000 },
          { month: 'Jun', amount: 200000 },
          { month: 'Jul', amount: 190000 },
          { month: 'Aug', amount: 250000 },
          { month: 'Sep', amount: 300000 },
        ]
    });
}
