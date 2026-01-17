# EdgeOne Pages 部署指南

本项目已适配腾讯云 EdgeOne Pages 部署。

## 部署步骤

1. **准备文件**：
   - 项目根目录下已生成 `edgeone-dist` 文件夹，其中包含了适配 EdgeOne Pages 的函数文件 (`functions/[[path]].js`)。

2. **创建项目**：
   - 登录 [腾讯云 EdgeOne 控制台](https://console.cloud.tencent.com/edgeone)。
   - 进入 Pages 页面，点击“新建项目”。
   - 选择“上传文件夹”或连接 Git 仓库。
   - 如果使用“上传文件夹”，请上传 `edgeone-dist` 文件夹。

3. **配置环境变量**：
   在部署设置或项目设置中，添加以下环境变量（参考 `wrangler.jsonc`）：

   | 变量名 | 描述 | 示例 |
   |List |---|---|
   | `proxy_url` | 代理服务器域名（必须是 HTTPS） | `https://cc.0721030.xyz` |
   | `token_prefix` | 访问密码前缀（首尾斜杠必须保留） | `/peroe/` |

4. **部署**：
   - 点击部署按钮，等待部署完成。

## 注意事项

- 本项目使用了 Cloudflare Workers 的 `nodejs_compat` 特性。EdgeOne Pages 通常兼容大部分 Node.js API，如果遇到兼容性问题，请检查日志。
- 由于源码经过混淆，本适配基于构建后的 `_worker.js` 文件。
