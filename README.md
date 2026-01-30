README.md
# YOWL Project - Pivot

## Context

Social platforms are evolving rapidly as users increasingly seek **more focused, meaningful, and intentional interactions**. In parallel, smaller and more targeted communities are emerging, often challenging established platforms by offering **simpler experiences, stronger privacy guarantees, or more engaging social dynamics**. These alternatives reveal the limitations of large-scale social networks when it comes to addressing specific user needs.

Within this context, this project explores the design and development of a **new social web application**. Rather than competing directly with major platforms, the objective is to **address a clearly defined user problem** through a well-scoped, thoughtfully designed product.

## Project Goals

This project is conducted as a **product design exercise**, following a professional and realistic methodology. The team operates as a multidisciplinary product team and goes through the following steps:

* Researching and analysing user needs
* Framing a clear problem statement
* Defining a coherent product concept
* Designing the user experience
* Producing wireframes, mockups, and an interactive prototype
* Testing the solution with peers and iterating based on feedback
* Delivering a **minimal web-based MVP** demonstrating the core user flow

The primary goal is **not** to deliver a production-ready social network, but to **demonstrate a rigorous product design process** supported by a functional prototype and a minimal implementation.

Emphasis is placed on:

* Clarity of problem definition
* Coherence of the proposed solution
* Quality and accessibility of the user experience
* Relevance of prioritization and MVP scope
* Ability to translate design intentions into a working digital artefact

---

## Repository Structure

All Product Design deliverables and the MVP source code are grouped within a single repository, as required by the specification.

```
.
├── docs/
│   ├── 01_research/
│   ├── 02_personas/
│   ├── 03_user_journey/
│   ├── 04_wireframes/
│   ├── 05_mockups/
│   ├── 06_prototype/
│   ├── 07_feedback/
│   ├── 08_prioritization/
│   └── 09_pitch/
├── mvp/
└── README.md
```

Each folder inside `/docs` contains a dedicated `README.md` explaining its content and purpose.

---

## Product Design Documentation (`/docs`)

### Research

**Purpose:** Frame the problem based on factual insights and lightweight user research.

* `benchmark.md`
  Analysis of existing or related solutions and identification of differentiating opportunities.

* `interviews.md`
  Notes from at least three structured interviews with classmates.
  Highlights user needs, frustrations, habits, and expectations.

* `problem_statement.md`
  Concise formulation of the problem the product addresses.

* `objectives_constraints.md`
  Measurable objectives, assumptions, risks, and project constraints.

---

### Personas

* `persona_1.md`
  Primary persona derived from research, including goals, motivations, behaviours, and pain points.

---

### User Journey

* `user_journey.md`
  Step-by-step description of the main usage scenario, highlighting friction points and opportunities.

---

### Wireframes

* Low-fidelity wireframes of all main screens
  (PDF, PNG, or Figma export)

---

### Mockups

* High-fidelity mockups (minimum three screens)
* Justification of key design decisions
* Explanation of accessibility considerations

---

### Prototype

* Link to a clickable prototype (Figma or equivalent)
* Short description of supported interactions

The prototype illustrates the intended experience before development.

---

### Feedback

* `test_protocol.md`
  Description of the tasks given to testers during prototype testing.

* `feedback_summary.md`
  Consolidated feedback from 3 to 5 testers, highlighting recurring issues, confusions, and opportunities.

---

### Prioritization

* `prioritization_matrix.md`
  Prioritization framework (MoSCoW, RICE, or equivalent) justifying design and feature choices.

* `mvp_definition.md`
  Precise definition of the MVP scope, including:

  * Main user flow
  * Essential screens
  * Minimal feature set
  * Explicit exclusions

This document defines what is implemented in Phase 2.

---

### Pitch

* `pitch_deck.pdf`
  Final presentation used for the defense, covering:

  * Problem
  * Target users
  * Product concept
  * UX walkthrough
  * MVP scope

---

## MVP (`/mvp`)

The `/mvp` directory contains the source code of the implemented **minimal web-based product**.

The MVP focuses on demonstrating the **essential user flow** of the concept rather than full feature completeness.

### Technical Notes

* The MVP is containerized using Docker
* The frontend is implemented using React and Vite.
* The backend is implemented using Node.JS and Express.
* There is an authentication system

---

## Installation & Run Instructions

- Navigate to the `mvp` folder.
- Simply run the `docker compose up --build` command and this will start the MVP on LAN.
- It will provide you with the local network IP to view and use our app.

---

## Figma and Prototype Link

https://www.figma.com/design/XtnUXLN4gGLiPsl1gABdLj/YOWL-Figma---Pivot