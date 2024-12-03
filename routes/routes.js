const express = require("express");
const {
    Register,
    Login,
    updateUser,
    deleteUser,
    getUsers,
} = require("../Controllers/userController");

const authMiddleware = require("../Middleware/authMiddleware");
const {
    createRecipe,
    getRecipes,
    updateRecipe,
    getRecipeByUserId,
    deleteRecipe,
} = require("../Controllers/recipeController");

const {
    createPublication,
    getPublications,
    updatePublication,
    getPublicationByUserId,
    deletePublication,
} = require("../Controllers/publicationController");
const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
router.put("/update/:id", authMiddleware, updateUser);
router.delete("/delete", authMiddleware, deleteUser);
router.get("/users", authMiddleware, getUsers);

router.post("/recipe", authMiddleware, createRecipe);
router.get("/recipes", authMiddleware, getRecipes);
router.put("/recipe/:recipeId", authMiddleware, updateRecipe);
router.get("/recipe/:userId", authMiddleware, getRecipeByUserId);
router.delete("/recipe/:recipeId", authMiddleware, deleteRecipe);

router.post("/publication", authMiddleware, createPublication);
router.get("/publications", authMiddleware, getPublications);
router.put("/publication/:recipeId", authMiddleware, updatePublication);
router.get("/publication/:userId", authMiddleware, getPublicationByUserId);
router.delete("/publication/:recipeId", authMiddleware, deletePublication);

module.exports = router;
