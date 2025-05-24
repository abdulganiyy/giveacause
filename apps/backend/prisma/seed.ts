import * as bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function createUser(
  id: string,
  userData: {
    roleId: string;
    email: string;
    firstname: string;
    lastname: string;
    password: string;
  },
) {
  const { roleId, ...user } = userData;

  await prisma.user.upsert({
    where: { id },
    update: {},
    create: {
      id,
      roleId,
      ...user,
    },
  });
  console.log(`Upserted User ${user.firstname}`);

}

async function main() {

    const userRoleId = '780b4d11-748c-482b-abad-8dd42965c969';
    await prisma.role.upsert({
      where: { id: userRoleId },
      update: {},
      create: {
        id: userRoleId,
        name: 'User',
      },
    });
    console.log('Upserted Coordinator Role');


  const supervisorRoleId = '3c7a2642-8a58-40bd-aac2-fa48321f5664';
  await prisma.role.upsert({
    where: { id: supervisorRoleId },
    update: {},
    create: {
      id: supervisorRoleId,
      name: 'Supervisor',
    },
  });
  console.log('Upserted Supervisor Role');

  const administratorRoleId = '33e85104-816c-4266-891b-6ef9b8ae7c15';
  await prisma.role.upsert({
    where: { id: administratorRoleId },
    update: {},
    create: {
      id: administratorRoleId,
      name: 'Administrator',
    },
  });
  console.log('Upserted Administrator Role');

const superSecretPasswordHash = '$2b$10$1.hQBnDaIB78x1iHfUWMYeUgkvQy8oMs2/zJbQ1zG8nFGgAn4hBJe';

// console.log(superSecretPasswordHash)

  await createUser('58544ec4-d693-4d0c-9a66-95b74e879059', {
    roleId: userRoleId,
    email: 'user@example.com',
    firstname: 'Abubakr',
    lastname: 'User',
    password: superSecretPasswordHash,
  });

  await createUser('83e54d70-51db-4392-8f6f-65f70ff30880', {
    roleId: supervisorRoleId,
    email: 'umar@example.com',
    firstname: 'Umar',
    lastname: 'Supervisor',
    password: superSecretPasswordHash,
  });


  await createUser('fa13e723-d887-4381-b25c-5a2ade423bcc', {
    roleId: administratorRoleId,
    email: 'usman@example.com',
    firstname: 'Usman',
    lastname: 'Administrator',
    password: superSecretPasswordHash,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
