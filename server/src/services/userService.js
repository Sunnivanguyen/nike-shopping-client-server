const bcrypt = require('bcryptjs');

const UserRepository = require('../repositories/userRepository');
const AuthRepository = require('../repositories/authRepository');
const { NotFoundException } = require('../exceptions');

class UserService {
  //Create User
  async createUser({ data }) {
    const { email, password } = data;
    try {
      const user = await AuthRepository.getUser({ email });

      if (user) {
        throw new ConflictException('Email already existed', 409);
      }

      const salt = 10;
      const genSalt = await bcrypt.genSalt(salt);
      const newPassword = await bcrypt.hash(password, genSalt);

      const userEnity = {
        email: data.email,
        password: newPassword,
        first_name: data.first_name,
        last_name: data.last_name,
        phone_number: data.phone_number,
        avatar: data.avatar,
        status: +data.status,
      };

      const newUser = await UserRepository.createUser(userEnity);

      const { password: _, ...userData } = newUser;
      const responseData = {
        ...userData.dataValues,
      };
      return responseData;
    } catch (error) {
      throw error;
    }
  }

  async updateUser(userEntity) {
    try {
      const updatedUser = await UserRepository.updateUser(userEntity);

      if (!updatedUser) {
        throw new BadRequestException('Bad Request', 400);
      }

      const responseData = {
        updatedUser,
      };

      return responseData;
    } catch (error) {
      throw error;
    }
  }

  async getAllUsers() {
    try {
      const users = await UserRepository.getAllUsers();

      if (!users) {
        throw new BadRequestException('Bad Request', 400);
      }

      const responseData = {
        users,
      };
      return responseData;
    } catch (error) {
      throw error;
    }
  }

  async getUser(userId) {
    try {
      const user = await UserRepository.getUser(userId);

      if (!user) {
        throw new NotFoundException('User not found', 404);
      }

      const responseData = {
        user,
      };

      return responseData;
    } catch (error) {
      throw error;
    }
  }

  async softDeleteUser(userId) {
    try {
      const deletedUser = await UserRepository.softDeleteUser(userId);

      if (!deletedUser) {
        throw new BadRequestException('Bad Request', 400);
      }

      const responseData = {
        deletedUser,
      };

      return responseData;
    } catch (error) {
      throw error;
    }
  }

  async hardDeleteUser(userId) {
    try {
      const deletedUser = await UserRepository.hardDeleteUser(userId);

      if (!deletedUser) {
        throw new BadRequestException('Bad Request', 400);
      }

      const responseData = {
        deletedUser,
      };
      return responseData;
    } catch (error) {
      throw error;
    }
  }

  async restoreUser(userId) {
    try {
      const restoredUser = await UserRepository.restoreUser(userId);

      if (!restoredUser) {
        throw new BadRequestException('Bad Request', 400);
      }

      const responseData = {
        restoredUser,
      };
      return responseData;
    } catch (error) {
      throw error;
    }
  }

  async createUserBankAccount({ userId, data }) {
    try {
      const newBankAccount = await UserRepository.createUserBankAccount({
        userId,
        data,
      });

      const responseData = {
        newBankAccount,
      };
      return responseData;
    } catch (error) {
      throw error;
    }
  }

  async updateUserBankAccount({ userAccountId, data }) {
    try {
      const updatedUserBankAccount = await UserRepository.updateUserBankAccount(
        {
          userAccountId,
          data,
        },
      );

      const responseData = {
        updatedUserBankAccount,
      };
      return responseData;
    } catch (error) {
      throw error;
    }
  }

  async getAllUserBankAccounts(userId) {
    try {
      const userBankAccounts =
        await UserRepository.getAllUserBankAccounts(userId);

      const responseData = {
        userBankAccounts,
      };
      return responseData;
    } catch (error) {
      throw error;
    }
  }

  async getUserBankAccount(userId, bankAccountId) {
    try {
      const userBankAccount = await UserRepository.getUserBankAccount(
        userId,
        bankAccountId,
      );

      const responseData = {
        userBankAccount,
      };

      return responseData;
    } catch (error) {
      ResponseService.error(error);
    }
  }

  async deleteUserBankAccount(userId, bankAccountId) {
    try {
      const deletedUserBankAccount = await UserRepository.deleteUserBankAccount(
        userId,
        bankAccountId,
      );

      const responseData = {
        deletedUserBankAccount,
      };

      return responseData;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new UserService();
