# 构建插件

Cursor 插件可以打包并分发规则、技能、智能体、命令、MCP 服务器和钩子。安装后，插件可在 Cursor 的所有界面中使用：IDE、命令行界面（CLI）和 Cloud。

如果你是从零开始，可以使用[插件模板仓库](https://github.com/cursor/plugin-template)。其中包含所需的目录结构和入门文件。

## 插件结构

插件是一个目录，其中包含清单文件和插件资源：

```
my-plugin/
├── .cursor-plugin/
│   └── plugin.json        # 必需：插件清单
├── rules/                 # Cursor 规则（.mdc 文件）
│   ├── coding-standards.mdc
│   └── review-checklist.mdc
├── skills/                # Agent 技能
│   └── code-reviewer/
│       └── SKILL.md
├── agents/                # 自定义 Agent 配置
│   └── security-reviewer.md
├── commands/              # Agent 可执行命令
│   └── deploy.md
├── hooks/                 # Hook 定义
│   └── hooks.json
├── .mcp.json              # MCP 服务器定义
├── assets/                # 徽标和静态资源
│   └── logo.svg
├── scripts/               # Hook 和实用脚本
│   └── format-code.py
└── README.md
```

## 插件清单

每个插件都需要一个 `.cursor-plugin/plugin.json` 清单文件。

### 必填字段

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| `name` | string | 插件标识符。使用全小写的 kebab-case 格式（字母数字字符、连字符和句点），且必须以字母数字字符开头和结尾。示例：`my-plugin`、`prompts.chat` |

### 可选字段

| Field | Type | Description |
| --- | --- | --- |
| `description` | string | 插件的简要描述 |
| `version` | string | 语义版本号（例如 `1.0.0`） |
| `author` | object | 作者信息：`name`（必填）、`email`（可选） |
| `homepage` | string | 插件主页的 URL |
| `repository` | string | 插件代码仓库的 URL |
| `license` | string | 许可证标识符（例如 `MIT`） |
| `keywords` | array | 用于发现和分类的标签 |
| `logo` | string | 仓库中 logo 文件的相对路径（例如 `assets/logo.svg`），或绝对 URL。相对路径会解析为指向 `raw.githubusercontent.com` 的 URL。推荐做法：将 logo 提交到仓库并使用相对路径。 |
| `rules` | string or array | 规则文件或目录的路径 |
| `agents` | string or array | agent 文件或目录的路径 |
| `skills` | string or array | skill 目录的路径 |
| `commands` | string or array | 命令文件或目录的路径 |
| `hooks` | string or object | hooks 配置文件路径，或内联 hooks 配置 |
| `mcpServers` | string, object, or array | MCP 配置文件路径、内联 MCP 服务器配置，或由二者组成的数组。会覆盖默认的 `.mcp.json` 发现机制。 |

### 清单示例

```
{
  "name": "enterprise-plugin",
  "version": "1.2.0",
  "description": "Enterprise development tools with security scanning and compliance checks",
  "author": {
    "name": "ACME DevTools",
    "email": "devtools@acme.com"
  },
  "keywords": ["enterprise", "security", "compliance"],
  "logo": "assets/logo.svg"
}
```

## 组件发现

当清单未为某个组件类型指定明确路径时，解析器会使用**基于文件夹的自动发现**：

| Component | Default location | How it's discovered |
| --- | --- | --- |
| Skills | `skills/` | 每个包含 `SKILL.md` 文件的子目录 |
| Rules | `rules/` | 所有 `.md`、`.mdc` 或 `.markdown` 文件 |
| Agents | `agents/` | 所有 `.md`、`.mdc` 或 `.markdown` 文件 |
| Commands | `commands/` | 所有 `.md`、`.mdc`、`.markdown` 或 `.txt` 文件 |
| Hooks | `hooks/hooks.json` | 解析以获取 hook 事件名 |
| MCP Servers | `.mcp.json` | 解析以获取服务器条目 |
| Root Skill | 插件根目录下的 `SKILL.md` | 视为单技能插件（仅当不存在 `skills/` 目录且清单中没有 `skills` 字段时） |

如果在清单中**指定**了某个字段（例如 `"skills": "./my-skills/"`），它会**替代**该组件的文件夹发现逻辑，默认文件夹将不会再被扫描。

## 编写规则

规则是为 AI 提供持久性指引的 `.mdc` 文件。将它们放在 `rules/` 目录中。

规则需要在开头包含带有元数据的 YAML frontmatter：

rules/prefer-const.mdc

```
---
description: Prefer const over let for variables that are never reassigned
alwaysApply: true
---

prefer-const: Always use `const` for variables that are never reassigned.
Only use `let` when the variable needs to be reassigned. Never use `var`.
```

### 规则 frontmatter 字段

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| `description` | string | 对该规则功能的简要说明 |
| `alwaysApply` | boolean | 若为 `true`，该规则适用于所有文件；若为 `false`，该规则仅在请求时可用。 |
| `globs` | string 或 array | 该规则适用的文件匹配模式（例如 `"**/*.ts"`） |

在 Cursor Agent 中使用 `/create-rule` 来生成带有正确 frontmatter 的规则。

完整文档请参见 [Rules](/docs/context/rules)。

## 编写技能

技能是在 `SKILL.md` 文件中定义的专用功能。每个技能都位于 `skills/` 目录下各自的子目录中。

技能需要在文件头添加包含元数据的 YAML frontmatter：

skills/api-designer/SKILL.md

```
---
name: api-designer
description: Design RESTful APIs following OpenAPI 3.0 specification.
  Use when designing new API endpoints, reviewing API contracts,
  or generating API documentation.
---

# API Designer Skill

## When to use

- Designing new API endpoints
- Reviewing API contracts
- Generating API documentation

## Instructions

1. Follow REST conventions for resource naming
2. Use appropriate HTTP methods (GET, POST, PUT, DELETE, PATCH)
3. Include proper error responses with standard HTTP status codes
4. Document all endpoints with OpenAPI 3.0 specification
5. Use consistent naming conventions (kebab-case for URLs, camelCase for JSON)
```

### Skill frontmatter 字段

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| `name` | string | Skill 标识符（小写、kebab-case） |
| `description` | string | 描述该 skill 的功能以及适用场景 |

在 Cursor agent 中使用 `/create-skill` 生成包含正确 frontmatter 的 skills。

完整文档请参见 [Agent Skills](/docs/context/skills)。

## 编写 Agent

Agent 是通过 Markdown 文件定义自定义行为和提示词的。将这些文件放在 `agents/` 目录中。

Agent 需要在文件头部使用带有元数据的 YAML frontmatter：

agents/security-reviewer.md

```
---
name: security-reviewer
description: Security-focused code reviewer that checks for
  vulnerabilities and proven approaches
---

# Security Reviewer

You are a security-focused code reviewer. When reviewing code:

1. Check for injection vulnerabilities (SQL, XSS, command injection)
2. Verify proper authentication and authorization
3. Look for sensitive data exposure (API keys, passwords, PII)
4. Ensure secure cryptographic practices
5. Review dependency security and known vulnerabilities
6. Check for proper input validation and sanitization
```

### Agent 前置元数据字段

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| `name` | string | Agent 标识符（小写、kebab-case） |
| `description` | string | 对 Agent 用途的简要描述 |

在 Cursor Agent 中使用 `/create-agent` 来生成带有正确前置元数据的 Agent。

## 编写命令

命令是定义 Agent 可执行操作的 Markdown 或纯文本文件。将它们放在 `commands/` 目录中。

命令支持 `.md`、`.mdc`、`.markdown` 和 `.txt` 扩展名。这些文件可以包含 YAML frontmatter：

commands/deploy-staging.md

```
---
name: deploy-staging
description: 将当前分支部署到预发布环境
---

# 部署到预发布环境

部署到预发布环境的步骤：
1. 运行测试
2. 构建项目
3. 推送到预发布分支
```

### 命令 Frontmatter 字段

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| `name` | string | 命令标识（小写、kebab-case） |
| `description` | string | 对该命令功能的简要描述 |

## 编写 Hooks

Hooks 是由 Agent 事件触发的自动化脚本。在 `hooks/hooks.json` 中定义它们：

hooks/hooks.json

```
{
  "hooks": {
    "afterFileEdit": [
      {
        "command": "./scripts/format-code.sh"
      }
    ],
    "beforeShellExecution": [
      {
        "command": "./scripts/validate-shell.sh",
        "matcher": "rm|curl|wget"
      }
    ],
    "sessionEnd": [
      {
        "command": "./scripts/audit.sh"
      }
    ]
  }
}
```

**可用的 Hook 事件包括：**

* **Agent hooks**：`sessionStart`、`sessionEnd`、`preToolUse`、`postToolUse`、`postToolUseFailure`、`subagentStart`、`subagentStop`、`beforeShellExecution`、`afterShellExecution`、`beforeMCPExecution`、`afterMCPExecution`、`beforeReadFile`、`afterFileEdit`、`beforeSubmitPrompt`、`preCompact`、`stop`、`afterAgentResponse`、`afterAgentThought`
* **Tab hooks**：`beforeTabFileRead`、`afterTabFileEdit`

完整文档请参见 [Hooks](/docs/agent/hooks)。

## MCP 服务器

插件根目录下的 `.mcp.json` 文件会被自动识别。只有在使用自定义路径或内联配置时，才需要在 `plugin.json` 中指定 `mcpServers` 字段。

MCP 配置文件应在 `mcpServers` 键下包含服务器配置项：

.mcp.json

```
{
  "mcpServers": {
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": {
        "POSTGRES_CONNECTION_STRING": "${POSTGRES_URL}"
      }
    }
  }
}
```

完整文档请参阅 [Model Context Protocol (MCP)](/docs/context/mcp)。

## Logo

将 logo 提交到仓库，并通过相对路径引用：

```
{
  "name": "my-plugin",
  "logo": "assets/logo.svg"
}
```

相对路径会根据仓库和提交 SHA 被解析为指向 `raw.githubusercontent.com` 的 URL。比如，在提交 `abc123` 的 `acme/plugins` 仓库中的 `assets/logo.svg` 将解析为：

```
https://raw.githubusercontent.com/acme/plugins/abc123/my-plugin/assets/logo.svg
```

也支持 GitHub 用户内容的绝对 URL（以 `http://` 或 `https://` 开头）。

## 多插件仓库

单个 Git 仓库可以通过 **marketplace manifest** 包含多个插件。将该文件放在仓库根目录下的 `.cursor-plugin/marketplace.json`。

### 插件市场清单格式

```
{
  "name": "my-marketplace",
  "owner": {
    "name": "Your Org",
    "email": "plugins@yourorg.com"
  },
  "metadata": {
    "description": "A collection of developer tool plugins"
  },
  "plugins": [
    {
      "name": "plugin-one",
      "source": "plugin-one",
      "description": "First plugin"
    },
    {
      "name": "plugin-two",
      "source": "plugin-two",
      "description": "Second plugin"
    }
  ]
}
```

### Marketplace 字段

| Field | Type | Description |
| --- | --- | --- |
| `name` | string | **(必填)** Marketplace 标识符（kebab-case） |
| `owner` | object | **(必填)** `name`（必填）、`email`（可选） |
| `plugins` | array | **(必填)** 插件条目数组（最多 500 个） |
| `metadata` | object | 可选。`description`、`version`、`pluginRoot`（所有插件源文件的统一前缀路径） |

### 插件条目字段

`plugins` 数组中的每个条目支持：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `name` | string | **（必填）** 插件标识符（kebab-case） |
| `source` | string or object | 插件目录路径，或包含 `path` 和其他选项的对象 |
| `description` | string | 插件描述 |
| `version` | string | 语义版本号 |
| `author` | object | 作者信息 |
| `homepage` | string | URL |
| `repository` | string | URL |
| `license` | string | 许可证标识符 |
| `keywords` | array | 搜索标签 |
| `logo` | string | 指向 logo 的相对路径或 URL |
| `category` | string | 插件分类 |
| `tags` | array | 其他标签 |
| `skills`, `rules`, `agents`, `commands` | string or array | 组件文件路径 |
| `hooks` | string or object | hooks 配置路径或内联配置 |
| `mcpServers` | string or object | MCP 配置路径或内联配置 |

### 解析机制

对于一个在插件市场中带有 `"source": "my-plugin"` 的条目：

1. 解析器会查找 `my-plugin/.cursor-plugin/plugin.json`
2. 如果找到，该插件的 manifest 会与市场条目合并（以 manifest 中的值为准）
3. 在 `my-plugin/` 目录内执行组件发现：如果 manifest 中指定了路径则按该路径，否则回退为基于目录的发现方式

### [多插件示例仓库](#-13)

```
my-plugins/
├── .cursor-plugin/
│   └── marketplace.json       # Lists all plugins
├── eslint-rules/
│   ├── .cursor-plugin/
│   │   └── plugin.json        # 单个插件的配置清单
│   └── rules/
│       ├── prefer-const.mdc
│       └── no-any.mdc
├── docker/
│   ├── .cursor-plugin/
│   │   └── plugin.json
│   ├── skills/
│   │   ├── containerize-app/
│   │   │   └── SKILL.md
│   │   └── setup-docker-compose/
│   │       └── SKILL.md
│   └── .mcp.json
└── README.md
```

[插件示例](#-14)
------------

### [纯规则插件](#-15)

```
eslint-rules/
├── .cursor-plugin/
│   └── plugin.json
└── rules/
    ├── prefer-const.mdc
    ├── no-any.mdc
    └── error-handling.mdc
```

plugin.json

```
{
  "name": "eslint-rules",
  "description": "ESLint-inspired coding rules for TypeScript",
  "author": { "name": "Your Name" },
  "keywords": ["eslint", "typescript", "linting"]
}
```

### [技能插件](#-16)

```
code-review-skills/
├── .cursor-plugin/
│   └── plugin.json
└── skills/
    ├── security-review/
    │   └── SKILL.md
    └── performance-audit/
        ├── SKILL.md
        └── scripts/
            └── analyze.py
```

plugin.json

```
{
  "name": "code-review-skills",
  "description": "安全和性能代码审查的高级技能",
  "author": { "name": "Your Name" },
  "keywords": ["code-review", "security", "performance"]
}
```

### [仅限 MCP 的插件](#mcp-1)

```
database-mcp/
├── .cursor-plugin/
│   └── plugin.json
└── .mcp.json
```

plugin.json

```
{
  "name": "database-mcp",
  "description": "用于数据库交互的 MCP 服务器",
  "author": { "name": "Your Name" }
}
```

### [功能齐全的插件](#-17)

```
enterprise-toolkit/
├── .cursor-plugin/
│   └── plugin.json
├── assets/
│   └── logo.svg
├── rules/
│   ├── security-standards.mdc
│   └── code-style.mdc
├── skills/
│   └── compliance-check/
│       └── SKILL.md
├── agents/
│   ├── security-reviewer.md
│   ├── performance-tester.md
│   └── compliance-checker.md
├── commands/
│   └── run-compliance-scan.md
├── hooks/
│   └── hooks.json
├── .mcp.json
├── scripts/
│   ├── security-scan.sh
│   └── format-code.py
└── README.md
```

plugin.json

```
{
  "name": "enterprise-toolkit",
  "version": "2.0.0",
  "description": "完整的企业开发工具包,提供安全、合规和自动化功能",
  "author": {
    "name": "ACME DevTools",
    "email": "devtools@acme.com"
  },
  "keywords": ["enterprise", "security", "compliance"],
  "logo": "assets/logo.svg"
}
```

[提交插件](#-18)
------------

插件会由 Cursor 团队进行审核，以保持高质量标准。要提交插件：

1

### 创建插件

按照本指南的结构进行操作。确保你的插件包含有效的 `.cursor-plugin/plugin.json` 清单文件。

2

### 托管到 Git 仓库

将插件推送到公开的 Git 仓库。建议将插件的徽标一并提交到仓库中（可选但推荐）。

3

### 提交插件

前往 [cursor.com/marketplace/publish](https://cursor.com/marketplace/publish) 并提交你的仓库链接。

团队会审核你的提交，并将其发布到[插件市场](https://cursor.com/marketplace)。

### [提交前检查清单](#-19)

* 插件包含有效的 `.cursor-plugin/plugin.json` 清单文件
* `name` 唯一、全小写，使用 kebab-case 命名（如 `my-awesome-plugin`）
* `description` 清晰说明插件用途
* 所有 rules、skills、agents 和 commands 都包含完整的 frontmatter 元数据
* Logo 已提交到仓库，并通过相对路径引用（如有提供）
* `README.md` 说明了用法及所有配置项
* 清单中的所有路径均为相对路径且有效（不包含 `..`，不使用绝对路径）
* 插件已在本地完成测试
* 对于多插件仓库：`.cursor-plugin/marketplace.json` 位于仓库根目录，其中的插件名称必须全部唯一

[指南](#-20)
----------

1. **让插件聚焦单一目标。** 专注把一件事做好，而不是捆绑不相关的功能。
2. **完善文档。** 提供清晰的 README，并包含使用示例。
3. **使用语义化版本号。** 按照语义化版本规范（semver）管理版本号。
4. **添加合适的 frontmatter。** 所有 rules、skills、agents 和 commands 都需要元数据。
5. **先在本地测试。** 在提交前确认插件可以正常工作。
6. **使用具描述性的关键词。** 帮助用户更容易发现你的插件。
7. **提交你的 logo。** 将 SVG 推送到仓库，并通过路径引用它。

简体中文

* English
* 简体中文
* 日本語
* 繁體中文
* Español
* Français
* Português
* 한국어
* Русский
* Türkçe
* Bahasa Indonesia
* Deutsch

* [插件结构](#)
* [插件清单](#-1)
* [必填字段](#-2)
* [可选字段](#-3)
* [清单示例](#-4)
* [组件发现](#-5)
* [编写规则](#-6)
* [规则 frontmatter 字段](#frontmatter)
* [编写技能](#-7)
* [Skill frontmatter 字段](#skill-frontmatter)
* [编写 Agent](#agent)
* [Agent 前置元数据字段](#agent-1)
* [编写命令](#-8)
* [命令 Frontmatter 字段](#frontmatter-1)
* [编写 Hooks](#hooks)
* [MCP 服务器](#mcp)
* [Logo](#logo)
* [多插件仓库](#-9)
* [插件市场清单格式](#-10)
* [Marketplace 字段](#marketplace)
* [插件条目字段](#-11)
* [解析机制](#-12)
* [多插件示例仓库](#-13)
* [插件示例](#-14)
* [纯规则插件](#-15)
* [技能插件](#-16)
* [仅限 MCP 的插件](#mcp-1)
* [功能齐全的插件](#-17)
* [提交插件](#-18)
* [提交前检查清单](#-19)
* [指南](#-20)

复制页面

分享反馈

详细说明

Agent

Sonnet 4.6

Tokenizer Off上下文： 0/200k (0%)

Open chat

# Reference
- [126] [欢迎](/docs)
- [127] [概述](/docs/agent/overview)
- [128] [规则](/docs/context/rules)
- [129] [Tab](/docs/tab/overview)
- [130] [Slack](/docs/integrations/slack)
- [131] [忽略文件](/docs/context/ignore-files)
- [132] [智能体工作流](/docs/cookbook/agent-workflows)
