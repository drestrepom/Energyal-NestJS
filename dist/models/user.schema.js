"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const ciudades = {
    values: ['Medellín', 'Cali', 'Bogota', 'Yarumal', 'Santa Rosa', 'La Ceja', 'Río Negro'],
    message: '{VALUE} aun no esta en nuestro sistema',
};
const roles = {
    values: ['ADMIN', 'USER'],
    message: '{VALUE} no es un rol valido',
};
exports.UserSchema = new mongoose_1.Schema({
    name: { type: String, required: [true, 'El nombre es requerido'] },
    email: { unique: true, type: String, required: [true, 'El correo es necesario'] },
    password: { type: String, required: true },
    city: { type: String, default: 'Medellín', enum: ciudades, required: false },
    electrodomestics: {
        type: [{
                electrodomestic: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Electrodomestic' },
                role: { type: String, enum: roles, default: 'ADMIN' },
            }],
        required: false,
    },
    status: { type: Boolean, default: true },
});
exports.UserSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    delete userObject.contrasena;
    return userObject;
};
exports.UserSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser unico' });
//# sourceMappingURL=user.schema.js.map