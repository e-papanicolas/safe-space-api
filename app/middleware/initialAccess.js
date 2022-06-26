/**
 * @function
 * This is the list of valid initial access codes.
 * When SPI wants to let a user join, they must issue an access code to the user.
 * On the register user form, there is an input for access code.
 * This middleware function checks to make sure the access code is valid.
 * If valid it allows the request to proceed to the controller for creation.
 * If the code is invalid it will return an error response.
 */

const validCodes = {
  12345: true,
  12346: true,
  12347: true,
  12348: true,
  12349: true,
  12350: true,
  12351: true,
  12352: true,
  12353: true,
};

const initialAccess = (req, res, next) => {
  const accessCode = req.body.accessCode;
  console.log(accessCode);
  if (!accessCode) {
    return res.status(400).json({ message: "Missing access code" });
  } else if (!(accessCode in validCodes)) {
    return res.status(400).json({ message: "Invalid access code" });
  } else if (accessCode in validCodes) {
    delete validCodes[accessCode];
    next();
  }
};

export default initialAccess;
