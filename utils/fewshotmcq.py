FEW_SHOT_MCQ_PROMPT ="""

You are an MCQ generator. For each concept or topic, create  clear multiple-choice question with four options (A–D), mark the correct answer, and provide a brief explanation.

---

Q: Topic: Transportation Problem (Operational Research)

A:
Question: In the transportation problem, which of the following is true if the total supply equals total demand?

A. The problem is unbalanced  
B. A dummy source must be added  
C. A feasible solution exists without modification  
D. The problem cannot be solved  

Answer: C  
Explanation: If total supply equals total demand, the problem is balanced and a feasible solution exists without needing dummy rows or columns.

---

Q: Topic: Bias-Variance Tradeoff (Machine Learning)

A:
Question: Which statement best describes the bias-variance tradeoff?

A. High bias always leads to overfitting  
B. Low variance leads to better generalization  
C. Increasing model complexity decreases both bias and variance  
D. High variance models may overfit training data  

Answer: D  
Explanation: High variance indicates the model is sensitive to training data and may overfit, failing to generalize.

---

Q: Topic: DNA Structure (Biology)

A:
Question: Which base pair combination is correct in DNA?

A. Adenine–Guanine  
B. Cytosine–Adenine  
C. Adenine–Thymine  
D. Guanine–Thymine  

Answer: C  
Explanation: In DNA, adenine pairs with thymine and cytosine pairs with guanine via hydrogen bonds.

---

Q: Topic: Neural Networks (Deep Learning)

A:
Question: What is the purpose of the activation function in a neural network?

A. To initialize weights  
B. To normalize input data  
C. To introduce non-linearity  
D. To compute the loss  

Answer: C  
Explanation: Activation functions allow neural networks to model complex, non-linear relationships.

---

Q: Topic: Ideal Gas Law (Physics)

A:
Question: Which equation correctly represents the ideal gas law?

A. P = VRT  
B. PV = nRT  
C. PV = mRT  
D. P + V = nT  

Answer: B  
Explanation: The ideal gas law is PV = nRT, where P = pressure, V = volume, n = moles, R = gas constant, T = temperature.

---


Q: Topic: LPP
A:

Question: Which of the following is a characteristic of a Linear Programming Problem (LPP)?

A. Non-linear objective function
B. Multiple non-linear constraints
C. Linearity in both objective and constraints
D. Random variable inputs

Answer: C
Explanation: LPP requires both the objective function and all constraints to be linear in nature.

Question: What does the feasible region in an LPP represent?

A. The worst-case solutions
B. All non-feasible answers
C. Set of all solutions satisfying the constraints
D. Only the maximum value of the objective function

Answer: C
Explanation: The feasible region includes all points that satisfy every constraint of the LPP.

Q: Topic: Inventory Models
A:

Question:In the Economic Order Quantity (EOQ) model, the total cost is minimized when:

A. Ordering cost is higher than holding cost
B. Holding cost equals ordering cost
C. Ordering frequency is minimized
D. Safety stock is maximized

Answer: B
Explanation: EOQ minimizes total cost when the annual ordering cost equals annual holding cost.

Question: Which of the following is not a basic inventory model?

A. Continuous review model
B. Periodic review model
C. Single-period model
D. Queuing theory model

Answer: D
Explanation: Queuing theory deals with waiting lines, not inventory. The others are standard inventory models.

Q: Topic: Supply Chain Management
A:

Q: The main goal of supply chain management is:

A. Maximizing production only
B. Minimizing supplier count
C. Optimizing the flow of goods and services
D. Reducing employee costs

Answer: C
Explanation: SCM focuses on efficient and cost-effective movement of goods, data, and finances from supplier to customer.

---

Q: Topic: {question}
A:



"""