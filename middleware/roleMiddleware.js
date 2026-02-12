const authorizeRole = (...roles) => {
    return (req, res, next) => {
        if(!req.user){
            return( res.status(401).json({ message : 'not athonticated'}));
        }

        if(!roles.include(req.user.role)){
            res.status(403).json({ message : 'not Authorizd user'})
        }
        next();
    };
};

export default authorizeRole