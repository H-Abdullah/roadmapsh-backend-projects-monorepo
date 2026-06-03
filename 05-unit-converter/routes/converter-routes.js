import { Router } from "express";
import convertUnit from "../services/unit-converter.js";

const router = Router();

router.post('/submit', (req, res) => {
    const unitCategory = req.body.unitCategory;
    const currentValue = req.body.currentValue;
    const currentUnit = req.body.currentUnit;
    const targetUnit = req.body.targetUnit;

    const result = convertUnit(unitCategory, currentValue, currentUnit, targetUnit);

    res.json({ result: result});
})

export default router;