import jwt from 'jsonwebtoken';


const verifyToken = (req, res, next) => {
   
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Token is missing' });
    }


    jwt.verify(token, 'your_secret_key', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token is invalid' });
        }
        
        req.user = decoded;
        next();
    });
};

module.exports = verifyToken;