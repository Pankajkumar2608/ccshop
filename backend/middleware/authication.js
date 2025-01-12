import jwt from 'jsonwebtoken';


export const loginAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: 'No authentication token provided' });
        }

        const token = authHeader.split('=')[0];
        
        let decodedData;

        if (token) {
            decodedData = jwt.verify(token, process.env.JWT_SECRET);
            req.userId = decodedData?.id;
        } else {
            decodedData = jwt.decode(token);
            req.userId = decodedData?.sub;
        }

        if (!req.userId) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        
        req.auth = {
            userId: req.userId,
        };
        
        next();
        
        return res.status(200).json({ message: 'Authentication successful' });
    } catch (error) {
        console.error('Authentication error:', error.message);
        res.status(401).json({ message: 'Authentication failed' });
    }
};

export const isAdmin = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No authentication token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
    
        if (user.role !== "ADMIN") {
          return res.status(403).json({ error: "Access denied. Admins only." });
        }
    
        req.userId = user.id;
        next();

    } catch (error) {
        return res.status(401).json({ message: 'something went wrong' });
        
    }
}
