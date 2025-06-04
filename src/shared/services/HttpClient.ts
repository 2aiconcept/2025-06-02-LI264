// src/shared/services/HttpClient.ts
import axios from "axios";
// https://axios-http.com/fr/docs/instance (lien vers la doc)

// Récupération de l'URL de l'API depuis les variables d'environnement Vite
const VITE_API_URL = import.meta.env.VITE_API_URL;

if (!VITE_API_URL) {
  console.error("La variable d'environnement VITE_API_URL n'est pas définie.");
}

export const httpClient = axios.create({
  baseURL: VITE_API_URL || "http://localhost:3000", // Utilise la variable d'env, avec un fallback au cas où.
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// httpClient est maintenant une "instance d'Axios"
// Elle possède toutes les méthodes d'Axios (get, post, put, delete, etc.)
// mais avec la baseURL et les headers pré-configurés.

// Vous pouvez ajouter ici des intercepteurs pour gérer globalement
// les requêtes ou les réponses si nécessaire (par exemple, pour l'authentification, logging, etc.)
// httpClient.interceptors.request.use(...)
// httpClient.interceptors.response.use(...)

export default httpClient; // Exporter par défaut peut aussi être une convention
