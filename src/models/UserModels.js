const prisma = require("../config/database");

async function createUser(name, email, password) {
  return prisma.user.create({ data: { name, email, password } });
}

async function findUserByEmail(email) {
  return await prisma.user.findUnique({
    where: { email },
  });
}

async function updateUser(id, data) {
  return await prisma.user.update({
    where: { id: Number(id) },
    data,
  });
}

async function deleteUser(id) {
  return await prisma.user.delete({
    where: { id: Number(id) },
  });
}

module.exports = {
  createUser,
  findUserByEmail,
  updateUser,
  deleteUser,
};
