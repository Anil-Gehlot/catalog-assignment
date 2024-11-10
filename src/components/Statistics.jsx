import React from "react";

const Statistics = () => {
  return (
    <div className="summary-container">
      <h2>Numbers, Data, Facts:</h2>
      <p>
        The Bitcoin network records between 500,000 to 750,000 transactions
        daily.{" "}
      </p>

      <h3>Volume</h3>
      <p>
        On average, 800,000 Bitcoins are sent daily, corresponding to a
        transaction volume of over $50 billion.{" "}
      </p>

      <h3>Gebühren</h3>
      <p>
        The current average fee for sending Bitcoin is between 50 cents and 2
        dollars. The transaction fee is independent of the value of Bitcoin
        sent. For comparison: According to the World Bank, fees for global
        transfers average over 6.35 percent of the transferred amount.{" "}
      </p>

      <h3>ETFs</h3>
      <p>
        More than 950,000 Bitcoins, worth over $63 billion, have been
        accumulated since the launch of the first Bitcoin ETFs (exchange-traded
        funds) in the USA by asset managers like Blackrock, Fidelity, and
        others. The trend continues to rise.{" "}
      </p>

      <h3>Lightning</h3>
      <p>
        With the Lightning Network, Bitcoin has its own payment solution that
        allows transactions to be sent worldwide quickly and cost-effectively.
        The transaction capacity of Lightning is estimated at about one million
        transactions per second, compared to VISA with about 40,000 transactions
        per second.{" "}
      </p>
    </div>
  );
};

export default Statistics;
