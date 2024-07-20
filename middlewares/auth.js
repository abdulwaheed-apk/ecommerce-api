import { verify } from 'jsonwebtoken'

const verifyToken = async (req, res, next) => {
    try {
        let token = req.header('Authorization')
        if (!token) {
            return res.status(401).send('Unauthorized, you are not allowed.')
        }
        if (token.startsWith('Bearer')) {
            token = token.slice(7, token.length).trimLeft()
        }
        const verified = verify(token, process.env.JWT_SECRET)
        req.user = verified
        next()
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export default verifyToken
