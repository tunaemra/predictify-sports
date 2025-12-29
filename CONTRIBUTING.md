# Contributing to Predictify Sports

Thank you for your interest in contributing to Predictify Sports! 🎉

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in Issues
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Environment details (OS, browser, etc.)

### Suggesting Features

1. Check existing feature requests
2. Create a new issue with:
   - Clear feature description
   - Use cases
   - Potential implementation approach
   - Mockups or wireframes if applicable

### Code Contributions

1. **Fork the repository**

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow the existing code style
   - Write clear commit messages
   - Add tests if applicable
   - Update documentation

4. **Test your changes**
   ```bash
   npm run type-check
   npm run lint
   npm run build
   ```

5. **Commit your changes**
   ```bash
   git commit -m "feat: add new feature"
   ```
   
   Use conventional commits:
   - `feat:` - New feature
   - `fix:` - Bug fix
   - `docs:` - Documentation changes
   - `style:` - Code style changes
   - `refactor:` - Code refactoring
   - `test:` - Test changes
   - `chore:` - Build/tooling changes

6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request**
   - Provide clear description
   - Reference related issues
   - Include screenshots for UI changes

## Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/tunaemra/predictify-sports.git
   cd predictify-sports
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your Supabase credentials
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

## Code Style

### TypeScript
- Use TypeScript for all new code
- Define proper types/interfaces
- Avoid `any` type
- Use proper access modifiers

### React Components
- Use functional components with hooks
- Keep components small and focused
- Use proper prop typing
- Follow naming conventions

### CSS/Styling
- Use Tailwind CSS utility classes
- Follow mobile-first approach
- Ensure dark mode support
- Keep styles consistent

## Project Structure

```
src/
├── app/              # Next.js app router
├── components/       # React components
├── lib/             # Utility functions
├── services/        # Business logic
└── types/           # TypeScript types
```

## Testing

- Write tests for new features
- Ensure existing tests pass
- Test on multiple browsers
- Test responsive design

## Documentation

- Update README.md if needed
- Add JSDoc comments for functions
- Update IMPLEMENTATION.md for architecture changes
- Create examples for new features

## Code Review

All submissions require review. We'll look for:
- Code quality and style
- Test coverage
- Documentation
- Performance impact
- Security considerations

## Questions?

Feel free to ask questions in:
- GitHub Issues
- GitHub Discussions
- Pull Request comments

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Predictify Sports! 🚀
