const bcrypt = require('bcryptjs');

const AdminRepository = require('../repositories/adminRepository');
const AuthRepository = require('../repositories/authRepository');
const { NotFoundException, ConflictException } = require('../exceptions');

class AdminService {
  async createAdmin({ data }) {
    const { email, password } = data;
    try {
      const admin = await AuthRepository.getAdmin({ email });

      if (admin) {
        throw new ConflictException('Email already existed', 409);
      }

      const salt = 10;
      const genSalt = await bcrypt.genSalt(salt);
      const newPassword = await bcrypt.hash(password, genSalt);

      const adminEntity = {
        email: data.email,
        password: newPassword,
        first_name: data.first_name,
        last_name: data.last_name,
        phone_number: data.phone_number,
        avatar: data.avatar,
        status: +data.status,
      };

      const newAdmin = await AdminRepository.createAdmin(adminEntity);

      const { password: _, ...adminData } = newAdmin;
      const responseData = {
        ...adminData.dataValues,
      };

      return responseData;
    } catch (error) {
      throw error;
    }
  }

  async updateAdmin(adminEntity) {
    try {
      const updatedAdmin = await AdminRepository.updateAdmin(adminEntity);

      if (!updatedAdmin) {
        throw new BadRequestException('Bad Request', 400);
      }

      const responseData = {
        updatedAdmin,
      };
      return responseData;
    } catch (error) {
      throw error;
    }
  }

  async getAllAdmins() {
    try {
      const admins = await AdminRepository.getAllAdmins();

      if (!admins) {
        throw new BadRequestException('Bad Request', 400);
      }

      const responseData = {
        admins,
      };
      return responseData;
    } catch (error) {
      throw error;
    }
  }

  async getAdmin(adminId) {
    try {
      const admin = await AdminRepository.getAdmin(adminId);

      if (!admin) {
        throw new NotFoundException('User not found', 404);
      }

      const responseData = {
        admin,
      };

      return responseData;
    } catch (error) {
      throw error;
    }
  }

  async softDeleteAdmin(adminId) {
    try {
      const deletedAdmin = await AdminRepository.softDeleteAdmin(adminId);

      if (!deletedAdmin) {
        throw new BadRequestException('Bad Request', 400);
      }

      const responseData = {
        deletedAdmin,
      };
      return responseData;
    } catch (error) {
      throw error;
    }
  }

  async hardDeleteAdmin(adminId) {
    try {
      const deletedAdmin = await AdminRepository.hardDeleteAdmin(adminId);

      if (!deletedAdmin) {
        throw new BadRequestException('Bad Request', 400);
      }

      const responseData = {
        deletedAdmin,
      };

      return responseData;
    } catch (error) {
      throw error;
    }
  }

  async restoreAdmin(adminId) {
    try {
      const restoredAdmin = await AdminRepository.restoreAdmin(adminId);

      if (!restoredAdmin) {
        throw new BadRequestException('Bad Request', 400);
      }

      const responseData = {
        restoredAdmin,
      };
      return responseData;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new AdminService();
