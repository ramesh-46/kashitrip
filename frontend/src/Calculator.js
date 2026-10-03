import React, {
  useEffect,
  useMemo,
  useState,
} from "react";
import axios from "axios";

const API = "http://localhost:5000/api";

const members = [
  "Ramesh",
  "Srikanth",
  "Prathap",
  "Ganesh",
];

function Calculator() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = async () => {
    try {
      const response = await axios.get(
        `${API}/expenses`
      );

      setExpenses(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const total = useMemo(() => {
    return expenses.reduce(
      (sum, expense) =>
        sum + Number(expense.amount),
      0
    );
  }, [expenses]);

  const share =
    members.length > 0
      ? total / members.length
      : 0;

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <p style={styles.small}>
          EXPENSE CALCULATOR
        </p>

        <h1 style={styles.title}>
          Settlement
        </h1>

        <div style={styles.summary}>
          <div style={styles.summaryCard}>
            <span>Total Expense</span>
            <strong>
              ₹{total.toLocaleString("en-IN")}
            </strong>
          </div>

          <div style={styles.summaryCard}>
            <span>Members</span>
            <strong>{members.length}</strong>
          </div>

          <div style={styles.summaryCard}>
            <span>Equal Share</span>
            <strong>
              ₹
              {share.toLocaleString("en-IN", {
                maximumFractionDigits: 2,
              })}
            </strong>
          </div>
        </div>

        {members.map((member) => {
          const paid = expenses
            .filter(
              (expense) =>
                expense.paidBy === member
            )
            .reduce(
              (sum, expense) =>
                sum + Number(expense.amount),
              0
            );

          const balance = paid - share;

          return (
            <div
              key={member}
              style={styles.card}
            >
              <div>
                <h2>{member}</h2>

                <p>
                  Paid: ₹
                  {paid.toLocaleString("en-IN")}
                </p>

                <p>
                  Share: ₹
                  {share.toLocaleString("en-IN", {
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>

              <div style={styles.balance}>
                {balance > 0 ? (
                  <>
                    <span>Should Receive</span>
                    <strong>
                      ₹
                      {balance.toLocaleString(
                        "en-IN",
                        {
                          maximumFractionDigits: 2,
                        }
                      )}
                    </strong>
                  </>
                ) : balance < 0 ? (
                  <>
                    <span>Should Pay</span>
                    <strong>
                      ₹
                      {Math.abs(
                        balance
                      ).toLocaleString("en-IN", {
                        maximumFractionDigits: 2,
                      })}
                    </strong>
                  </>
                ) : (
                  <>
                    <span>Balanced</span>
                    <strong>₹0</strong>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f7f7f7",
    padding: "60px 20px",
  },

  container: {
    maxWidth: "1100px",
    margin: "auto",
  },

  small: {
    fontSize: "12px",
    letterSpacing: "3px",
    fontWeight: "700",
  },

  title: {
    fontSize: "clamp(40px,6vw,70px)",
    margin: "10px 0 35px",
  },

  summary: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(200px,1fr))",
    gap: "15px",
    marginBottom: "30px",
  },

  summaryCard: {
    background: "#000",
    color: "#fff",
    padding: "25px",
    borderRadius: "18px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  card: {
    background: "#fff",
    borderRadius: "18px",
    padding: "25px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    marginBottom: "15px",
  },

  balance: {
    textAlign: "right",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
};

export default Calculator;