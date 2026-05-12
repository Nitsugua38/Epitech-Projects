const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const [rows]= await promisePool.query("SELECT * FROM users WHERE email = ?", [email]);
        const user = rows[0];
        if (!user) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }

        const storedHashedPassword = user.password;
        const isPasswordValid = await bcrypt.compare(password, storedHashedPassword);
        
        if (isPasswordValid) {
            const payload = {
                userId: user.id,
                username: user.prenom + "_" + user.nom,
            };
            const secretKey = process.env.JWT_SECRET;
            const token = jwt.sign(payload, secretKey, {
                expiresIn: '48h',  
            });
            console.log(token);
            res.status(200).json({ message: 'Login successful voici le token', token: token });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    }

    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
};


module.exports = {
    login
}