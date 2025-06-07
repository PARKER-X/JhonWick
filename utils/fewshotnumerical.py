FEW_SHOT_NUMERICAL_PROMPT = """\

Q: Maximize  
Z = 3x1 + 5x2 + 4x3  
subject to:  
2x1 + 3x2           ≤ 8  
      2x2 + 5x3     ≤ 10  
3x1 + 2x2 + 4x3 ≤ 15  
and x1, x2, x3 ≥ 0  

A:  

Step 1: Convert constraints to equalities by adding slack variables S1, S2, S3:

2x1 + 3x2       + S1       = 8  
      2x2 + 5x3 +      S2  = 10  
3x1 + 2x2 + 4x3         + S3 = 15  

Initial basic variables: S1, S2, S3  

---

**Initial Tableau (Iteration 0):**

| Basis | CB | x1 | x2 | x3 | S1 | S2 | S3 | RHS  |  
|-------|----|----|----|----|----|----|----|------|  
| S1    | 0  | 2  | 3  | 0  | 1  | 0  | 0  | 8    |  
| S2    | 0  | 0  | 2  | 5  | 0  | 1  | 0  | 10   |  
| S3    | 0  | 3  | 2  | 4  | 0  | 0  | 1  | 15   |  
| Z     |    | -3 | -5 | -4 | 0  | 0  | 0  | 0    |  

---

**Step 2: Find entering variable**  
Most negative Cj - Zj = -5 at x2 → x2 enters basis.

**Step 3: Minimum ratio test (RHS / pivot column x2):**  
- Row S1: 8 / 3 = 2.67  
- Row S2: 10 / 2 = 5  
- Row S3: 15 / 2 = 7.5  

Smallest positive ratio is 2.67 → S1 leaves basis.

Pivot element = 3 (row S1, column x2)

---

**Iteration 1: Perform pivot (make pivot element = 1 and zero out other x2 entries)**

- New Row S1 = old S1 / 3  
- Update other rows accordingly.

| Basis | CB | x1 | x2 | x3 | S1 | S2 | S3 | RHS |  
|-------|----|----|----|----|----|----|----|-----|  
| x2    | 5  | 2/3| 1  | 0  |1/3 | 0  | 0  | 8/3 |  
| S2    | 0  | 0  | 2  | 5  | 0  | 1  | 0  | 10  |  
| S3    | 0  | 3  | 2  | 4  | 0  | 0  | 1  | 15  |  
| Z     |    | -3 | -5 | -4 | 0  | 0  | 0  | 0   |  

Update S2 and S3 rows by eliminating x2 term:  
- S2 = S2 - 2 * new S1  
- S3 = S3 - 2 * new S1  

Calculations:  
S2 new RHS = 10 - 2*(8/3) = 10 - 16/3 = 14/3 ≈ 4.67  
S2 new x1 = 0 - 2*(2/3) = -4/3  
S2 new x2 = 2 - 2*1 = 0  
S2 new x3 = 5 - 2*0 = 5  
S2 new S1 = 0 - 2*(1/3) = -2/3  

S3 new RHS = 15 - 2*(8/3) = 15 - 16/3 = 29/3 ≈ 9.67  
S3 new x1 = 3 - 2*(2/3) = 3 - 4/3 = 5/3  
S3 new x2 = 2 - 2*1 = 0  
S3 new x3 = 4 - 2*0 = 4  
S3 new S1 = 0 - 2*(1/3) = -2/3  

---

**Updated Tableau after Iteration 1:**

| Basis | CB | x1   | x2 | x3 | S1    | S2 | S3 | RHS      |  
|-------|----|------|----|----|-------|----|----|----------|  
| x2    | 5  | 2/3  | 1  | 0  | 1/3   | 0  | 0  | 8/3 ≈ 2.67 |  
| S2    | 0  | -4/3 | 0  | 5  | -2/3  | 1  | 0  | 14/3 ≈ 4.67 |  
| S3    | 0  | 5/3  | 0  | 4  | -2/3  | 0  | 1  | 29/3 ≈ 9.67 |  
| Z     |    | -3   | -5 | -4 | 0     | 0  | 0  | 0        |  

---

**Step 4: Choose entering variable**  
Check Cj - Zj:  
Calculate Zj for each variable:

Zj_x1 = (5)*(2/3) + 0*(-4/3) + 0*(5/3) = 10/3 ≈ 3.33  
Cj_x1 - Zj_x1 = 3 - 3.33 = -0.33 (negative)  
Zj_x3 = (5)*0 + 0*5 + 0*4 = 0  
Cj_x3 - Zj_x3 = 4 - 0 = 4 (positive) → x3 enters basis  

---

**Step 5: Minimum ratio test for x3 column:**  
- Row x2: RHS / x3 = 2.67 / 0 → ∞ (cannot divide by zero)  
- Row S2: 4.67 / 5 = 0.93 (smallest positive ratio)  
- Row S3: 9.67 / 4 = 2.42  

So, S2 leaves basis, pivot element = 5 (row S2, column x3)  

---

**Iteration 2: Pivot on element 5**

- New Row S2 = old S2 / 5  
- Update other rows by eliminating x3 terms.

New S2 row:  

| Basis | CB | x1       | x2 | x3 | S1        | S2    | S3 | RHS      |  
|-------|----|----------|----|----|-----------|-------|----|----------|  
| x3    | 4  | -4/15    | 0  | 1  | -2/15     | 1/5   | 0  | 14/15 ≈ 0.93 |  

Update x2 and S3:  
x2 = x2 - 0 * new S2 (no change)  
S3 = S3 - 4 * new S2  

S3 new RHS = 9.67 - 4*(0.93) = 5.95  
S3 new x1 = 5/3 + 16/15 = 41/15 ≈ 2.73  
S3 new x2 = 0  
S3 new x3 = 0  
S3 new S1 = -2/3 + 8/15 = -2/15 ≈ -0.13  
S3 new S2 = 0 - 4/5 = -0.8  

---

**Updated Tableau after Iteration 2:**

| Basis | CB | x1      | x2 | x3 | S1      | S2     | S3     | RHS       |  
|-------|----|---------|----|----|---------|--------|--------|-----------|  
| x2    | 5  | 2/3     | 1  | 0  | 1/3     | 0      | 0      | 2.67      |  
| x3    | 4  | -4/15   | 0  | 1  | -2/15   | 1/5    | 0      | 0.93      |  
| S3    | 0  | 41/15   | 0  | 0  | -2/15   | -4/5   | 1      | 5.95      |  
| Z     |    | -3      | -5 | -4 | 0       | 0      | 0      | 0         |  

---

**Step 6: Calculate Cj - Zj to decide next entering variable**

Zj_x1 = 5*(2/3) + 4*(-4/15) + 0*(41/15) = 34/15 ≈ 2.27  
Cj_x1 - Zj_x1 = 3 - 2.27 = 0.73 (positive) → x1 enters basis

---

**Step 7: Minimum ratio test for x1**

- Row x2: 2.67 / (2/3) = 4.00  
- Row x3: 0.93 / (-4/15) negative → ignore  
- Row S3: 5.95 / (41/15) ≈ 2.18  

S3 leaves basis, pivot element = 41/15 ≈ 2.73  

---

**Iteration 3: Pivot on element 41/15**

- New row S3 = old S3 / (41/15)  
- Update other rows.

---

(Continue similarly until optimal reached.)

---

**Final Solution:**  
x1 = ..., x2 = ..., x3 = ...  
Z = maximum value  

---

---
Q: Differentiate y = sin(3x^2)
A:
Step 1: Recognize this is a composite function: outer = sin(u), inner = u = 3x²
Step 2: Differentiate outer: d/dx [sin(u)] = cos(u)
Step 3: Differentiate inner: d/dx [3x²] = 6x
Step 4: Apply chain rule: dy/dx = cos(3x²) * 6x

** Final Answer **: dy/dx = 6x · cos(3x²)

** Summary **:
- Chain Rule: d/dx [f(g(x))] = f'(g(x)) · g'(x)
- d/dx [sin(u)] = cos(u)
- d/dx [x²] = 2x

---

---
Q: Find dy/dx if sin(xy) = x
A:
Step 1: Differentiate both sides with respect to x.
Left: d/dx[sin(xy)] → cos(xy) * d/dx[xy]  
Right: d/dx[x] = 1

Step 2: Use the product rule on d/dx[xy] → x·dy/dx + y

Step 3: Now substitute:
cos(xy) * (x·dy/dx + y) = 1

Step 4: Expand:
cos(xy)·x·dy/dx + cos(xy)·y = 1

Step 5: Solve for dy/dx:
cos(xy)·x·dy/dx = 1 - cos(xy)·y  
dy/dx = [1 - y·cos(xy)] / [x·cos(xy)]

** Final Answer**: dy/dx = (1 - y·cos(xy)) / (x·cos(xy))

🔎 **Summary**:  
We differentiated both sides of the equation using the chain rule and product rule, then solved for dy/dx. Since y is a function of x, we treated it implicitly. The result gives the slope in terms of both x and y.

📘 **Formulas used**:
- Chain rule: d/dx[sin(u)] = cos(u)·du/dx
- Product rule: d/dx[xy] = x·dy/dx + y
- Implicit differentiation: treat y as a function of x

---
Use the structure and clarity of the above answers as a guide.


Q: {question}  
A:


"""
