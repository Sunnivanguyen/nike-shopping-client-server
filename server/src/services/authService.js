const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const AuthRepository = require('../repositories/authRepository');
const { ConflictException, UnAuthorizedException } = require('../exceptions');

class AuthService {
  async userSignup({ email, password }) {
    try {
      const user = await AuthRepository.getUser({ email });

      if (user) {
        throw new ConflictException('Email already existed', 409);
      }

      const salt = 10;
      const genSalt = await bcrypt.genSalt(salt);
      const newPassword = await bcrypt.hash(password, genSalt);

      const newUser = await AuthRepository.createUser({ email, newPassword });

      const responseData = {
        newUser,
      };
      return responseData;
    } catch (error) {
      throw error;
    }
  }

  async adminSignup({ email, password }) {
    try {
      const admin = await AuthRepository.getAdmin({ email });

      if (admin) {
        throw new ConflictException('Email already existed', 409);
      }

      const salt = 10;
      const genSalt = await bcrypt.genSalt(salt);
      const newPassword = await bcrypt.hash(password, genSalt);

      const newAdmin = await AuthRepository.createAdmin({ email, newPassword });

      const responseData = {
        newAdmin,
      };
      return responseData;
    } catch (error) {
      throw error;
    }
  }

  async userLogin({ email, password }) {
    try {
      const checkedUser = await AuthRepository.getUser({ email });
      if (!checkedUser) {
        throw new ConflictException('This email has not been registed', 409);
      }

      const checkedPassword = bcrypt.compare(password, checkedUser.password);
      if (checkedPassword) {
        const { password, ...user } = checkedUser.dataValues;

        const token = jwt.sign(user, process.env.JWT_SECRET);

        const responseData = {
          token,
          user,
        };

        return responseData;
      }

      throw new UnAuthorizedException('Wrong Password', 401);
    } catch (error) {
      throw error;
    }
  }

  async adminLogin({ email, password }) {
    try {
      const checkedAdmin = await AuthRepository.getAdmin({ email });
      if (!checkedAdmin) {
        throw new ConflictException('This email has not been registed', 409);
      }

      const checkedPassword = bcrypt.compare(password, checkedAdmin.password);
      if (checkedPassword) {
        const { password, ...admin } = checkedAdmin.dataValues;

        const token = jwt.sign(admin, process.env.JWT_SECRET);

        const responseData = {
          token,
          admin,
        };

        return responseData;
      }

      throw new UnAuthorizedException('Wrong Password', 401);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new AuthService();
