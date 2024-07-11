import express from "express"
import Film from "../models/filmModel.js"
import { auth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/', auth, async (req, res) => {
  try {
    const { title, type, image } = req.body;

    if (!title || !type || !image) {
      return res.status(400).send({ message: 'Title, type, and image are required fields' });
    }

    let payload = {
      title: req.body.title,
      type: req.body.type,
      image: req.body.image,
      country: req.body.country,
      language: req.body.language,
    }

    const film = await Film.create(payload);

    return res.status(201).send(film);

  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message })
  }
})

router.get('/', async (req, res) => {
  try {
    const film = await Film.find({});

    return res.status(200).json({
      data: film
    });

  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message })
  }
})

router.get('/:id', async (req, res) => {
  try {

    const { id } = req.params;

    const film = await Film.findById(id)

    return res.status(200).json(film);

  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message })
  }
})

router.delete('/:id', auth, async (req, res) => {
  try {

    const { id } = req.params;

    const result = await Film.findByIdAndDelete(id)

    if (!result) {
      return res.status(404).json({ message: 'Film not found' });
    }

    res.status(200).json({ message: 'Film successfully deleted', deletedItem: result });

  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message })
  }
})

router.put('/:id', auth, async (req, res) => {
  try {
    const { title, type, image } = req.body;

    if (!title || !type || !image) {
      return res.status(400).send({
        message: 'Required fields are missing'
      });
    }

    const { id } = req.params;

    const result = await Film.findByIdAndUpdate(id, req.body, { new: true });

    if (!result) {
      return res.status(404).json({ message: 'Film not found' });
    }

    return res.status(200).send({ message: 'Film updated' });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;