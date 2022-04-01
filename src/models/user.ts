import { Schema, model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

import { User } from '../utils/interfaces/user';

const ROLES_VALIDOS = {
    values : ['ADMIN_ROLE', 'USER_ROLE'],
    message : '{VALUE} no es un rol valido'
};

const userSchema = new Schema({

    name: {
        type:      String,
        trim:      true,
        minlength: [4, 'El nombre es demasiado corto'],
        maxlength: [70, 'El nombre es demasiado largo'],
        required:  [true, 'Debes ingresar tu nombre completo']
    },

    email: {
        type :      String,
        trim :      true,
        lowercase : true,
        unique :    true,
        validate: {
            validator: (email: string) => {
                return /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test( email )
            },
            message: 'El correo ingresado es invalido'
        },
        required : [true, 'Debes ingresar tu correo']
    },

    role: {
        type :    String,
        enum :    ROLES_VALIDOS,
        default : 'USER_ROLE',
    }

}, { timestamps: true } );

userSchema.plugin( uniqueValidator, { message: 'Debes elegir otro correo' } );

export default model<User>('user', userSchema);