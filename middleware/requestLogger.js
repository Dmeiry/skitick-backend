const requestLogger = (req, res, next) => {
  const { ip, originalUrl, method } = req;
  console.log(
    `****************** REQUEST from ${ip} :: ${originalUrl} : ${method}  *************************`
  );
  next();
};
export default requestLogger;
