import { checkSchema } from "express-validator";

export default {
    signup: checkSchema({
        name: {
            optional: false,
            isLength: {
                options: { min: 2 }
            },
            errorMessage: 'Nome inválido!',
        },
        email: {
            isEmail: true,
            trim: true,
            errorMessage: 'Email inválido!',
            optional: false
        },
        password: {
            optional: false,
            isLength: {
                options: { min: 8, max: 50 }
            },
            errorMessage: 'Senha deve ter no mínimo 8 caracteres e no máximo 50!',
        },
        phone: {
            isLength: {
                options: {
                    min: 15, max: 15
                }
            },
            errorMessage: 'Numero inválido!',
            optional: false
        }
    }),

    login: checkSchema({
        email: {
            trim: true,
            errorMessage: 'Email ou username inválido!',
            optional: false
        },
        password: {
            isLength: {
                options: { min: 8, max: 50 }
            },
            errorMessage: 'Senha deve tem no mínimo 8 caracteres e no máximo 50!',
            optional: false
        }
    })
}