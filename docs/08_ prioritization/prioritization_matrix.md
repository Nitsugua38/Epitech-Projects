## Purpose

This document describes how features were prioritized for the MVP using the **RICE framework** (Reach, Impact, Confidence, Effort).
The objective is to **justify the MVP scope** based on user needs, research insights, and project constraints, rather than technical ambition.

---

## Why RICE?

RICE was chosen because it allows us to:

* Compare features **relative to one another**
* Balance **user value** and **implementation effort**
* Explicitly account for **uncertainty** using confidence scores
* Make prioritization decisions **transparent and defensible**

---

## RICE Scoring Scale

* **Reach (R)**:
  1 = niche use
  2 = minority of users
  3 = majority of users
  4 = almost all users

* **Impact (I)**:
  1 = low improvement
  2 = moderate improvement
  3 = high improvement
  4 = critical to value proposition

* **Confidence (C)**:
  0.5 = assumption
  0.7 = informed hypothesis
  0.9 = validated by research / interviews

* **Effort (E)**:
  Estimated development effort (relative scale)

**RICE score = (R × I × C) / E**

---

## Feature Prioritization Matrix

| Feature                                        | Reach | Impact | Confidence | Effort | RICE Score | Decision |
| ---------------------------------------------- | ----- | ------ | ---------- | ------ | ---------- | -------- |
| Scrolling feed of job offers                   | 4     | 4      | 0.9        | 2      | **7.2**    | MVP      |
| Publish verified job offers                    | 4     | 4      | 0.9        | 3      | **4.8**    | Post-MVP |
| Instant Apply (saved CV)                       | 4     | 4      | 0.9        | 3      | **4.8**    | MVP      |
| Like / save an offer                           | 3     | 2      | 0.7        | 1      | **4.2**    | Post-MVP |
| Account creation / authentication              | 3     | 2      | 0.7        | 3      | **1.4**    | MVP      |
| Comments on offers                             | 2     | 2      | 0.5        | 2      | **1.0**    | Post-MVP |
| Share offers                                   | 2     | 2      | 0.5        | 2      | **1.0**    | Post-MVP |
| Application tracking history                   | 2     | 3      | 0.5        | 3      | **1.0**    | Post-MVP |
| Messaging / Q&A with employers                 | 1     | 3      | 0.5        | 4      | **0.4**    | MVP      |
| Notifications                                  | 2     | 1      | 0.5        | 3      | **0.33**   | MVP      |
| Algorithmic recommendations                    | 3     | 3      | 0.5        | 5      | **0.9**    | Excluded |
| ---------------------------------------------- | ----- | ------ | ---------- | ------ | ---------- | -------- |

---

## Conclusion

The MVP prioritizes features that:

* Directly reduce **application time**
* Enable **fast and engaging discovery**
* Are strongly supported by **research, interviews, and personas**
* Can be implemented within a constrained scope

Advanced social features, automation, and recruiter-side tools are **explicitly excluded** to preserve focus and execution quality.
