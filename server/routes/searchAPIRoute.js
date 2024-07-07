import express from "express";
import { countries, languages } from "../utils/constant.js";

const router = express.Router();

const searchFunction = async (req, res, arrayOfData, abbrevation) => {
    try {
        const { q } = req.query
        let regexPattern = q

        if(abbrevation) 
            regexPattern = q.replace(/(\w(?=\w))/g, '$1\\w*\\s*'); // Converts 'US' to 'U\s*S'

        const regex = new RegExp(regexPattern, 'i')

        const filteredSet = new Set();
        arrayOfData.forEach(item => {
            if (regex.test(item)) {
                filteredSet.add(item);
            }
        });

        const results = Array.from(filteredSet);

        return res.status(200).json({
            totalItems: filteredSet.size,
            data: results
        });
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
}

router.get('/countries', async (req, res) => {
    await searchFunction(req, res, countries, true)
})

router.get('/languages', async (req, res) => {
    await searchFunction(req, res, languages, false)
})

export default router
