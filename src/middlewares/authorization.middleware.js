import { getServerSession } from "next-auth";


const sessionValidationMiddleware = async (req, res, next) => {
    const session = await getServerSession();

    try {
        if (session?.user) {
            next();
        } else {
            res.redirect('/login');
        }
    } catch (error) {
        console.error('Error validating session:', error);
        res.redirect('/sign-in');
    }
};

export default sessionValidationMiddleware;