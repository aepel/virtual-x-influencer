import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // History topics
  const historyTopics = [
    {
      name: 'Ancient Egypt',
      category: 'history',
      description: 'The civilization of ancient Egypt and its fascinating culture',
    },
    {
      name: 'Roman Empire',
      category: 'history',
      description: 'The rise and fall of the Roman Empire',
    },
    {
      name: 'World War II',
      category: 'history',
      description: 'The global conflict that shaped the modern world',
    },
    {
      name: 'Industrial Revolution',
      category: 'history',
      description: 'The period of major industrialization and innovation',
    },
    {
      name: 'Space Race',
      category: 'history',
      description: 'The competition between the US and USSR in space exploration',
    },
  ];

  // Geography topics
  const geographyTopics = [
    {
      name: 'Amazon Rainforest',
      category: 'geography',
      description: 'The largest tropical rainforest in the world',
    },
    {
      name: 'Himalayas',
      category: 'geography',
      description: 'The highest mountain range in the world',
    },
    {
      name: 'Great Barrier Reef',
      category: 'geography',
      description: 'The world\'s largest coral reef system',
    },
    {
      name: 'Sahara Desert',
      category: 'geography',
      description: 'The largest hot desert in the world',
    },
    {
      name: 'Antarctica',
      category: 'geography',
      description: 'The southernmost continent and the coldest place on Earth',
    },
  ];

  // Create history topics
  for (const topic of historyTopics) {
    await prisma.topic.upsert({
      where: { name: topic.name },
      update: {},
      create: topic,
    });
    console.log(`Created history topic: ${topic.name}`);
  }

  // Create geography topics
  for (const topic of geographyTopics) {
    await prisma.topic.upsert({
      where: { name: topic.name },
      update: {},
      create: topic,
    });
    console.log(`Created geography topic: ${topic.name}`);
  }

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 