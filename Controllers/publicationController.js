const Publication = require("../Models/publicationModel");

const createPublication = async (req, res) => {
    const authorId = req.user.id;
    try {
        const publication = new Publication({
            ...req.body,
            author: authorId,
        });
        if (!publication) {
            return res.status(400).send("Merci de remplir tous les champs");
        }
        await publication.save();
        res.status(201).send(publication);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

const getPublications = async (req, res) => {
    try {
        const filter = {};
        if (req.query.title) {
            filter.title = { $regex: req.query.title, $options: "i" };
        }
        if (req.query.cuisineType) {
            filter.cuisineType = { $regex: req.query.cuisineType, $options: "i" };
        }
        if (req.query.ingredients) {
            filter.ingredients = { $regex: req.query.ingredients, $options: "i" };
        }

        const publications = await Publication.find(filter).populate(
            "author",
            "username email"
        );

        res.status(200).send(publications);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

const updatePublication = async (req, res) => {
    try {
        const publication = await Publication.findByIdAndUpdate(
            req.params.publicationId,
            req.body,
            {
                new: true,
            }
        );
        if (!publication) {
            return res.status(404).send({ error: "Recette introuvable" });
        }
        res.status(200).send(publication);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const getPublicationByUserId = async (req, res) => {
    try {
        const publication = await Publication.find({ author: req.params.userId }).populate(
            "author",
            "username email"
        );
        if (!publication) {
            return res.status(404).send({ error: "Recette introuvable" });
        }
        res.status(200).send(publication);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const deletePublication = async (req, res) => {
    try {
        const publication = await Publication.findByIdAndDelete(req.params.publicationId);
        if (!publication) {
            return res.status(404).send({ error: "Publication introuvable" });
        }
        res.status(200).send({ message: "Publication supprimée" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

module.exports = {
    createPublication,
    getPublications,
    updatePublication,
    getPublicationByUserId,
    deletePublication,
};
