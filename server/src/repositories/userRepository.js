const UserEntity = require('../entities/userEntity');

class UserRepository {
  async createUser(userEnity) {
    console.log('userEnity', userEnity);
    const newUser = await UserEntity.create(userEnity);
    return newUser;
  }

  async updateUser(userEntity) {
    const updatedUser = await UserEntity.update(userEntity, {
      where: { id: +userEntity.id },
    });
    return updatedUser;
  }

  async getAllUsers() {
    const users = await UserEntity.findAll();

    let others;
    if (users.length > 0) {
      others = users.map((user) => {
        const { password, ...others } = user.dataValues;
        return others;
      });
    }
    return others;
  }

  async getUser(userId) {
    const currentUser = await UserEntity.findByPk(+userId);

    const { password, ...others } = currentUser.dataValues;
    return others;
  }

  async softDeleteUser(userId) {
    const deletedUser = await UserEntity.destroy({ where: { id: +userId } });
    return deletedUser;
  }

  async hardDeleteUser(userId) {
    const deletedUser = await UserEntity.destroy({
      where: { id: +userId },
      force: true,
    });
    return deletedUser;
  }

  async restoreUser(userId) {
    const restoredUser = await UserEntity.restore({ where: { id: +userId } });
    return restoredUser;
  }

  async createUserBankAccount({ userId, data }) {
    const newBankAccount = await UserEntity.create({
      user_id: +userId,
      payment_method_id: +data.payment_method_id,
      name_on_card: data.name_on_card,
      card_number: data.card_number,
      expire_date: data.expire_date,
      cvc: data.cvc,
      is_default: +data.is_default,
    });
    return newBankAccount;
  }

  async updateUserBankAccount({ bankAccountId, data }) {
    const updatedBankAccount = await UserEntity.update(
      {
        payment_method_id: +data.payment_method_id,
        name_on_card: data.name_on_card,
        card_number: data.card_number,
        expire_date: data.expire_date,
        cvc: data.cvc,
        is_default: +data.is_default,
      },
      { where: { id: +bankAccountId } },
    );
    return updatedBankAccount;
  }

  async getAllUserBankAccounts(userId) {
    const userBankAccounts = await UserEntity.findAll({
      where: { user_id: +userId },
    });

    return userBankAccounts;
  }

  async getUserBankAccount(userId, bankAccountId) {
    const userBankAccount = await UserEntity.findOne({
      where: { user_id: +userId, id: +bankAccountId },
    });

    return userBankAccount;
  }

  async deleteUserBankAccount(userId, bankAccountId) {
    const deletedUserBankAccount = await UserEntity.destroy({
      where: { user_id: +userId, id: +bankAccountId },
    });

    return deletedUserBankAccount;
  }
}
module.exports = new UserRepository();
