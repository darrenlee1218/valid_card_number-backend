const db = require("../config/database");

exports.createCard = async (req, res) => {
  const { cardNumber } = req.body;
  let amount = 0;
  const lastNumber = cardNumber.split(/\s+/)[3];
  const cardNumbers = cardNumber.replace(/ /g, "");

  if ((lastNumber[3] === "5") | (lastNumber[3] === "2")) {
    for (let i = 0; i < cardNumbers.length - 1; i++) {
      amount += parseInt(cardNumbers[i]);
    }
  }

  try {
    const { rows } = await db.query(
      "INSERT INTO cards (card_number, amount) VALUES ($1, $2)",
      [lastNumber, amount]
    );

    res.status(201).send({
      message: "Card added successfully!",
      body: {
        card: { lastNumber, amount },
      },
    });
  } catch (e) {
    res.status(500).send({
      message: e.message,
    });
  }
};

exports.listAllCards = async (req, res) => {
  try {
    const response = await db.query("SELECT * FROM cards ORDER BY amount DESC");
    res.status(200).send(response.rows);
  } catch (e) {
    res.status(500).send({
      message: e.message,
    });
  }
};

exports.deleteCardById = async (req, res) => {
  const cardId = parseInt(req.params.id);
  try {
    await db.query("DELETE FROM cards WHERE card_id = $1", [cardId]);

    res.status(200).send({ message: "Card deleted successfully!", cardId });
  } catch (e) {
    res.status(500).send({
      message: e.message,
    });
  }
};
