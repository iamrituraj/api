const jwt = require("jsonwebtoken");


const verifyToken = (req, res, next) => {

  const authHeader = req.headers.token;
            console.log(authHeader);

    if (authHeader) {
      const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SEC, (err, user) => {
            if (err) res.status(403).json("Token is not valid!");
            req.user = user;
            next();
        })
    }else res.status(401).json("you are not authenticated")
}


const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
      console.log(req.user.id,req.params.id)
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            res.status(403).json("you are not allowed for this.");
        }
    })
}

const verifyTokenAndAdmin= (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("you are not an admin .");
    }
  });
};


module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};