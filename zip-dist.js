// scripts/zip-dist.js
import { zip } from "cross-zip";
import path from "path";
import fs from "fs";

async function run() {
  const distPath = path.resolve(process.cwd(), "dist");
  if (!fs.existsSync(distPath)) {
    console.error("dist 目录不存在，请先执行 vite build");
    process.exit(1);
  }

  // 生成 YYYYMMDD_HHMMSS 时间戳
  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  const timestamp =
    [now.getFullYear(), pad(now.getMonth() + 1), pad(now.getDate())].join("") +
    "_" +
    [pad(now.getHours()), pad(now.getMinutes()), pad(now.getSeconds())].join(
      ""
    );

  const zipName = `dist_${timestamp}.zip`;
  const outPath = path.resolve(process.cwd(), zipName);

  try {
    await zip(distPath, outPath);
    console.log(`✅ 已生成压缩包：${zipName}`);
  } catch (err) {
    console.error("❌ 压缩失败", err);
    process.exit(1);
  }
}

run();
