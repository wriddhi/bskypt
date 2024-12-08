# Contribution Guidelines

When contributing to `bskypt`, whether on GitHub or in other community spaces:

- Be respectful, civil, and open-minded.
- Before opening a new pull request, try searching through the [issue tracker](https://github.com/wriddhi/bskypt/issues) for known issues or fixes.
- If you want to make code changes based on your personal opinion(s), make sure you open an issue first describing the changes you want to make, and open a pull request only when your suggestions get approved by maintainers.

## How to Contribute

### Prerequisites

In order to not waste your time implementing a change that has already been declined, or is generally not needed, start by [opening an issue](https://github.com/wriddhi/bskypt/issues/new/choose) describing the problem you would like to solve.

### Setup your environment locally

_Some commands will assume you have the Github CLI installed, if you haven't, consider [installing it](https://github.com/cli/cli#installation), but you can always use the Web UI if you prefer that instead._

1. In order to contribute to this project, you will need to fork the repository:

```bash
gh repo fork wriddhi/bskypt
```

2. Clone it to your local machine:

```bash
gh repo clone <your-github-name>/bskypt
```

3. This project uses [pnpm](https://pnpm.io) as its package manager. Install it if you haven't already:

```bash
npm install -g pnpm
```

4. Install the project's dependencies:

```bash
pnpm install
```

### Implement your changes

This project is a [Next.js](https://nextjs.org) project. Now you're all setup and can start implementing your changes.

Here are some useful scripts for when you are developing:

| Command          | Description                                             |
| ---------------- | ------------------------------------------------------- |
| `pnpm dev`       | Starts the development server for the app without https |
| `pnpm dev:https` | Starts the development server for the app with https    |
| `pnpm build`     | Builds the project in production mode                   |
| `pnpm start`     | Starts the production server for the app without https  |
| `pnpm lint`      | Lints the code                                          |

When making commits, make sure to follow the [conventional commit](https://www.conventionalcommits.org/en/v1.0.0/) guidelines, i.e. prepending the message with `feat:`, `fix:`, `chore:`, `docs:`, etc... You can use `git status` to double check which files have not yet been staged for commit:

```bash
git add <file> && git commit -m "feat/fix/chore/docs: commit message"
```

### When you're done

Check that your code follows the project's style guidelines by running:

```bash
pnpm lint
```

When all that's done, it's time to file a pull request to upstream:

```bash
gh pr create --web
```

and fill out the title and body appropriately. Again, make sure to follow the [conventional commit](https://www.conventionalcommits.org/en/v1.0.0/) guidelines for your title.

## Credits

This documented was inspired by the contributing guidelines for [cloudflare/wrangler2](https://github.com/cloudflare/wrangler2/blob/main/CONTRIBUTING.md).
