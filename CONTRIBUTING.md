# Contributing to TailwindCSS-Social

Thank you for your interest in contributing! Here's how you can help.

## 🐛 Reporting Bugs

- Check if the issue already exists in [GitHub Issues](https://github.com/aldi/tailwindcss-social/issues)
- If not, create a new issue with a clear title and description
- Include steps to reproduce the bug
- Include your browser and Node.js version

## 💡 Suggesting Features

- Open an issue with the `enhancement` label
- Describe the feature and why it would be useful
- Include examples if possible

## 🔧 Development Setup

1. Fork and clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Make your changes
4. Build the CSS:
   ```bash
   npm run build
   ```
5. Run checks:
   ```bash
   npm run lint
   npm test
   npm run check:providers
   ```

## 📝 Pull Request Guidelines

1. Create a feature branch from `main`
2. Make your changes
3. Update documentation if needed
4. If you changed anything in `src/`, run `npm run build` and include updated files in `css/` and `docs/public/all.min.css`
5. Run quality checks before opening the PR:
   ```bash
   npm run lint
   npm test
   npm run check:providers
   ```
6. Submit your pull request

## 🎨 Adding a New Provider

1. Add the provider to `src/providers.js` with:
   - Name (lowercase, no spaces)
   - Display name
   - Official brand color in HSL format

2. The build script will automatically generate:
   - Button components
   - Color utilities
   - Individual CSS file

3. Update docs provider data in `docs/src/data/socialProviders.js`
4. Run:
   ```bash
   npm run build
   npm run check:providers
   ```
5. Update the provider list in `README.md`

## 📜 Code Style

- Use ES modules (`import`/`export`)
- Use meaningful variable names
- Add JSDoc comments for functions
- Keep files focused and small

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.
