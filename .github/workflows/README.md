# GitHub Actions Workflows

This directory contains GitHub Actions workflows for automated testing, security, and deployment.

## Workflows

### 1. CI Workflow (`ci.yml`)

**Triggers:**
- Push to `master` or `main` branch
- Pull requests to `master` or `main` branch

**Jobs:**

#### Test Job
- **Matrix Testing**: Runs on Node.js 18.x and 20.x
- **Steps**:
  1. Checkout code
  2. Setup Node.js with npm cache
  3. Install dependencies (`npm ci`)
  4. Run TypeScript type checking (`npm run type-check`)
  5. Run ESLint (`npm run lint`)
  6. Run tests with coverage (`npm run test:coverage`)
  7. Build project (`npm run build`)
  8. Upload coverage to Codecov (only on Node.js 20.x)

#### Publish Job
- **Triggers**: Only on master/main branch
- **Conditions**: Runs after successful test job
- **Steps**:
  1. Checkout code
  2. Setup Node.js with npm registry
  3. Install dependencies
  4. Build project
  5. Publish to npm (only when triggered by a tag)

### 2. Security Workflow (`security.yml`)

**Triggers:**
- Every Monday at 9 AM UTC
- Manual dispatch

**Jobs:**

#### Security Audit
- **Steps**:
  1. Checkout code
  2. Setup Node.js
  3. Install dependencies
  4. Run security audit (`npm audit`)
  5. Check for outdated packages (`npm outdated`)

#### Dependabot Auto-merge
- **Conditions**: Only runs when triggered by Dependabot
- **Auto-merge**: Automatically merges patch version updates

## Setup Instructions

### 1. Secrets Configuration

Add the following secrets to your GitHub repository settings:

#### Required for npm publishing:
- `NPM_TOKEN`: Your npm authentication token

#### Optional for coverage:
- `CODECOV_TOKEN`: Your Codecov token (for private repositories)

### 2. Enable Dependabot

Create `.github/dependabot.yml`:

```yaml
version: 2
updates:
  # Enable version updates for npm
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
      day: "monday"
      time: "09:00"
    open-pull-requests-limit: 10
    auto-merge: true
    labels:
      - "dependencies"
      - "npm"
```

### 3. Branch Protection Rules

Enable branch protection for your main branch:

1. Go to repository Settings → Branches
2. Add branch protection rule for `master`/`main`
3. Require:
   - Pull request reviews before merging
   - Status checks to pass before merging
   - Include the following required status checks:
     - `test (18.x)`
     - `test (20.x)`

## Badge in README

Add this badge to your README.md:

```markdown
![CI](https://github.com/tourze/taro-use-json-rpc-request/workflows/CI/badge.svg)
```

## Troubleshooting

### Common Issues

1. **Node Version Mismatch**: Ensure your package.json `engines` field matches the matrix versions
2. **NPM Token**: Make sure `NPM_TOKEN` has correct permissions for publishing
3. **Coverage Upload**: Verify `CODECOV_TOKEN` is set for private repositories
4. **Dependency Installation**: Use `npm ci` instead of `npm install` in CI

### Local Testing

Test workflows locally using [act](https://github.com/nektos/act):

```bash
# Install act
brew install act  # macOS
# or download from GitHub releases

# Run workflow locally
act -j test
```

### Debugging

1. **View Logs**: Check the Actions tab in your GitHub repository
2. **SSH Debugging**: Add this step to your job for remote debugging:
   ```yaml
   - name: Setup tmate session
     if: ${{ failure() }}
     uses: mxschmitt/action-tmate@v3
   ```

## Best Practices

1. **Pin Action Versions**: Use specific versions of actions (e.g., `actions/checkout@v4`)
2. **Use Caching**: Enable npm caching to speed up builds
3. **Matrix Testing**: Test on multiple Node.js versions
4. **Fail Fast**: Set up proper error handling and exit codes
5. **Security**: Keep dependencies updated and run security audits regularly