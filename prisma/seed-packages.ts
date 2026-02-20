import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting package seed...");

  // Find a client user to assign packages to
  const client = await prisma.user.findFirst({
    where: { role: "CLIENT" },
  });

  if (!client) {
    console.log("No client user found. Please create a client user first.");
    return;
  }

  console.log(`Found client: ${client.email}`);

  // Create test packages
  const packages = [
    {
      userId: client.id,
      subscriptionId: `sub_test_starter_${Date.now()}`,
      priceId: "price_test_starter",
      packageName: "Starter",
      amount: 100000, // $1,000 in cents
      status: "PAID" as const,
    },
    {
      userId: client.id,
      subscriptionId: `sub_test_growth_${Date.now()}`,
      priceId: "price_test_growth",
      packageName: "Growth",
      amount: 250000, // $2,500 in cents
      status: "PAID" as const,
    },
  ];

  for (const pkg of packages) {
    const created = await prisma.subscription.create({
      data: pkg,
    });
    console.log(`Created package: ${created.packageName} - $${created.amount / 100}`);
  }

  console.log("Package seed completed!");
}

main()
  .catch((e) => {
    console.error("Error seeding packages:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
