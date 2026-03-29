Create plugins - Claude Code Docs

[Skip to main content](#content-area)

[Claude Code Docs home page

![web_image](https://mintcdn.com/claude-code/TBPmHzr19mDCuhZi/logo/light.svg?fit=max&auto=format&n=TBPmHzr19mDCuhZi&q=85&s=d535f2e20f53cd911acc59ad1b64b2e0)

![web_image](https://mintcdn.com/claude-code/TBPmHzr19mDCuhZi/logo/dark.svg?fit=max&auto=format&n=TBPmHzr19mDCuhZi&q=85&s=28e49a2ffe69101f4aae9bfa70b393d0)](/docs)

![web_image](https://d3gk2c5xim1je2.cloudfront.net/flags/US.svg)

English

Search...

Ctrl KAsk AI

* [Claude Developer Platform](https://platform.claude.com/)
* [Claude Code on the Web](https://claude.ai/code)
* [Claude Code on the Web](https://claude.ai/code)Search...

Navigation

Build with Claude Code

Create plugins

[Getting started](/docs/en/overview)[Build with Claude Code](/docs/en/sub-agents)[Deployment](/docs/en/third-party-integrations)[Administration](/docs/en/setup)[Configuration](/docs/en/settings)[Reference](/docs/en/cli-reference)[Resources](/docs/en/legal-and-compliance)

##### Build with Claude Code

* [Create custom subagents](/docs/en/sub-agents)
* [Run agent teams](/docs/en/agent-teams)
* [Create plugins](/docs/en/plugins)
* [Discover and install prebuilt plugins](/docs/en/discover-plugins)
* [Extend Claude with skills](/docs/en/skills)
* [Output styles](/docs/en/output-styles)
* [Automate with hooks](/docs/en/hooks-guide)
* [Programmatic usage](/docs/en/headless)
* [Model Context Protocol (MCP)](/docs/en/mcp)
* [Troubleshooting](/docs/en/troubleshooting)

On this page

* [When to use plugins vs standalone configuration](#when-to-use-plugins-vs-standalone-configuration)
* [Quickstart](#quickstart)
* [Prerequisites](#prerequisites)
* [Create your first plugin](#create-your-first-plugin)
* [Plugin structure overview](#plugin-structure-overview)
* [Develop more complex plugins](#develop-more-complex-plugins)
* [Add Skills to your plugin](#add-skills-to-your-plugin)
* [Add LSP servers to your plugin](#add-lsp-servers-to-your-plugin)
* [Ship default settings with your plugin](#ship-default-settings-with-your-plugin)
* [Organize complex plugins](#organize-complex-plugins)
* [Test your plugins locally](#test-your-plugins-locally)
* [Debug plugin issues](#debug-plugin-issues)
* [Share your plugins](#share-your-plugins)
* [Submit your plugin to the official marketplace](#submit-your-plugin-to-the-official-marketplace)
* [Convert existing configurations to plugins](#convert-existing-configurations-to-plugins)
* [Migration steps](#migration-steps)
* [What changes when migrating](#what-changes-when-migrating)
* [Next steps](#next-steps)
* [For plugin users](#for-plugin-users)
* [For plugin developers](#for-plugin-developers)

Build with Claude Code

Create plugins
==============

Copy page

Create custom plugins to extend Claude Code with skills, agents, hooks, and MCP servers.

Copy page

Plugins let you extend Claude Code with custom functionality that can be shared across projects and teams. This guide covers creating your own plugins with skills, agents, hooks, and MCP servers.
Looking to install existing plugins? See [Discover and install plugins](/docs/en/discover-plugins). For complete technical specifications, see [Plugins reference](/docs/en/plugins-reference).

[​](#when-to-use-plugins-vs-standalone-configuration) When to use plugins vs standalone configuration
-----------------------------------------------------------------------------------------------------

Claude Code supports two ways to add custom skills, agents, and hooks:

| Approach | Skill names | Best for |
| --- | --- | --- |
| **Standalone** (`.claude/` directory) | `/hello` | Personal workflows, project-specific customizations, quick experiments |
| **Plugins** (directories with `.claude-plugin/plugin.json`) | `/plugin-name:hello` | Sharing with teammates, distributing to community, versioned releases, reusable across projects |

**Use standalone configuration when**:

* You’re customizing Claude Code for a single project
* The configuration is personal and doesn’t need to be shared
* You’re experimenting with skills or hooks before packaging them
* You want short skill names like `/hello` or `/review`

**Use plugins when**:

* You want to share functionality with your team or community
* You need the same skills/agents across multiple projects
* You want version control and easy updates for your extensions
* You’re distributing through a marketplace
* You’re okay with namespaced skills like `/my-plugin:hello` (namespacing prevents conflicts between plugins)

Start with standalone configuration in `.claude/` for quick iteration, then [convert to a plugin](#convert-existing-configurations-to-plugins) when you’re ready to share.

[​](#quickstart) Quickstart
---------------------------

This quickstart walks you through creating a plugin with a custom skill. You’ll create a manifest (the configuration file that defines your plugin), add a skill, and test it locally using the `--plugin-dir` flag.

### [​](#prerequisites) Prerequisites

* Claude Code [installed and authenticated](/docs/en/quickstart#step-1-install-claude-code)
* Claude Code version 1.0.33 or later (run `claude --version` to check)

If you don’t see the `/plugin` command, update Claude Code to the latest version. See [Troubleshooting](/docs/en/troubleshooting) for upgrade instructions.

### [​](#create-your-first-plugin) Create your first plugin

1

Create the plugin directory

Every plugin lives in its own directory containing a manifest and your skills, agents, or hooks. Create one now:

Report incorrect code

Copy

Ask AI

```
mkdir my-first-plugin

```

2

Create the plugin manifest

The manifest file at `.claude-plugin/plugin.json` defines your plugin’s identity: its name, description, and version. Claude Code uses this metadata to display your plugin in the plugin manager.Create the `.claude-plugin` directory inside your plugin folder:

Report incorrect code

Copy

Ask AI

```
mkdir my-first-plugin/.claude-plugin

```

Then create `my-first-plugin/.claude-plugin/plugin.json` with this content:

my-first-plugin/.claude-plugin/plugin.json

Report incorrect code

Copy

Ask AI

```
{
"name": "my-first-plugin",
"description": "A greeting plugin to learn the basics",
"version": "1.0.0",
"author": {
"name": "Your Name"
}
}

```

| Field | Purpose |
| --- | --- |
| `name` | Unique identifier and skill namespace. Skills are prefixed with this (e.g., `/my-first-plugin:hello`). |
| `description` | Shown in the plugin manager when browsing or installing plugins. |
| `version` | Track releases using [semantic versioning](/docs/en/plugins-reference#version-management). |
| `author` | Optional. Helpful for attribution. |

For additional fields like `homepage`, `repository`, and `license`, see the [full manifest schema](/docs/en/plugins-reference#plugin-manifest-schema).

3

Add a skill

Skills live in the `skills/` directory. Each skill is a folder containing a `SKILL.md` file. The folder name becomes the skill name, prefixed with the plugin’s namespace (`hello/` in a plugin named `my-first-plugin` creates `/my-first-plugin:hello`).Create a skill directory in your plugin folder:

Report incorrect code

Copy

Ask AI

```
mkdir -p my-first-plugin/skills/hello

```

Then create `my-first-plugin/skills/hello/SKILL.md` with this content:

my-first-plugin/skills/hello/SKILL.md

Report incorrect code

Copy

Ask AI

```
---
description: Greet the user with a friendly message
disable-model-invocation: true
---

Greet the user warmly and ask how you can help them today.

```

4

Test your plugin

Run Claude Code with the `--plugin-dir` flag to load your plugin:

Report incorrect code

Copy

Ask AI

```
claude --plugin-dir ./my-first-plugin

```

Once Claude Code starts, try your new skill:

Report incorrect code

Copy

Ask AI

```
/my-first-plugin:hello

```

You’ll see Claude respond with a greeting. Run `/help` to see your skill listed under the plugin namespace.

**Why namespacing?** Plugin skills are always namespaced (like `/greet:hello`) to prevent conflicts when multiple plugins have skills with the same name.To change the namespace prefix, update the `name` field in `plugin.json`.

5

Add skill arguments

Make your skill dynamic by accepting user input. The `$ARGUMENTS` placeholder captures any text the user provides after the skill name.Update your `SKILL.md` file:

my-first-plugin/skills/hello/SKILL.md

Report incorrect code

Copy

Ask AI

```
---
description: Greet the user with a personalized message
---

# Hello Skill

Greet the user named "$ARGUMENTS" warmly and ask how you can help them today. Make the greeting personal and encouraging.

```

Restart Claude Code to pick up the changes, then try the skill with your name:

Report incorrect code

Copy

Ask AI

```
/my-first-plugin:hello Alex

```

Claude will greet you by name. For more on passing arguments to skills, see [Skills](/docs/en/skills#pass-arguments-to-skills).

You’ve successfully created and tested a plugin with these key components:

* **Plugin manifest** (`.claude-plugin/plugin.json`): describes your plugin’s metadata
* **Skills directory** (`skills/`): contains your custom skills
* **Skill arguments** (`$ARGUMENTS`): captures user input for dynamic behavior

The `--plugin-dir` flag is useful for development and testing. When you’re ready to share your plugin with others, see [Create and distribute a plugin marketplace](/docs/en/plugin-marketplaces).

[​](#plugin-structure-overview) Plugin structure overview
---------------------------------------------------------

You’ve created a plugin with a skill, but plugins can include much more: custom agents, hooks, MCP servers, and LSP servers.

**Common mistake**: Don’t put `commands/`, `agents/`, `skills/`, or `hooks/` inside the `.claude-plugin/` directory. Only `plugin.json` goes inside `.claude-plugin/`. All other directories must be at the plugin root level.

| Directory | Location | Purpose |
| --- | --- | --- |
| `.claude-plugin/` | Plugin root | Contains `plugin.json` manifest (optional if components use default locations) |
| `commands/` | Plugin root | Skills as Markdown files |
| `agents/` | Plugin root | Custom agent definitions |
| `skills/` | Plugin root | Agent Skills with `SKILL.md` files |
| `hooks/` | Plugin root | Event handlers in `hooks.json` |
| `.mcp.json` | Plugin root | MCP server configurations |
| `.lsp.json` | Plugin root | LSP server configurations for code intelligence |
| `settings.json` | Plugin root | Default [settings](/docs/en/settings) applied when the plugin is enabled |

**Next steps**: Ready to add more features? Jump to [Develop more complex plugins](#develop-more-complex-plugins) to add agents, hooks, MCP servers, and LSP servers. For complete technical specifications of all plugin components, see [Plugins reference](/docs/en/plugins-reference).

[​](#develop-more-complex-plugins) Develop more complex plugins
---------------------------------------------------------------

Once you’re comfortable with basic plugins, you can create more sophisticated extensions.

### [​](#add-skills-to-your-plugin) Add Skills to your plugin

Plugins can include [Agent Skills](/docs/en/skills) to extend Claude’s capabilities. Skills are model-invoked: Claude automatically uses them based on the task context.
Add a `skills/` directory at your plugin root with Skill folders containing `SKILL.md` files:

Report incorrect code

Copy

Ask AI

```
my-plugin/
├── .claude-plugin/
│   └── plugin.json
└── skills/
    └── code-review/
        └── SKILL.md

```

Each `SKILL.md` needs frontmatter with `name` and `description` fields, followed by instructions:

Report incorrect code

Copy

Ask AI

```
---
name: code-review
description: Reviews code for best practices and potential issues. Use when reviewing code, checking PRs, or analyzing code quality.
---

When reviewing code, check for:
1. Code organization and structure
2. Error handling
3. Security concerns
4. Test coverage

```

After installing the plugin, restart Claude Code to load the Skills. For complete Skill authoring guidance including progressive disclosure and tool restrictions, see [Agent Skills](/docs/en/skills).

### [​](#add-lsp-servers-to-your-plugin) Add LSP servers to your plugin

For common languages like TypeScript, Python, and Rust, install the pre-built LSP plugins from the official marketplace. Create custom LSP plugins only when you need support for languages not already covered.

LSP (Language Server Protocol) plugins give Claude real-time code intelligence. If you need to support a language that doesn’t have an official LSP plugin, you can create your own by adding an `.lsp.json` file to your plugin:

.lsp.json

Report incorrect code

Copy

Ask AI

```
{
  "go": {
    "command": "gopls",
    "args": ["serve"],
    "extensionToLanguage": {
      ".go": "go"
    }
  }
}

```

Users installing your plugin must have the language server binary installed on their machine.
For complete LSP configuration options, see [LSP servers](/docs/en/plugins-reference#lsp-servers).

### [​](#ship-default-settings-with-your-plugin) Ship default settings with your plugin

Plugins can include a `settings.json` file at the plugin root to apply default configuration when the plugin is enabled. Currently, only the `agent` key is supported.
Setting `agent` activates one of the plugin’s [custom agents](/docs/en/sub-agents) as the main thread, applying its system prompt, tool restrictions, and model. This lets a plugin change how Claude Code behaves by default when enabled.

settings.json

Report incorrect code

Copy

Ask AI

```
{
  "agent": "security-reviewer"
}

```

This example activates the `security-reviewer` agent defined in the plugin’s `agents/` directory. Settings from `settings.json` take priority over `settings` declared in `plugin.json`. Unknown keys are silently ignored.

### [​](#organize-complex-plugins) Organize complex plugins

For plugins with many components, organize your directory structure by functionality. For complete directory layouts and organization patterns, see [Plugin directory structure](/docs/en/plugins-reference#plugin-directory-structure).

### [​](#test-your-plugins-locally) Test your plugins locally

Use the `--plugin-dir` flag to test plugins during development. This loads your plugin directly without requiring installation.

Report incorrect code

Copy

Ask AI

```
claude --plugin-dir ./my-plugin

```

As you make changes to your plugin, restart Claude Code to pick up the updates. Test your plugin components:

* Try your skills with `/plugin-name:skill-name`
* Check that agents appear in `/agents`
* Verify hooks work as expected

You can load multiple plugins at once by specifying the flag multiple times:

Report incorrect code

Copy

Ask AI

```
claude --plugin-dir ./plugin-one --plugin-dir ./plugin-two

```

### [​](#debug-plugin-issues) Debug plugin issues

If your plugin isn’t working as expected:

1. **Check the structure**: Ensure your directories are at the plugin root, not inside `.claude-plugin/`
2. **Test components individually**: Check each command, agent, and hook separately
3. **Use validation and debugging tools**: See [Debugging and development tools](/docs/en/plugins-reference#debugging-and-development-tools) for CLI commands and troubleshooting techniques

### [​](#share-your-plugins) Share your plugins

When your plugin is ready to share:

1. **Add documentation**: Include a `README.md` with installation and usage instructions
2. **Version your plugin**: Use [semantic versioning](/docs/en/plugins-reference#version-management) in your `plugin.json`
3. **Create or use a marketplace**: Distribute through [plugin marketplaces](/docs/en/plugin-marketplaces) for installation
4. **Test with others**: Have team members test the plugin before wider distribution

Once your plugin is in a marketplace, others can install it using the instructions in [Discover and install plugins](/docs/en/discover-plugins).

### [​](#submit-your-plugin-to-the-official-marketplace) Submit your plugin to the official marketplace

To submit a plugin to the official Anthropic marketplace, use one of the in-app submission forms:

* **Claude.ai**: [claude.ai/settings/plugins/submit](https://claude.ai/settings/plugins/submit)
* **Console**: [platform.claude.com/plugins/submit](https://platform.claude.com/plugins/submit)

For complete technical specifications, debugging techniques, and distribution strategies, see [Plugins reference](/docs/en/plugins-reference).

[​](#convert-existing-configurations-to-plugins) Convert existing configurations to plugins
-------------------------------------------------------------------------------------------

If you already have skills or hooks in your `.claude/` directory, you can convert them into a plugin for easier sharing and distribution.

### [​](#migration-steps) Migration steps

1

Create the plugin structure

Create a new plugin directory:

Report incorrect code

Copy

Ask AI

```
mkdir -p my-plugin/.claude-plugin

```

Create the manifest file at `my-plugin/.claude-plugin/plugin.json`:

my-plugin/.claude-plugin/plugin.json

Report incorrect code

Copy

Ask AI

```
{
  "name": "my-plugin",
  "description": "Migrated from standalone configuration",
  "version": "1.0.0"
}

```

2

Copy your existing files

Copy your existing configurations to the plugin directory:

Report incorrect code

Copy

Ask AI

```
# Copy commands
cp -r .claude/commands my-plugin/

# Copy agents (if any)
cp -r .claude/agents my-plugin/

# Copy skills (if any)
cp -r .claude/skills my-plugin/

```

3

Migrate hooks

If you have hooks in your settings, create a hooks directory:

Report incorrect code

Copy

Ask AI

```
mkdir my-plugin/hooks

```

Create `my-plugin/hooks/hooks.json` with your hooks configuration. Copy the `hooks` object from your `.claude/settings.json` or `settings.local.json`, since the format is the same. The command receives hook input as JSON on stdin, so use `jq` to extract the file path:

my-plugin/hooks/hooks.json

Report incorrect code

Copy

Ask AI

```
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [{ "type": "command", "command": "jq -r '.tool_input.file_path' | xargs npm run lint:fix" }]
      }
    ]
  }
}

```

4

Test your migrated plugin

Load your plugin to verify everything works:

Report incorrect code

Copy

Ask AI

```
claude --plugin-dir ./my-plugin

```

Test each component: run your commands, check agents appear in `/agents`, and verify hooks trigger correctly.

### [​](#what-changes-when-migrating) What changes when migrating

| Standalone (`.claude/`) | Plugin |
| --- | --- |
| Only available in one project | Can be shared via marketplaces |
| Files in `.claude/commands/` | Files in `plugin-name/commands/` |
| Hooks in `settings.json` | Hooks in `hooks/hooks.json` |
| Must manually copy to share | Install with `/plugin install` |

After migrating, you can remove the original files from `.claude/` to avoid duplicates. The plugin version will take precedence when loaded.

[​](#next-steps) Next steps
---------------------------

Now that you understand Claude Code’s plugin system, here are suggested paths for different goals:

### [​](#for-plugin-users) For plugin users

* [Discover and install plugins](/docs/en/discover-plugins): browse marketplaces and install plugins
* [Configure team marketplaces](/docs/en/discover-plugins#configure-team-marketplaces): set up repository-level plugins for your team

### [​](#for-plugin-developers) For plugin developers

* [Create and distribute a marketplace](/docs/en/plugin-marketplaces): package and share your plugins
* [Plugins reference](/docs/en/plugins-reference): complete technical specifications
* Dive deeper into specific plugin components:
  + [Skills](/docs/en/skills): skill development details
  + [Subagents](/docs/en/sub-agents): agent configuration and capabilities
  + [Hooks](/docs/en/hooks): event handling and automation
  + [MCP](/docs/en/mcp): external tool integration

Was this page helpful?

YesNo

[Run agent teams](/docs/en/agent-teams)[Discover and install prebuilt plugins](/docs/en/discover-plugins)

Ctrl+I

[Claude Code Docs home page

![web_image](https://mintcdn.com/claude-code/TBPmHzr19mDCuhZi/logo/light.svg?fit=max&auto=format&n=TBPmHzr19mDCuhZi&q=85&s=d535f2e20f53cd911acc59ad1b64b2e0)

![web_image](https://mintcdn.com/claude-code/TBPmHzr19mDCuhZi/logo/dark.svg?fit=max&auto=format&n=TBPmHzr19mDCuhZi&q=85&s=28e49a2ffe69101f4aae9bfa70b393d0)](/docs)

[x](https://x.com/AnthropicAI)[linkedin](https://www.linkedin.com/company/anthropicresearch)

Company

[Anthropic](https://www.anthropic.com/company)[Careers](https://www.anthropic.com/careers)[Economic Futures](https://www.anthropic.com/economic-futures)[Research](https://www.anthropic.com/research)[News](https://www.anthropic.com/news)[Trust center](https://trust.anthropic.com/)[Transparency](https://www.anthropic.com/transparency)

Help and security

[Availability](https://www.anthropic.com/supported-countries)[Status](https://status.anthropic.com/)[Support center](https://support.claude.com/)

Learn

[Courses](https://www.anthropic.com/learn)[MCP connectors](https://claude.com/partners/mcp)[Customer stories](https://www.claude.com/customers)[Engineering blog](https://www.anthropic.com/engineering)[Events](https://www.anthropic.com/events)[Powered by Claude](https://claude.com/partners/powered-by-claude)[Service partners](https://claude.com/partners/services)[Startups program](https://claude.com/programs/startups)

Terms and policies

[Privacy policy](https://www.anthropic.com/legal/privacy)[Disclosure policy](https://www.anthropic.com/responsible-disclosure-policy)[Usage policy](https://www.anthropic.com/legal/aup)[Commercial terms](https://www.anthropic.com/legal/commercial-terms)[Consumer terms](https://www.anthropic.com/legal/consumer-terms)

Assistant

Responses are generated using AI and may contain mistakes.

# Reference
- [1] [Skip to main content](#content-area)
- [2] [web_image](https://mintcdn.com/claude-code/TBPmHzr19mDCuhZi/logo/light.svg?fit=max&auto=format&n=TBPmHzr19mDCuhZi&q=85&s=d535f2e20f53cd911acc59ad1b64b2e0)
- [3] [web_image](https://mintcdn.com/claude-code/TBPmHzr19mDCuhZi/logo/dark.svg?fit=max&auto=format&n=TBPmHzr19mDCuhZi&q=85&s=28e49a2ffe69101f4aae9bfa70b393d0)
- [4] [web_image](https://d3gk2c5xim1je2.cloudfront.net/flags/US.svg)
- [5] [Claude Developer Platform](https://platform.claude.com/)
- [6] [Claude Code on the Web](https://claude.ai/code)
- [7] [Claude Code on the Web](https://claude.ai/code)
- [8] [Getting started](/docs/en/overview)
- [9] [Build with Claude Code](/docs/en/sub-agents)
- [10] [Deployment](/docs/en/third-party-integrations)
- [11] [Administration](/docs/en/setup)
- [12] [Configuration](/docs/en/settings)
- [13] [Reference](/docs/en/cli-reference)
- [14] [Resources](/docs/en/legal-and-compliance)
- [15] [Create custom subagents](/docs/en/sub-agents)
- [16] [Run agent teams](/docs/en/agent-teams)
- [17] [Create plugins](/docs/en/plugins)
- [18] [Discover and install prebuilt plugins](/docs/en/discover-plugins)
- [19] [Extend Claude with skills](/docs/en/skills)
- [20] [Output styles](/docs/en/output-styles)
- [21] [Automate with hooks](/docs/en/hooks-guide)
- [22] [Programmatic usage](/docs/en/headless)
- [23] [Model Context Protocol (MCP)](/docs/en/mcp)
- [24] [Troubleshooting](/docs/en/troubleshooting)
- [25] [When to use plugins vs standalone configuration](#when-to-use-plugins-vs-standalone-configuration)
- [26] [Quickstart](#quickstart)
- [27] [Prerequisites](#prerequisites)
- [28] [Create your first plugin](#create-your-first-plugin)
- [29] [Plugin structure overview](#plugin-structure-overview)
- [30] [Develop more complex plugins](#develop-more-complex-plugins)
- [31] [Add Skills to your plugin](#add-skills-to-your-plugin)
- [32] [Add LSP servers to your plugin](#add-lsp-servers-to-your-plugin)
- [33] [Ship default settings with your plugin](#ship-default-settings-with-your-plugin)
- [34] [Organize complex plugins](#organize-complex-plugins)
- [35] [Test your plugins locally](#test-your-plugins-locally)
- [36] [Debug plugin issues](#debug-plugin-issues)
- [37] [Share your plugins](#share-your-plugins)
- [38] [Submit your plugin to the official marketplace](#submit-your-plugin-to-the-official-marketplace)
- [39] [Convert existing configurations to plugins](#convert-existing-configurations-to-plugins)
- [40] [Migration steps](#migration-steps)
- [41] [What changes when migrating](#what-changes-when-migrating)
- [42] [Next steps](#next-steps)
- [43] [For plugin users](#for-plugin-users)
- [44] [For plugin developers](#for-plugin-developers)
- [45] [Discover and install plugins](/docs/en/discover-plugins)
- [46] [Plugins reference](/docs/en/plugins-reference)
- [47] [​](#when-to-use-plugins-vs-standalone-configuration)
- [48] [convert to a plugin](#convert-existing-configurations-to-plugins)
- [49] [​](#quickstart)
- [50] [​](#prerequisites)
- [51] [installed and authenticated](/docs/en/quickstart#step-1-install-claude-code)
- [52] [Troubleshooting](/docs/en/troubleshooting)
- [53] [​](#create-your-first-plugin)
- [54] [semantic versioning](/docs/en/plugins-reference#version-management)
- [55] [full manifest schema](/docs/en/plugins-reference#plugin-manifest-schema)
- [56] [Skills](/docs/en/skills#pass-arguments-to-skills)
- [57] [Create and distribute a plugin marketplace](/docs/en/plugin-marketplaces)
- [58] [​](#plugin-structure-overview)
- [59] [settings](/docs/en/settings)
- [60] [Develop more complex plugins](#develop-more-complex-plugins)
- [61] [Plugins reference](/docs/en/plugins-reference)
- [62] [​](#develop-more-complex-plugins)
- [63] [​](#add-skills-to-your-plugin)
- [64] [Agent Skills](/docs/en/skills)
- [65] [Agent Skills](/docs/en/skills)
- [66] [​](#add-lsp-servers-to-your-plugin)
- [67] [LSP servers](/docs/en/plugins-reference#lsp-servers)
- [68] [​](#ship-default-settings-with-your-plugin)
- [69] [custom agents](/docs/en/sub-agents)
- [70] [​](#organize-complex-plugins)
- [71] [Plugin directory structure](/docs/en/plugins-reference#plugin-directory-structure)
- [72] [​](#test-your-plugins-locally)
- [73] [​](#debug-plugin-issues)
- [74] [Debugging and development tools](/docs/en/plugins-reference#debugging-and-development-tools)
- [75] [​](#share-your-plugins)
- [76] [semantic versioning](/docs/en/plugins-reference#version-management)
- [77] [plugin marketplaces](/docs/en/plugin-marketplaces)
- [78] [Discover and install plugins](/docs/en/discover-plugins)
- [79] [​](#submit-your-plugin-to-the-official-marketplace)
- [80] [claude.ai/settings/plugins/submit](https://claude.ai/settings/plugins/submit)
- [81] [platform.claude.com/plugins/submit](https://platform.claude.com/plugins/submit)
- [82] [Plugins reference](/docs/en/plugins-reference)
- [83] [​](#convert-existing-configurations-to-plugins)
- [84] [​](#migration-steps)
- [85] [​](#what-changes-when-migrating)
- [86] [​](#next-steps)
- [87] [​](#for-plugin-users)
- [88] [Discover and install plugins](/docs/en/discover-plugins)
- [89] [Configure team marketplaces](/docs/en/discover-plugins#configure-team-marketplaces)
- [90] [​](#for-plugin-developers)
- [91] [Create and distribute a marketplace](/docs/en/plugin-marketplaces)
- [92] [Plugins reference](/docs/en/plugins-reference)
- [93] [Skills](/docs/en/skills)
- [94] [Subagents](/docs/en/sub-agents)
- [95] [Hooks](/docs/en/hooks)
- [96] [MCP](/docs/en/mcp)
- [97] [Run agent teams](/docs/en/agent-teams)
- [98] [Discover and install prebuilt plugins](/docs/en/discover-plugins)
- [99] [web_image](https://mintcdn.com/claude-code/TBPmHzr19mDCuhZi/logo/light.svg?fit=max&auto=format&n=TBPmHzr19mDCuhZi&q=85&s=d535f2e20f53cd911acc59ad1b64b2e0)
- [100] [web_image](https://mintcdn.com/claude-code/TBPmHzr19mDCuhZi/logo/dark.svg?fit=max&auto=format&n=TBPmHzr19mDCuhZi&q=85&s=28e49a2ffe69101f4aae9bfa70b393d0)
- [101] [x](https://x.com/AnthropicAI)
- [102] [linkedin](https://www.linkedin.com/company/anthropicresearch)
- [103] [Anthropic](https://www.anthropic.com/company)
- [104] [Careers](https://www.anthropic.com/careers)
- [105] [Economic Futures](https://www.anthropic.com/economic-futures)
- [106] [Research](https://www.anthropic.com/research)
- [107] [News](https://www.anthropic.com/news)
- [108] [Trust center](https://trust.anthropic.com/)
- [109] [Transparency](https://www.anthropic.com/transparency)
- [110] [Availability](https://www.anthropic.com/supported-countries)
- [111] [Status](https://status.anthropic.com/)
- [112] [Support center](https://support.claude.com/)
- [113] [Courses](https://www.anthropic.com/learn)
- [114] [MCP connectors](https://claude.com/partners/mcp)
- [115] [Customer stories](https://www.claude.com/customers)
- [116] [Engineering blog](https://www.anthropic.com/engineering)
- [117] [Events](https://www.anthropic.com/events)
- [118] [Powered by Claude](https://claude.com/partners/powered-by-claude)
- [119] [Service partners](https://claude.com/partners/services)
- [120] [Startups program](https://claude.com/programs/startups)
- [121] [Privacy policy](https://www.anthropic.com/legal/privacy)
- [122] [Disclosure policy](https://www.anthropic.com/responsible-disclosure-policy)
- [123] [Usage policy](https://www.anthropic.com/legal/aup)
- [124] [Commercial terms](https://www.anthropic.com/legal/commercial-terms)
- [125] [Consumer terms](https://www.anthropic.com/legal/consumer-terms)
