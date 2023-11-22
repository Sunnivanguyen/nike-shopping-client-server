const UserEntity = require('../entities/userEntity');
const AdminEntity = require('../entities/adminEntity');

class AuthRepository {
  async createUser({ email, newPassword }) {
    const newUser = await UserEntity.create({
      email: email,
      password: newPassword,
    });

    return newUser;
  }

  async createAdmin({ email, newPassword }) {
    const newAdmin = await AdminEntity.create({
      email: email,
      password: newPassword,
    });

    return newAdmin;
  }

  async getUser({ email }) {
    const user = await UserEntity.findOne({ where: { email } });
    return user;
  }

  async getAdmin({ email }) {
    const admin = await AdminEntity.findOne({ where: { email } });
    return admin;
  }
}

module.exports = new AuthRepository();
