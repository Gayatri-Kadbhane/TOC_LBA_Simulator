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

This means that the input must contain:

One or more a symbols
Followed by the same number of b symbols
Followed by the same number of c symbols
Examples
Input	Result
abc	✅ Accepted
aabbcc	✅ Accepted
aaabbbccc	✅ Accepted
aabbbccc	❌ Rejected
aaabbcc	❌ Rejected
abcabc	❌ Rejected
aabbc	❌ Rejected
⚙️ Working Methodology

The simulator follows a mark-and-match technique.

Step 1: Read a

The LBA searches for an unmarked a and replaces it with X.

a → X
Step 2: Match b

The corresponding b is found and replaced with Y.

b → Y
Step 3: Match c

The corresponding c is found and replaced with Z.

c → Z
Step 4: Repeat

The process is repeated until all input symbols are marked.

Step 5: Final Decision

If all symbols are successfully matched, the input is Accepted.

Otherwise, the input is Rejected.

Example:

Input:
aaabbbccc

Final Tape:
XXXYYYZZZ

Result:
Accepted
🔄 LBA States

The simulator uses the following conceptual states:

State	Description
q0	Initial state
q1	Find and mark a
q2	Find and mark b
q3	Find and mark c
q4	Move toward the left side
q_accept	Input accepted
q_reject	Input rejected
🖥️ Features
Interactive input field
LBA simulation
Accepted/Rejected result display
Input validation
Symbol count display
Visual tape representation
Head position display
Execution trace
Predefined test cases
Responsive user interface
Simple and student-friendly design
🛠️ Technologies Used
Technology	Purpose
HTML5	Website structure
CSS3	Styling and responsive design
JavaScript	LBA simulation and interaction
Git	Version control
GitHub	Project hosting
📁 Project Structure
TOC_LBA_Simulator/
│
├── index.html
├── style.css
├── script.js
└── README.md
File Description

index.html

Contains the structure and content of the simulator.

style.css

Contains the styling, layout, colors, tables, tape design, and responsive interface.

script.js

Contains input validation, LBA simulation logic, tape processing, result generation, and execution trace.

README.md

Contains project documentation and information.

▶️ How to Run the Project
Option 1: Directly in Browser
Download or clone the repository.
Open the project folder.
Open index.html.
The simulator will run in your web browser.
Option 2: Using VS Code

Open the project folder in Visual Studio Code.

cd /d "D:\New folder (2)\TOC_LBA_Simulator"
code .

Install the Live Server extension if required.

Right-click index.html and select:

Open with Live Server
🧪 Test Cases

The simulator includes predefined test cases.

Valid Inputs
abc
aabbcc
aaabbbccc
Invalid Inputs
aabbbccc
aaabbcc
abcabc
aabbc
aaabbbcccd
📊 Example

For the input:

aaabbbccc

The simulator processes the symbols as:

aaabbbccc
   ↓
Xaabbbccc
   ↓
XXabbbccc
   ↓
XXXYbbccc
   ↓
XXXYYbccc
   ↓
XXXYYYccc
   ↓
XXXYYYZcc
   ↓
XXXYYYZZc
   ↓
XXXYYYZZZ
Final Result
ACCEPTED
🎓 Educational Purpose

This project is designed to help students understand the practical implementation of concepts from Theory of Computation, especially:

Context-Sensitive Grammar
Context-Sensitive Languages
Linear Bounded Automata
Tape representation
State transitions
String validation
Acceptance and rejection
🔗 GitHub Repository

TOC LBA Simulator – GitHub

👩‍💻 Author

Gayatri Kadbhane

Computer Engineering Student