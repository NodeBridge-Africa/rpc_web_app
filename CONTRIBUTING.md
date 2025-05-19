# Contributing to Nodebridge Africa Web App

Thank you for your interest in contributing to the Nodebridge Africa web app! We welcome all kinds of contributions, including bug fixes, new features, documentation improvements, and more.

---

## 🛠️ Project Setup

1. **Fork the repository** and clone it locally:
   ```bash
   git clone <your-fork-url>
   cd nodebridge
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```
3. **Start the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
4. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

---

## 🌳 Branching & Workflow

- Use feature branches for your work: `feature/your-feature`, `bugfix/issue-description`, etc.
- Keep your branch up to date with `main` by regularly merging or rebasing.
- Make sure your code builds and passes linting before submitting a PR.

---

## ✍️ Commit Messages

- Use clear, descriptive commit messages.
- Follow the format: `type(scope): description`
  - Examples:
    - `feat(gallery): add lightbox to gallery images`
    - `fix(blog): correct date formatting bug`
    - `docs(readme): update getting started section`
- Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

---

## 🧑‍💻 Code Style & Guidelines

- **Language:** TypeScript (strict mode enabled)
- **Framework:** Next.js 13+
- **Styling:** Tailwind CSS (utility-first, use config variables)
- **UI:** Use and extend components in `components/ui/` and `components/layout/`.
- **Linting:** Run `npm run lint` before pushing. Fix all errors and warnings.
- **Accessibility:** Use semantic HTML and accessible components (Radix UI, ARIA attributes).
- **Testing:** (If adding/altering logic, add or update tests. Preferred: Jest, React Testing Library)
- **Documentation:** Add comments for complex logic. Update README or relevant docs if needed.

---

## 🚀 Submitting a Pull Request

1. Push your branch to your fork.
2. Open a Pull Request (PR) against the `main` branch of the upstream repo.
3. Fill out the PR template (if available) and describe your changes clearly.
4. Link any related issues (e.g., `Closes #123`).
5. Wait for review and address any requested changes.

---

## 🔍 Code Review Process

- PRs are reviewed for code quality, style, and alignment with project goals.
- Automated checks (build, lint) must pass before merging.
- Reviewers may request changes or ask for clarification.
- Once approved, your PR will be merged by a maintainer.

---

## 🐞 Reporting Issues & Requesting Features

- Use [GitHub Issues](../../issues) to report bugs or request features.
- Provide as much detail as possible (steps to reproduce, screenshots, expected vs. actual behavior).
- Check for existing issues before creating a new one.

---

## 🙌 Community Standards

- Be respectful and constructive in all interactions.
- Follow the [Code of Conduct](CODE_OF_CONDUCT.md) (if available).
- Help others by reviewing PRs, answering questions, and improving documentation.

---

Thank you for helping make Nodebridge Africa better!
