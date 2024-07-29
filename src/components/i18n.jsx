import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Consolidate all translations under a single translation object per language
const resources = {
    en: {
        translation: {
            welcomeMessage: "Welcome to the blog",
            addMessage: "Add Post",
            deleteMessage: "Delete Post",
            updateMessage: "Update Post",
            selectMessage: "Select User",
            commentMessage: "Comments",
            // Add more key-value pairs for each string you want to translate
        },
    },
    fr: {
        translation: {
            welcomeMessage: "Bienvenue dans notre blog",
            addMessage: "Ajouter un article",
            deleteMessage: "Supprimer l’article",
            updateMessage: "Mettre à jour l’article",
            selectMessage: "Sélectionner un utilisateur",
            commentMessage: "Commentaires",
            // Add more key-value pairs for each string you want to translate
        },
    },
};

i18n
    .use(initReactI18next)
    .init({
        resources, 
        lng: "en", // Initial language
        keySeparator: false, // We do not use keys in form messages.welcome
        interpolation: {
            escapeValue: false, // React already escapes from XSS
        },
    });

export default i18n;