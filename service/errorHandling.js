const errorHandling = (err, req, res) => {
  console.log(err);
  res.status(500).json({ err: "unable to get stories" });
};

export default errorHandling;
