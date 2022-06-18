const passwordValidator = require('password-validator');

const passwordSchema = new passwordValidator();

passwordSchema
    .is().min(8) // Longueur minimale 8
    .is().max(20) // Longueur maximale 20
    .has().lowercase() // Doit contenir au moins 1 minuscules
    .has().digits() // Doit avoir au moins 1 chiffres
    .has().not().spaces(); // Ne doit pas avoir d'espaces

module.exports = (req, res, next) => {
    if (passwordSchema.validate(req.body.password)) {
        next();
    } else {
        return res.status(401).json({
            message: `Votre mot de passe n'est pas assez sécurisé. Votre mot de passe doit faire au moins 8 caractères, 20 au maximum, contenir au moins 1 chiffre et ne doit pas faire d'espaces. `,
        });
    }
};