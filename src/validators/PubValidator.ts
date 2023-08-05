import { checkSchema } from "express-validator";

export default {
    pubValidation: checkSchema({
        title: {
            optional: false,
            errorMessage: 'Titulo tem que ter no minimo 4 caractere e no máximo 50',
            trim: true,
            isLength: {
                options: { min: 4, max: 50 }
            },
            isString: true
        },
        state: {
            optional: false,
            errorMessage: 'Estado inválido!'
        },
        city: {
            optional: false,
            errorMessage: 'Cidade inválida!'

        }


    })
}