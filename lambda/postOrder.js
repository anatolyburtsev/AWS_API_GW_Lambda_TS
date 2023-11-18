exports.handler = async (event) => {
  const orderId = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;
  return {
    statusCode: 200,
    body: JSON.stringify({ 'order_id': orderId }),
  };
};
