import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('devpassword', 12);

  const user1 = await prisma.user.upsert({
    where: { email: 'nick@bazaarts.com' },
    update: { passwordHash, displayName: 'Nick Thomas' },
    create: { email: 'nick@bazaarts.com', passwordHash, displayName: 'Nick Thomas' },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'creator@bazaarts.com' },
    update: { passwordHash, displayName: 'MuseMaker' },
    create: { email: 'creator@bazaarts.com', passwordHash, displayName: 'MuseMaker' },
  });

  const profile2 = await prisma.creatorProfile.upsert({
    where: { userId: user2.id },
    update: { bio: 'Digital artist specializing in neon cyber-bazaar aesthetics.', skills: ['Illustration', 'Concept Art', 'Neon Design'] },
    create: {
      userId: user2.id,
      bio: 'Digital artist specializing in neon cyber-bazaar aesthetics.',
      skills: ['Illustration', 'Concept Art', 'Neon Design'],
      portfolioLinks: [],
    },
  });

  const listing = await prisma.listing.upsert({
    where: { id: 'seed-neon-cyber-bazaar' },
    update: {},
    create: {
      id: 'seed-neon-cyber-bazaar',
      creatorId: profile2.id,
      title: 'Neon Cyber-Bazaar Artwork',
      description: 'Custom neon artwork inspired by futuristic marketplaces.',
      price: 120,
      deliveryDays: 7,
      status: 'PUBLISHED',
      portfolioLinks: [],
      tags: { connectOrCreate: [{ where: { name: 'Neon' }, create: { name: 'Neon' } }, { where: { name: 'Cyber' }, create: { name: 'Cyber' } }] },
    },
  });

  const conversation = await prisma.conversation.create({
    data: { participants: { connect: [{ id: user1.id }, { id: user2.id }] } },
  });

  await prisma.message.createMany({
    data: [
      { conversationId: conversation.id, senderId: user1.id, content: 'Hey! I love your neon work. Can we collaborate?' },
      { conversationId: conversation.id, senderId: user2.id, content: 'Absolutely! What style are you thinking?' },
    ],
  });

  console.log(`Seed complete for BazaArts. Listing: ${listing.title}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}).finally(() => prisma.$disconnect());
