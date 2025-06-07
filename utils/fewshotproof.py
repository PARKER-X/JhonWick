FEW_SHOT_PROOF_PROMPT = """\

You are a mathematical assistant. Answer using formal proof style with clear steps and proper notation.
Below are the examples of proofs:

FEW_SHOT_PROOF_PROMPT: |
  Q: Let S ⊆ ℝⁿ be an open convex set and f: S → ℝ be a twice differentiable function. Then f is convex on S if and only if its Hessian matrix ∇²f(x) is positive semi-definite for all x ∈ S.

  A: Proof:

  **(Necessity)**

  Assume that f is convex on the open convex set S. Let x̂ ∈ S and let x ∈ ℝⁿ.

  Since S is open, for sufficiently small λ ≠ 0, the point x̂ + λx ∈ S.

  By the first-order condition for convexity (Theorem 3), we have:

  (1) f(x̂ + λx) ≥ f(x̂) + λ∇f(x̂)ᵀx

  By Taylor's theorem (second-order expansion):

  (2) f(x̂ + λx) = f(x̂) + λ∇f(x̂)ᵀx + (1/2)λ² xᵀ∇²f(x̂)x + λ²α(x̂, λx)

  Substitute (2) into (1):

  f(x̂) + λ∇f(x̂)ᵀx + (1/2)λ² xᵀ∇²f(x̂)x + λ²α(x̂, λx) ≥ f(x̂) + λ∇f(x̂)ᵀx

  Cancel common terms, divide by λ² > 0, and take the limit λ → 0:

  (1/2) xᵀ∇²f(x̂)x + α(x̂, λx) ≥ 0 ⇒ xᵀ∇²f(x̂)x ≥ 0

  So ∇²f(x̂) is positive semi-definite for all x̂ ∈ S.

  **(Sufficiency)**

  Assume ∇²f(x) is positive semi-definite for all x ∈ S. Let x̂, x ∈ S.

  By the multivariate mean value theorem, there exists x̃ = λx̂ + (1−λ)x for some λ ∈ (0, 1) such that:

  (3) f(x) = f(x̂) + ∇f(x̂)ᵀ(x − x̂) + (1/2)(x − x̂)ᵀ∇²f(x̃)(x − x̂)

  Since ∇²f(x̃) is positive semi-definite, the final term is ≥ 0.

  Thus:

  f(x) ≥ f(x̂) + ∇f(x̂)ᵀ(x − x̂)

  This satisfies the first-order condition for convexity.

  Hence, f is convex on S.

  □

  ---
  🔍 Summary:
  A function f: S → ℝ is convex on an open convex set S ⊆ ℝⁿ **iff** ∇²f(x) ⪰ 0 (i.e., is positive semi-definite) for all x ∈ S.

  📘 Technical Jargon Used:
  - **Convex Set**: A set where any line segment connecting two points lies entirely within the set.
  - **Convex Function**: A function where the secant line lies above the graph.
  - **Twice Differentiable**: The second derivatives exist and are continuous.
  - **Hessian Matrix (∇²f(x))**: The matrix of second partial derivatives.
  - **Positive Semi-Definite Matrix**: A symmetric matrix M such that xᵀMx ≥ 0 ∀ x.
  - **Mean Value Theorem (Multivariate)**: Extends Taylor's theorem to vector-valued inputs.
  - **Taylor Expansion**: Approximating functions using derivatives around a point.

Q: Theorem — A function f: S → ℝ is convex on a convex set S ⊆ ℝⁿ if and only if its epigraph is a convex subset of ℝⁿ⁺¹.

  A: Proof:

  Let f: S → ℝ and let the epigraph of f be defined as:

  epi(f) = {{ (x, α) ∈ ℝⁿ⁺¹ | x ∈ S and f(x) ≤ α }}

  We will prove both directions.

  ---
  **(Necessity)**  
  Assume f is convex on S.

  Let (x, α), (u, β) ∈ epi(f). That is,  
  x, u ∈ S and f(x) ≤ α,f(u) ≤ β

  Let λ ∈ [0, 1]. Define:

  z = λx + (1−λ)u

  Since S is convex and x, u ∈ S, it follows that z ∈ S.

  Using the convexity of f:

  f(z) = f(λx + (1−λ)u) ≤ λf(x) + (1−λ)f(u) ≤ λ α + (1−λ) β

  So:

  (z, λα + (1−λ)β) ∈ epi(f)

  Hence, for any two points in epi(f), their convex combination lies in epi(f).

  Therefore, epi(f) is a convex set.

  ---
  **(Sufficiency)**  
  Assume epi(f) is a convex subset of ℝⁿ⁺¹.

  Let x, u ∈ S. Then:  
  (x, f(x)) ∈ epi(f),(u, f(u)) ∈ epi(f)

  Since epi(f) is convex, for any λ ∈ [0, 1], the point

  (λx + (1−λ)u, λf(x) + (1−λ)f(u)) ∈ epi(f)

  So:

   f(λx + (1−λ)u) ≤ λf(x) + (1−λ)f(u)

  Thus, f is convex on S.

  □

  ---
  📘 Technical Definitions:
  - **Epigraph** of a function f: The set of all points lying on or above its graph in ℝⁿ⁺¹.
  - **Convex Set**: A set C is convex if for any x, y ∈ C and λ ∈ [0,1], the point λx + (1−λ)y ∈ C.
  - **Convex Function**: f is convex if for all x, y ∈ S and λ ∈ [0, 1]:  
   f(λx + (1−λ)y) ≤ λf(x) + (1−λ)f(y)

  ---
  🔍 Diagram: Logic of Convexity ↔ Epigraph Convexity

  ```mermaid
  flowchart TD
      A[f is convex on S] --> B[x, u ∈ S ⇒ λx+(1−λ)u ∈ S]
      B --> C[f(λx+(1−λ)u) ≤ λf(x)+(1−λ)f(u)]
      C --> D[(x, α), (u, β) ∈ epi(f) ⇒ (λx+(1−λ)u, λα+(1−λ)β) ∈ epi(f)]
      D --> E[epi(f) is convex]

      F[epi(f) is convex] --> G[(x, f(x)), (u, f(u)) ∈ epi(f)]
      G --> H[(λx+(1−λ)u, λf(x)+(1−λ)f(u)) ∈ epi(f)]
      H --> I[f(λx+(1−λ)u) ≤ λf(x)+(1−λ)f(u)]
      I --> J[f is convex on S]

Q: Prove that √2 is irrational using contradiction.

A: Proof (By Contradiction):

Assume, for contradiction, that √2 is rational.

Then there exist integers a and b with no common factors such that:

√2 = a / b (b ≠ 0, and the fraction is in lowest terms)

Squaring both sides:

2 = a² / b²⇒a² = 2b²

This implies that a² is even ⇒ a must be even (since the square of an odd number is odd).

So, let a = 2k for some integer k.

Then:

a² = (2k)² = 4k²  
⇒4k² = 2b²  
⇒b² = 2k²

This implies b² is even ⇒ b is also even.

Hence, both a and b are even, contradicting the assumption that a/b is in lowest terms.

Therefore, our assumption was false, and √2 is irrational.

□

---

📘 Terms:
- **Rational number**: Can be expressed as a/b where a, b ∈ ℤ, b ≠ 0.
- **Irrational**: Cannot be written as a ratio of integers.
- **Contradiction**: Assume the negation of what you want to prove, and show it leads to a logical inconsistency.

---

🔍 Diagram: Proof Flow (Contradiction)

```mermaid
flowchart TD
    A[Assume √2 is rational ⇒ a/b in lowest terms] --> B[√2 = a/b ⇒ a² = 2b²]
    B --> C[a² even ⇒ a even ⇒ a = 2k]
    C --> D[b² = 2k² ⇒ b even]
    D --> E[a and b both even ⇒ contradicts lowest terms]
    E --> F[Contradiction ⇒ √2 is irrational]

    


---

Q: Prove that the sum of the first n natural numbers Prove by induction: ∑ₖ₌₁ⁿ k = n(n+1)/2

A: Proof (By Induction):

Let P(n): 1 + 2 + ... + n = n(n + 1)/2

**Base Case (n = 1):**  
LHS = 1  
RHS = 1(1 + 1)/2 = 1  
⇒ P(1) is true.

**Inductive Hypothesis:**  
Assume P(k) is true for some k ∈ ℕ:

1 + 2 + ... + k = k(k + 1)/2

**Inductive Step (k → k+1):**  
We must show:

1 + 2 + ... + k + (k+1) = (k+1)(k+2)/2

LHS = [k(k + 1)/2] + (k + 1) = (k(k + 1) + 2(k + 1)) / 2  
= (k + 1)(k + 2)/2 = RHS

Hence, P(k+1) is true.

By induction, the formula holds for all n ∈ ℕ.



---

📘 Terms:
- **Mathematical Induction**: Prove base case, then show P(k) ⇒ P(k+1).
- **Natural Numbers**: ℕ = {{1, 2, 3, ...}}
- **Closed-form expression**: A formula that directly gives the result.

---

🔍 Diagram: Proof Flow (Induction)

```mermaid
flowchart TD
    A[Base Case: P(1)] --> B[P(1) is true]
    B --> C[Assume P(k) is true]
    C --> D[Show P(k+1) based on P(k)]
    D --> E[Prove formula holds for k+1]
    E --> F[Conclusion: ∑ₖ₌₁ⁿ k = n(n+1)/2]

    


---

Q: Prove that if A ⊆ B and B ⊆ C, then A ⊆ C.

A: Proof:

Let A, B, C be sets.

Assume A ⊆ B and B ⊆ C.

Let x ∈ A.  
Then since A ⊆ B ⇒ x ∈ B  
And since B ⊆ C ⇒ x ∈ C

Therefore, x ∈ C. Since x was arbitrary, A ⊆ C.

□

---

📘 Terms:
- **Subset (⊆)**: A ⊆ B means every element of A is also in B.
- **Transitivity of inclusion**: If A ⊆ B and B ⊆ C ⇒ A ⊆ C

---

🔍 Diagram: Proof Flow (Set Inclusion)

```mermaid
flowchart TD
    A[x ∈ A] --> B[x ∈ B (A ⊆ B)]
    B --> C[x ∈ C (B ⊆ C)]
    C --> D[Thus x ∈ C ⇒ A ⊆ C]

    
Q: Let f: S ⊆ ℝⁿ → ℝ be differentiable on an open convex set S. Prove that f is convex on S if and only if:
f(x) − f(u) ≥ (x − u)ᵀ∇f(u), ∀ x, u ∈ S.

A: Proof:

---

(Necessity)

Assume f is convex on S.  
Let x, u ∈ S and let λ ∈ [0, 1].

By the definition of convexity:

f(λx + (1 − λ)u) ≤ λf(x) + (1 − λ)f(u)...(1)

Rewriting:

f(x) − f(u) ≥ [f(x) − f(λx + (1 − λ)u)] / λ...(2)

Now since f is differentiable on S, we apply the **first-order Taylor approximation**:

f(u + w) = f(u) + wᵀ∇f(u) + α(u, w)‖w‖, where lim_{{‖w‖ → 0}} α(u, w) = 0.

Let w = λ(x − u), so:

f(λx + (1 − λ)u) = f(u + λ(x − u))  
= f(u) + λ(x − u)ᵀ∇f(u) + α(u, λ(x − u))‖λ(x − u)‖...(3)

Substitute (3) into (1):

f(x) − f(u) ≥ λ(x − u)ᵀ∇f(u) + α(u, λ(x − u))‖λ(x − u)‖

Divide by λ and take the limit as λ → 0:  
lim_{{λ→0}} α(u, λ(x − u))‖λ(x − u)‖ = 0

Thus:

f(x) − f(u) ≥ (x − u)ᵀ∇f(u)

---

(Sufficiency)

Now assume:f(x) − f(u) ≥ (x − u)ᵀ∇f(u), ∀ x, u ∈ S...(∗)

Let x, u ∈ S and define:x* = λx + (1 − λ)u for some λ ∈ [0, 1]

Then:

f(x) ≥ f(x*) + (x − x*)ᵀ∇f(x*)...(4)  
f(u) ≥ f(x*) + (u − x*)ᵀ∇f(x*)...(5)

Multiply (4) by λ and (5) by (1 − λ), and add:

λf(x) + (1 − λ)f(u) ≥ f(x*) + [λ(x − x*) + (1 − λ)(u − x*)]ᵀ∇f(x*)

But note:

λ(x − x*) + (1 − λ)(u − x*) = 0  
⇒ Inner product term = 0

Therefore:

λf(x) + (1 − λ)f(u) ≥ f(x*) = f(λx + (1 − λ)u)

Thus, f satisfies the definition of convexity.



---

📘 Technical Terms:
- **Differentiable function**: A function with continuous first derivative on its domain.
- **Convex function**: f is convex if f(λx + (1−λ)u) ≤ λf(x) + (1−λ)f(u)
- **First-order condition for convexity**: f(x) − f(u) ≥ (x − u)ᵀ∇f(u) is necessary and sufficient for convexity on open convex sets.

---

🔍 Diagram: Convexity from First Derivative Inequality

```mermaid
flowchart TD
    A[Assume f is convex] --> B[f(λx + (1−λ)u) ≤ λf(x) + (1−λ)f(u)]
    B --> C[Use differentiability of f]
    C --> D[Taylor approx: f(u + w) ≈ f(u) + wᵀ∇f(u)]
    D --> E[f(x) − f(u) ≥ (x − u)ᵀ∇f(u)]

    F[Assume ∀ x,u: f(x) − f(u) ≥ (x − u)ᵀ∇f(u)] --> G[Define x* = λx + (1−λ)u]
    G --> H[Apply gradient inequality at x*]
    H --> I[λf(x) + (1−λ)f(u) ≥ f(x*)]
    I --> J[f is convex on S]




Q: Theorem: The feasible region defined by a system of linear inequalities is a convex set.

Statement: Let S = { { x ∈ ℝⁿ | Ax ≤ b }} be the feasible region defined by matrix A ∈ ℝ^(m×n) and vector b ∈ ℝ^m. Then S is convex.

A: Proof:

Step 1: Define two arbitrary points in the feasible region.

Assume x, y ∈ S, so Ax ≤ b and Ay ≤ b.

Step 2: Take a convex combination of x and y.

For any λ ∈ [0,1], define z = λx + (1-λ)y.

Step 3: Show z satisfies the constraints.

By linearity, Az = A(λx + (1-λ)y) = λAx + (1-λ)Ay ≤ λb + (1-λ)b = b.

Step 4: Conclusion.

Since Az ≤ b, z ∈ S. Hence, S is convex.

Summary:

- Feasible region: the set of points satisfying linear inequalities.  
- Convex set: contains all line segments between points in the set.  
- Convex combination: weighted average where weights sum to 1 and are non-negative.  
- Linearity of matrix multiplication is used to prove convexity.



---
Use the structure and clarity of the above answers as a guide.

Q: { question }
A:

"""