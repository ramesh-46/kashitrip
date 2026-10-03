import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api";

function Members() {
  const [members, setMembers] = useState([]);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [memberResponse, expenseResponse] =
        await Promise.all([
          axios.get(`${API}/members`),
          axios.get(`${API}/expenses`),
        ]);

      setMembers(memberResponse.data.data);
      setExpenses(expenseResponse.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getPaid = (name) => {
    return expenses
      .filter(
        (expense) => expense.paidBy === name
      )
      .reduce(
        (sum, expense) =>
          sum + Number(expense.amount),
        0
      );
  };

  const total = expenses.reduce(
    (sum, expense) =>
      sum + Number(expense.amount),
    0
  );

  const share =
    members.length > 0
      ? total / members.length
      : 0;

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <p style={styles.small}>TRIP MEMBERS</p>

        <h1 style={styles.title}>Our Group</h1>

        <div style={styles.cards}>
          {members.map((member) => {
            const paid = getPaid(member.name);
            const balance = paid - share;

            return (
              <div
                key={member._id}
                style={styles.card}
              >
                <div style={styles.avatar}>
                  {member.name.charAt(0)}
                </div>

                <h2>{member.name}</h2>

                <p>Total Paid</p>

                <strong style={styles.amount}>
                  ₹
                  {paid.toLocaleString("en-IN")}
                </strong>

                <p>Equal Share</p>

                <strong>
                  ₹
                  {share.toLocaleString("en-IN", {
                    maximumFractionDigits: 2,
                  })}
                </strong>

                <div style={styles.status}>
                  {balance > 0
                    ? `Receive ₹${balance.toLocaleString(
                        "en-IN",
                        {
                          maximumFractionDigits: 2,
                        }
                      )}`
                    : balance < 0
                    ? `Pay ₹${Math.abs(
                        balance
                      ).toLocaleString(
                        "en-IN",
                        {
                          maximumFractionDigits: 2,
                        }
                      )}`
                    : "Balanced"}
                </div>
              </div>
            );
          })}
        </div>
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
    margin: "10px 0 40px",
  },

  cards: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(230px,1fr))",
    gap: "20px",
  },

  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "20px",
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,.05)",
  },

  avatar: {
    width: "65px",
    height: "65px",
    borderRadius: "50%",
    background: "#000",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 20px",
    fontSize: "24px",
    fontWeight: "700",
  },

  amount: {
    fontSize: "24px",
  },

  status: {
    marginTop: "20px",
    padding: "10px",
    background: "#f2f2f2",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "700",
  },
};

export default Members;