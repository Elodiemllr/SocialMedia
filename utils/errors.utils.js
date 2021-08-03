module.exports.signUpErrors = (err) => {
    let errors = { pseudo: "", email: "", password: "" };

    if (err.message.includes("pseudo"))
        errors.pseudo = "Pseudo incorrect ou déjà utilisé";

    if (err.message.includes("email")) errors.email = "Email incorrect";

    if (err.message.includes("pseudo" && "email"))
        errors.pseudo = "Pseudo incorrect ou déjà utilisé";
    errors.email = "Cet email est déjà utilisé";

    if (err.message.includes("password"))
        errors.password = "Le mot de passe doit contenir 6 caractères minimum";

    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("pseudo"))
        errors.pseudo = "Ce pseudo existe déjà ";

    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email"))
        errors.email = "Cet email est déjà utilisé";

    return errors;
};

module.exports.signInErrors = (err) => {
    let errors = { email: "", password: "" };

    if (err.message.includes("email")) errors.email = "Email incorrect";

    if (err.message.includes("password"))
        errors.password = " mot de passe incorrect";

    return errors;
};

module.exports.uploadErrors = (err) => {
    let errors = { format: "", maxSize: "" };

    if (err.message.includes("invalid file"))
        errors.format = "format incorrect ";

    if (err.message.includes("max size"))
        errors.maxSize = "le fichier doit être inférieur à 500ko ";

    return errors;
};
