#!/usr/bin/env python3
"""
TRAE Database File Collector

收集 TRAE 不同版本的数据库文件，用于离线分析。
一次性拷贝所有数据库文件到指定目录。

支持的操作系统：
- macOS (Darwin)
- Windows
- Linux
"""

import getpass
import os
import platform
import shutil
import json
from datetime import datetime
from pathlib import Path
from typing import Dict, List, Optional

TRAE_VARIANTS = [
    "Trae",
    "Trae CN",
]


def get_username() -> str:
    try:
        return getpass.getuser()
    except Exception:
        return os.environ.get("USER", os.environ.get("USERNAME", "unknown"))


def get_application_support_path() -> Optional[Path]:
    """
    获取不同操作系统的应用数据路径

    macOS: ~/Library/Application Support/
    Windows: %APPDATA%/ (通常是 C:\\Users\\<user>\\AppData\\Roaming\\)
    Linux: ~/.config/
    """
    system = platform.system()

    if system == "Darwin":
        return Path.home() / "Library" / "Application Support"
    elif system == "Windows":
        appdata = os.environ.get("APPDATA")
        if appdata:
            return Path(appdata)
        return Path.home() / "AppData" / "Roaming"
    elif system == "Linux":
        xdg_config = os.environ.get("XDG_CONFIG_HOME")
        if xdg_config:
            return Path(xdg_config)
        return Path.home() / ".config"
    else:
        return None


def find_trae_databases(app_support: Path) -> Dict[str, Path]:
    """在指定目录下查找 TRAE 数据库"""
    databases = {}

    for variant in TRAE_VARIANTS:
        db_path = app_support / variant / "ModularData" / "ai-agent" / "database.db"
        if db_path.exists():
            databases[variant] = db_path

    return databases


def ask_for_custom_path() -> Optional[Path]:
    """询问用户自定义路径"""
    print("\n" + "-" * 60)
    print("未找到 TRAE 数据库文件。")
    print("-" * 60)
    print("\n请提供 TRAE 应用数据目录的路径。")
    print("例如:")
    print("  macOS:   ~/Library/Application Support")
    print("  Windows: C:\\Users\\<用户名>\\AppData\\Roaming")
    print("  Linux:   ~/.config")
    print("\n输入 'q' 退出\n")

    while True:
        user_input = input("请输入路径: ").strip()

        if user_input.lower() == "q":
            return None

        if not user_input:
            print("路径不能为空，请重新输入。")
            continue

        path = Path(user_input).expanduser()

        if not path.exists():
            print(f"路径不存在: {path}")
            print("请重新输入。\n")
            continue

        if not path.is_dir():
            print(f"路径不是目录: {path}")
            print("请重新输入。\n")
            continue

        return path


def ask_for_single_db_path() -> Optional[Path]:
    """询问用户单个数据库文件路径"""
    print("\n在该目录下未找到任何 TRAE 数据库。")
    print("您可以直接提供 database.db 文件的完整路径。")
    print("\n输入 'q' 退出\n")

    while True:
        user_input = input("请输入 database.db 文件路径: ").strip()

        if user_input.lower() == "q":
            return None

        if not user_input:
            print("路径不能为空，请重新输入。")
            continue

        path = Path(user_input).expanduser()

        if not path.exists():
            print(f"文件不存在: {path}")
            print("请重新输入。\n")
            continue

        if not path.is_file():
            print(f"路径不是文件: {path}")
            print("请重新输入。\n")
            continue

        if path.name != "database.db":
            print(f"警告: 文件名不是 database.db，而是 {path.name}")
            confirm = input("是否继续? (y/n): ").strip().lower()
            if confirm != "y":
                continue

        return path


def copy_database_files(db_path: Path, dest_dir: Path, variant: str) -> Dict:
    """拷贝数据库文件并返回文件信息"""
    dest_dir.mkdir(parents=True, exist_ok=True)

    files_to_copy = [
        db_path,
        db_path.parent / "database.db-shm",
        db_path.parent / "database.db-wal",
    ]

    copied_files = []
    total_size = 0

    for src_file in files_to_copy:
        if src_file.exists():
            dest_file = dest_dir / src_file.name
            shutil.copy2(src_file, dest_file)
            file_size = src_file.stat().st_size
            total_size += file_size
            copied_files.append(
                {
                    "name": src_file.name,
                    "size": file_size,
                    "dest": src_file.name,
                }
            )

    return {
        "variant": variant,
        "source_path": str(db_path),
        "files": copied_files,
        "total_size": total_size,
    }


def get_script_dir() -> Path:
    """获取脚本所在目录"""
    return Path(__file__).parent.resolve()


def collect_db_files(output_dir: Optional[str] = None):
    if output_dir is None:
        output_dir = str(get_script_dir() / "collected_dbs")

    print("\n" + "=" * 60)
    print("TRAE Database File Collector")
    print("=" * 60 + "\n")

    app_support = get_application_support_path()
    databases = {}

    if app_support and app_support.exists():
        print(f"检测到应用数据目录: {app_support}")
        databases = find_trae_databases(app_support)

    if not databases:
        custom_path = ask_for_custom_path()
        if custom_path:
            databases = find_trae_databases(custom_path)

            if not databases:
                single_db = ask_for_single_db_path()
                if single_db:
                    variant_name = single_db.parent.parent.parent.name
                    if not variant_name or variant_name == "ModularData":
                        variant_name = "Custom"
                    databases = {variant_name: single_db}

    if not databases:
        print("\n未找到任何 TRAE 数据库文件，退出。")
        return None

    collection_dir = Path(output_dir)
    collection_dir.mkdir(parents=True, exist_ok=True)

    manifest = {
        "collected_at": datetime.now().isoformat(),
        "system": platform.system(),
        "platform": platform.platform(),
        "hostname": platform.node(),
        "username": get_username(),
        "python_version": platform.python_version(),
        "files": [],
    }

    print(f"\nOutput directory: {collection_dir}\n")
    print("-" * 60)

    for variant, db_path in databases.items():
        safe_name = variant.replace(" ", "_").replace("-", "")
        dest_dir = collection_dir / safe_name

        file_info = copy_database_files(db_path, dest_dir, variant)
        file_info["files"] = [
            {**f, "dest": f"{safe_name}/{f['dest']}"} for f in file_info["files"]
        ]

        if file_info["files"]:
            manifest["files"].append(file_info)
            print(f"✓ {variant}")
            print(
                f"    Files: {len(file_info['files'])}, Size: {file_info['total_size'] / 1024:.1f} KB"
            )
        else:
            print(f"✗ {variant} - No files copied")

    manifest_path = collection_dir / "manifest.json"
    with open(manifest_path, "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=2, ensure_ascii=False)

    total_files = sum(len(f["files"]) for f in manifest["files"])
    total_size = sum(f["total_size"] for f in manifest["files"])

    print("\n" + "=" * 60)
    print("Summary")
    print("=" * 60)
    print(f"  Variants collected: {len(manifest['files'])}")
    print(f"  Total files: {total_files}")
    print(f"  Total size: {total_size / 1024 / 1024:.2f} MB")
    print(f"  Output: {collection_dir}")
    print("=" * 60 + "\n")

    return collection_dir


def main():
    import argparse

    default_output = get_script_dir() / "collected_dbs"
    parser = argparse.ArgumentParser(description="Collect TRAE database files")
    parser.add_argument(
        "-o",
        "--output",
        default=str(default_output),
        help=f"Output directory (default: {default_output})",
    )

    args = parser.parse_args()
    collect_db_files(args.output)


if __name__ == "__main__":
    main()
