const { User } = require('../../../models');

module.exports = {
  //-------------------------------------------Admin---------------------------
  dataAdmin: (req, res) => {
    User.findAll({where: { id_role: 1 }})
      .then((admins) => res.json(admins))
      .catch((err) => res.json(err));
  },

  dataAdminById: (req, res) => {
    User.dataAdminById(req.params.id)
      .then((admin) => res.json(admin))
      .catch((err) => res.json(err));
  },

  tambahAdmin: (req, res) => {
    User.tambahAdmin(req.body)
      .then((admin) => res.json({ message: `Admin dengan nama ${admin.nama} berhasil ditambahkan` }))
      .catch((err) => res.json(err));
  },

  deleteAdmin: (req, res) => {
    User.destroy({ where: { id: req.params.id } })
      .then(() => res.json({ msg: `Admin dengan id ${req.params.id} berhasil dihapus` }))
      .catch((err) => res.json(err));
  },

  updateAdmin: (req, res) => {
    User.updateAdmin(req.body, req.params.id)
      .then(() => res.json({ msg: 'Update Admin berhasil' }))
      .catch((err) => res.json(err));
  },

  //--------------------------------Customer-----------------------------
  dataCustomer: (req, res) => {
    User.findAll({where: { id_role: 2 }})
      .then((users) => res.json(users))
      .catch((err) => res.json(err));
  },

  dataCustomerById: (req, res) => {
    User.dataCustomerById(req.params.id)
      .then((user) => res.json(user))
      .catch((err) => res.json(err));
  },

  register: (req, res) => {
    User.register(req.body)
      .then((user) => res.json({ message: `User dengan nama ${user.nama} berhasil ditambahkan` }))
      .catch((err) => res.json(err));
  },

  deleteCustomer: (req, res) => {
    User.destroy({ where: { id: req.params.id } })
      .then(() => res.json({ msg: `User dengan id ${req.params.id} berhasil dihapus` }))
      .catch((err) => res.json(err));
  },

  updateCustomer: (req, res) => {
    User.updateCustomer(req.body, req.params.id)
      .then(() => res.json({ msg: 'Update user berhasil' }))
      .catch((err) => res.json(err));
  },  

};
