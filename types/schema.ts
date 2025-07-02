import z from "zod";

export const userSchema = z.object({
    name: z.string().min(2, "Le nom doit contenir au moins 2 caractères."),
    email: z.string().email("Adresse email invalide."),
    // Pour le numéro de téléphone, z.string().regex peut être utilisé,
    // mais si MyPhoneInput gère déjà la validation, vous pouvez laisser z.string().min(1)
    tel: z.string().min(10, "Le numéro de téléphone est requis et doit être valide."),
    password: z.string()
        .min(8, "Le mot de passe doit contenir au moins 8 caractères.")
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/,
            "Le mot de passe doit inclure majuscule, minuscule, chiffre et caractère spécial."
        ),
});

export const userLoginSchema = z.object({
    email: z.string().email("Adresse email invalide."),
    password: z.string()
        .min(8, "Le mot de passe doit contenir au moins 8 caractères.")
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/,
            "Le mot de passe doit inclure majuscule, minuscule, chiffre et caractère spécial."
        ),
});

export const userOtpSchema = z.object({
    otp: z.number()
    .min(8, "le code doit contenir 8 chiffres")
    .max(8, "le code doit contenir 8 chiffres"),
});

export const companyShema = z.object({
    name: z.string().min(2, "Le nom doit contenir au moins 2 caractères."),
    url: z.string()
    .regex(/^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[a-zA-Z0-9-._~:/?#\[\]@!$&'()*+,;%=]*)?$/,
        "Ecrivez une url valide."
    ),
    terms: z.boolean()
})