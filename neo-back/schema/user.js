const Mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new Mongoose.Schema({
  id: { type: Object },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
});

UserSchema.pre("save", function (next) {
  if (this.isModified("password") || this.isNew) {
    const document = this;

    bcrypt.hash(document.password, 10, (err,hash)=>{
      if (err) {
        next(err)
      } else {
        document.password = hash;
        next()
      }
    })
  } else {
    next();
  }
});

// para saber si ya existe el usuario
UserSchema.methods.usernameExist = async function (username) {
  const result = await Mongoose.model("User").findOne({ username });
  return result !== null;
}

// para saber si la contraseña es correcta
UserSchema.methods.comparePassword = async function (password,hash) {
  const same = await bcrypt.compare(password, hash);
  return same
}

module.exports = Mongoose.model("User", UserSchema);
