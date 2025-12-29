# Contributing to Predictify Sports

Thank you for your interest in contributing to Predictify Sports! This document provides guidelines for contributing to the project.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/predictify-sports.git`
3. Create a new branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Test your changes
6. Commit with conventional commits
7. Push to your fork
8. Create a Pull Request

## Development Workflow

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Setup
```bash
npm install
cp .env.local.example .env.local
# Configure your environment variables
npm run dev
```

### Coding Standards

- **TypeScript:** Use TypeScript for all new files
- **ESLint:** Follow the project's ESLint configuration
- **Formatting:** Code will be formatted automatically
- **Naming:** Use descriptive variable and function names
- **Comments:** Add comments for complex logic

### Commit Messages

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

Examples:
```
feat: Add match prediction form
fix: Resolve authentication redirect issue
docs: Update README with API documentation
```

## Pull Request Process

1. Update the README.md with details of changes if needed
2. Update the documentation if you're changing APIs
3. Ensure all tests pass
4. Ensure linting passes: `npm run lint`
5. Ensure the build succeeds: `npm run build`
6. Request review from maintainers

## Code Review

- Be respectful and constructive
- Address all feedback
- Keep PRs focused and small when possible
- Link to related issues

## Questions?

Feel free to open an issue for any questions or concerns.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
