const { promisePool } = require("../db/db.js");
const jwt = require("jsonwebtoken");




const normalizeSalary = (salaryString) => {

    if (!salaryString) return "Non précisé";

    const nums = salaryString.match(/\d+/g);

    if (nums && nums.length >= 1) {
        let value = parseInt(nums[0]);

        if (nums.length >= 2) {
            value = (parseInt(nums[0]) + parseInt(nums[1])) / 2;
        }

        if (value < 40) return "Moins de 40k";
        else if (value < 50) return "40k - 50k";
        else if (value < 60) return "50k - 60k";
        else if (value < 70) return "60k - 70k";
        else return "Plus de 70k";
    }
    else {
        return "Non précisé";
    }
};




const getDataFeature = async (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: "No token" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;


        const [rows] = await promisePool.query(
            "SELECT salary, status FROM applied_offers WHERE user_id = ?",
            [userId]
        );


        // Score de match
        let accepted = 0;
        let rejected = 0;

        rows.forEach(row => {
            if (row.status === "accepté") accepted++;
            else if (row.status === "refusé") rejected++;
        });

        const totalResponses = accepted + rejected;
        
        let matchScore = 0;
        if (totalResponses > 0) {
            matchScore = Math.round((accepted / totalResponses) * 100);
        } else {
            matchScore = 0;
        }
        
        // Distribution des salaires
        const salaryDistribution = {
            "Moins de 40k": 0,
            "40k - 50k": 0,
            "50k - 60k": 0,
            "60k - 70k": 0,
            "Plus de 70k": 0,
            "Non précisé": 0
        };

        rows.forEach(row => {
            const range = normalizeSalary(row.salary);
            salaryDistribution[range]++;
        });

        res.json({
            matchScore: matchScore,
            accepted: accepted,
            salaryDistribution: salaryDistribution
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Erreur lors du calcul des données" });
    }
};

module.exports = {
    getDataFeature,
    normalizeSalary
};
