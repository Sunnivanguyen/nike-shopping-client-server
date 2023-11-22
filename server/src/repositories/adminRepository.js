const AdminEntity = require('../entities/adminEntity');

class AdminRepository {
  async createAdmin(adminEntity) {
    const newAdmin = await AdminEntity.create(adminEntity);
    return newAdmin;
  }

  async updateAdmin(adminEntity) {
    const updatedAdmin = await AdminEntity.update(adminEntity, {
      where: { id: +adminEntity.id },
    });

    return updatedAdmin;
  }

  async getAllAdmins() {
    const admins = await AdminEntity.findAll();
    let others;
    if (admins.length > 0) {
      others = admins.map((admin) => {
        const { password, ...others } = admin.dataValues;
        return others;
      });
    }
    return others;
  }

  async getAdmin(adminId) {
    const currentAdmin = await AdminEntity.findByPk(+adminId);

    const { password, ...others } = currentAdmin.dataValues;
    return others;
  }

  async softDeleteAdmin(adminId) {
    const deletedAdmin = await AdminEntity.destroy({ where: { id: +adminId } });
    return deletedAdmin;
  }

  async hardDeleteAdmin(adminId) {
    const deletedAdmin = await AdminEntity.destroy({
      where: { id: +adminId },
      force: true,
    });
    return deletedAdmin;
  }

  async restoreAdmin(adminId) {
    const restoredAdmin = await AdminEntity.restore({
      where: { id: +adminId },
    });
    return restoredAdmin;
  }
}
module.exports = new AdminRepository();
