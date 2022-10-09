// Load variabel .env ketika development
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config(); // eslint-disable-line global-require
}

// import jwt untuk membuat tken
const jwt = require('jsonwebtoken');
// import model
const bcrypt = require('bcrypt');
const { User } = require('../../../models');

// fungsi untuk membuat token jwt
const generateToken = (id, email) => {
  // tentukan isi / payload dari jwt
  const payload = {
    id,
    email,
  };

  // kunci yang digunakan untuk membuat jwt
  const secret = process.env.SECRET_KEY_TO_MAKE_JWT;

  // buat token jwt menggunakan payload & kunci rahasia yang telah ditentukan
  return jwt.sign(payload, secret, { expiresIn: '3h' });
};

module.exports = {
  login: (req, res) => {
    const { email, password } = req.body;

    User.findOne({
      where: { email },
    }).then(async (admin) => { // eslint-disable-line consistent-return
      const match = await bcrypt.compare(password, admin.password);
      /*
      jika Admin berhasil ditemukan, pastikan password
      dari request body sesuai dengan password Admin di tabel
      */
      if (match) {
        // jalankan fungsi untuk membuat token, kemudian simpan hasil ke dalam accessToken
        const accessToken = generateToken(admin.id, admin.email);

        return res
          .cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
          })
          .status(200)
          .json({ message: 'Log in Berhasil' });
      }
      if (!match) {
        return res.json({ message: 'Email atau Password Salah' });
      }
    }).catch((err) => res.json({ message: 'Email atau Password Salah' })); // eslint-disable-line no-unused-vars
  },

  whoami: (req, res) => res.json({
    nama: req.user.nama,
    email: req.user.email,
  }),

  logout: (req, res) => res
    .clearCookie('accessToken')
    .status(200)
    .json({ message: 'Berhasil logout' }),

};
