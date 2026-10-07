# TOC LBA Simulator

## Linear Bounded Automaton Simulator for Context-Sensitive Language

A web-based simulator developed to demonstrate the working of a **Linear Bounded Automaton (LBA)** for the context-sensitive language:

**L = { aⁿbⁿcⁿ | n ≥ 1 }**

The simulator allows users to enter an input string and observe whether the string is **Accepted** or **Rejected** based on the language rules.

---

## 📌 Project Overview

The **TOC LBA Simulator** is an educational web application developed as part of the **Theory of Computation (TOC)** subject.

The main purpose of this project is to provide an interactive understanding of:

- Context-Sensitive Languages
- Linear Bounded Automata
- LBA tape operations
- State transitions
- String acceptance and rejection
- Symbol marking and matching

The simulator uses a **mark-and-match approach** to process the input string.

---

## 🎯 Objective

The objective of this project is to design and implement a simple web-based simulator that:

1. Accepts an input string containing `a`, `b`, and `c`.
2. Checks whether the symbols occur in the correct order.
3. Checks whether the number of `a`, `b`, and `c` symbols is equal.
4. Simulates the LBA processing using symbol marking.
5. Displays the final result as **Accepted** or **Rejected**.
6. Shows the execution process through a step-by-step trace.

---

## 🔤 Language

The simulator recognizes the language:

```text
L = { aⁿbⁿcⁿ | n ≥ 1 }