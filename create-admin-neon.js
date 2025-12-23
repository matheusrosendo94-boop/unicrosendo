const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createAdmin() {
  try {
    const hash = bcrypt.hashSync('@Batata123', 10);
    await prisma.user.create({
      data: {
        email: 'matheusrosendo95@gmail.com',
        password: hash,
        name: 'Administrador',
        role: 'admin'
      }
    });
    console.log('✅ Admin criado com sucesso!');
  } catch (error) {
    console.error('❌ Erro:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
