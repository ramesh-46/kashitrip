import React, {
  useEffect,
  useMemo,
  useState,
} from "react";
import axios from "axios";

const API = "https://kashitrip.onrender.com/api";

const members = [
  "Ramesh",
  "Srikanth",
  "Prathap",
  "Ganesh",
];

function Calculator() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        `${API}/expenses`
      );

      const data = Array.isArray(response.data.data)
        ? response.data.data
        : [];

      setExpenses(data);
    } catch (err) {
      console.error("Failed to load expenses:", err);
      setError(
        "Unable to load expenses. Please refresh and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Calculate total of all recorded expenses
  const total = useMemo(() => {
    return expenses.reduce(
      (sum, expense) =>
        sum + Number(expense.amount || 0),
      0
    );
  }, [expenses]);

  // Calculate how much each member actually paid
  const memberTotals = useMemo(() => {
    return members.map((member) => {
      const memberExpenses = expenses.filter(
        (expense) => expense.paidBy === member
      );

      const paid = memberExpenses.reduce(
        (sum, expense) =>
          sum + Number(expense.amount || 0),
        0
      );

      return {
        name: member,
        paid,
        count: memberExpenses.length,
      };
    });
  }, [expenses]);

  const formatMoney = (amount) =>
    `₹${amount.toLocaleString("en-IN", {
      maximumFractionDigits: 2,
    })}`;

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <p style={styles.small}>
          EXPENSE CALCULATOR
        </p>

        <h1 style={styles.title}>
          Expense Summary
        </h1>

        <p style={styles.subtitle}>
          View actual expenses paid by each member.
          No equal splitting or settlement calculations.
        </p>

        {/* Summary */}
        <div style={styles.summary}>
          <div style={styles.summaryCard}>
            <span>Total Expenses</span>
            <strong>{formatMoney(total)}</strong>
          </div>

          <div style={styles.summaryCard}>
            <span>Total Records</span>
            <strong>{expenses.length}</strong>
          </div>

          <div style={styles.summaryCard}>
            <span>Members</span>
            <strong>{members.length}</strong>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div style={styles.message}>
            Loading expenses...
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div style={styles.error}>
            {error}

            <button
              onClick={loadExpenses}
              style={styles.retryButton}
            >
              Retry
            </button>
          </div>
        )}

        {/* Member totals */}
        {!loading &&
          !error &&
          memberTotals.map((member) => (
            <div
              key={member.name}
              style={styles.card}
            >
              <div style={styles.memberInfo}>
                <div style={styles.avatar}>
                  {member.name.charAt(0)}
                </div>

                <div>
                  <h2 style={styles.memberName}>
                    {member.name}
                  </h2>

                  <p style={styles.meta}>
                    {member.count}{" "}
                    {member.count === 1
                      ? "expense"
                      : "expenses"}
                  </p>
                </div>
              </div>

              <div style={styles.amountBox}>
                <span style={styles.amountLabel}>
                  Total Paid
                </span>

                <strong style={styles.amount}>
                  {formatMoney(member.paid)}
                </strong>
              </div>
            </div>
          ))}

        {/* Expense details */}
        {!loading &&
          !error && (
            <div style={styles.details}>
              <h2 style={styles.sectionTitle}>
                All Expense Records
              </h2>

              {expenses.length === 0 ? (
                <p style={styles.empty}>
                  No expenses have been recorded yet.
                </p>
              ) : (
                expenses.map((expense) => (
                  <div
                    key={expense._id}
                    style={styles.expenseRow}
                  >
                    <div style={styles.expenseInfo}>
                      <strong>
                        {expense.description}
                      </strong>

                      <span style={styles.meta}>
                        {expense.paidBy} ·{" "}
                        {expense.category} ·{" "}
                        {expense.paymentType}
                      </span>

                      <span style={styles.date}>
                        {expense.date
                          ? new Date(
                              expense.date
                            ).toLocaleDateString("en-IN")
                          : ""}
                      </span>
                    </div>

                    <strong style={styles.expenseAmount}>
                      {formatMoney(
                        Number(expense.amount || 0)
                      )}
                    </strong>
                  </div>
                ))
              )}
            </div>
          )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f7f7f7",
    padding: "50px 20px",
    boxSizing: "border-box",
  },

  container: {
    maxWidth: "1100px",
    margin: "auto",
  },

  small: {
    fontSize: "12px",
    letterSpacing: "3px",
    fontWeight: "700",
    color: "#666",
  },

  title: {
    fontSize: "clamp(36px, 6vw, 64px)",
    margin: "10px 0",
    color: "#111",
  },

  subtitle: {
    color: "#666",
    lineHeight: 1.6,
    marginBottom: "30px",
  },

  summary: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "15px",
    marginBottom: "30px",
  },

  summaryCard: {
    background: "#111",
    color: "#fff",
    padding: "24px",
    borderRadius: "18px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    overflowWrap: "anywhere",
  },

  card: {
    background: "#fff",
    borderRadius: "16px",
    padding: "22px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "15px",
    marginBottom: "14px",
    boxShadow: "0 3px 12px rgba(0,0,0,0.04)",
  },

  memberInfo: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    minWidth: 0,
  },

  avatar: {
    width: "46px",
    height: "46px",
    minWidth: "46px",
    borderRadius: "50%",
    background: "#eee",
    color: "#111",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    fontWeight: "700",
  },

  memberName: {
    margin: "0 0 6px",
    fontSize: "19px",
    color: "#111",
  },

  meta: {
    display: "block",
    color: "#777",
    fontSize: "13px",
    margin: "5px 0",
  },

  amountBox: {
    textAlign: "right",
    overflowWrap: "anywhere",
  },

  amountLabel: {
    display: "block",
    color: "#777",
    fontSize: "12px",
    marginBottom: "6px",
  },

  amount: {
    fontSize: "clamp(17px, 3vw, 23px)",
    color: "#111",
  },

  details: {
    background: "#fff",
    borderRadius: "18px",
    padding: "24px",
    marginTop: "30px",
  },

  sectionTitle: {
    fontSize: "22px",
    marginTop: 0,
    marginBottom: "20px",
  },

  expenseRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "15px",
    padding: "16px 0",
    borderBottom: "1px solid #eee",
  },

  expenseInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    minWidth: 0,
    overflowWrap: "anywhere",
  },

  date: {
    color: "#888",
    fontSize: "12px",
  },

  expenseAmount: {
    whiteSpace: "nowrap",
    color: "#111",
  },

  message: {
    background: "#fff",
    padding: "25px",
    borderRadius: "15px",
    textAlign: "center",
  },

  error: {
    background: "#fff0f0",
    color: "#a00000",
    padding: "20px",
    borderRadius: "15px",
    marginBottom: "20px",
  },

  retryButton: {
    display: "block",
    marginTop: "12px",
    padding: "10px 18px",
    border: "1px solid #ccc",
    borderRadius: "20px",
    background: "#fff",
    cursor: "pointer",
  },

  empty: {
    color: "#777",
    textAlign: "center",
    padding: "25px 0",
  },
};

export default Calculator;
