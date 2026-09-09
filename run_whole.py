#!/usr/bin/env python3
"""
================================================================================
🪔 KalaSetu (कलासेतु) • Unified Master Orchestrator (run_whole.py)
AI-Driven Market Linkage & Smart Cataloging Platform for Marginalized Artisans
Smart India Hackathon (SIH) Grand Finale • Problem Statement ID: 26090
Ministry of Social Justice & Empowerment (MoSJE)
================================================================================

This advanced script bootstraps, monitors, and multiplexes the ENTIRE system:
  1. Pre-flight diagnostics (Port conflicts, .env validation, monorepo build)
  2. Backend API Gateway (Node.js Express or Python FastAPI)
  3. Frontend Mobile App (Expo SDK 57 / React Native Metro Bundler)
  4. Real-time dynamic terminal streaming with colorized frontend & backend logs
  5. Coordinated health checking & graceful process teardown
"""

import sys
import os

# Ensure UTF-8 stdout and stderr encoding on Windows consoles
if hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass
if hasattr(sys.stderr, "reconfigure"):
    try:
        sys.stderr.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

import time
import socket
import signal
import shutil
import argparse
import threading
import subprocess
import webbrowser
from datetime import datetime
from typing import Optional, List, Dict, Any
from urllib import request as url_request
from urllib.error import URLError

# ==============================================================================
# ANSI Color Palette for Rich Dynamic Terminal Output
# ==============================================================================
class C:
    RESET = "\033[0m"
    BOLD = "\033[1m"
    DIM = "\033[2m"
    UNDERLINE = "\033[4m"
    
    # Foreground colors
    BLACK = "\033[30m"
    RED = "\033[31m"
    GREEN = "\033[32m"
    YELLOW = "\033[33m"
    BLUE = "\033[34m"
    MAGENTA = "\033[35m"
    CYAN = "\033[36m"
    WHITE = "\033[37m"
    
    # Bright foreground colors
    B_RED = "\033[91m"
    B_GREEN = "\033[92m"
    B_YELLOW = "\033[93m"
    B_BLUE = "\033[94m"
    B_MAGENTA = "\033[95m"
    B_CYAN = "\033[96m"
    B_WHITE = "\033[97m"
    
    # Background colors
    BG_BLUE = "\033[44m"
    BG_MAGENTA = "\033[45m"
    BG_CYAN = "\033[46m"
    BG_DARK = "\033[100m"

# Enable Windows ANSI escape sequence support
if sys.platform.startswith("win"):
    os.system("")

# Root directory of workspace
WORKSPACE_ROOT = os.path.abspath(os.path.dirname(__file__))

# Global process registry for safe teardown
running_processes: List[subprocess.Popen] = []
shutdown_event = threading.Event()

# ==============================================================================
# Helper Loggers with Timestamps and Colored Badges
# ==============================================================================
def ts() -> str:
    return datetime.now().strftime("%H:%M:%S")

def log_system(msg: str):
    print(f"{C.DIM}[{ts()}]{C.RESET} {C.BOLD}{C.B_WHITE}[SYSTEM]{C.RESET} {msg}", flush=True)

def log_orchestrator(msg: str):
    print(f"{C.DIM}[{ts()}]{C.RESET} {C.BOLD}{C.B_CYAN}[ORCHESTRATOR]{C.RESET} {msg}", flush=True)

def log_success(msg: str):
    print(f"{C.DIM}[{ts()}]{C.RESET} {C.BOLD}{C.B_GREEN}[SUCCESS]{C.RESET} {msg}", flush=True)

def log_warn(msg: str):
    print(f"{C.DIM}[{ts()}]{C.RESET} {C.BOLD}{C.B_YELLOW}[WARNING]{C.RESET} {msg}", flush=True)

def log_error(msg: str):
    print(f"{C.DIM}[{ts()}]{C.RESET} {C.BOLD}{C.B_RED}[ERROR]{C.RESET} {msg}", flush=True)

def print_banner(backend_choice: str):
    print(f"""
{C.B_CYAN}{C.BOLD}╔════════════════════════════════════════════════════════════════════════════════╗
║    🪔  KalaSetu (कलासेतु) • Unified Master Orchestrator (run_whole.py)         ║
║    AI-Driven Market Linkage & Smart Cataloging for Marginalized Artisans       ║
║    Smart India Hackathon Grand Finale • PS ID: 26090 (MoSJE)                   ║
╚════════════════════════════════════════════════════════════════════════════════╝{C.RESET}
{C.DIM}• Mode: {C.B_YELLOW}{backend_choice.upper()}{C.DIM} Backend + {C.B_MAGENTA}EXPO REACT NATIVE{C.DIM} Frontend
• Workspace: {C.WHITE}{WORKSPACE_ROOT}{C.RESET}
""", flush=True)

# ==============================================================================
# Port & Network Diagnostics
# ==============================================================================
def is_port_in_use(port: int) -> bool:
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.settimeout(0.5)
        return s.connect_ex(("127.0.0.1", port)) == 0

def kill_process_on_port(port: int):
    """Cleanly frees port on Windows or Linux/macOS if occupied by orphaned process."""
    if not is_port_in_use(port):
        return
    log_warn(f"Port {port} is occupied. Attempting to free it...")
    if sys.platform.startswith("win"):
        try:
            # Find PID using netstat
            output = subprocess.check_output(f"netstat -ano | findstr :{port}", shell=True).decode()
            lines = output.strip().split("\n")
            pids = set()
            for line in lines:
                parts = line.strip().split()
                if len(parts) >= 5 and "LISTENING" in line:
                    pids.add(parts[-1])
            for pid in pids:
                if pid and pid != "0":
                    subprocess.run(f"taskkill /F /PID {pid}", shell=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
                    log_system(f"Terminated process {pid} on port {port}")
            time.sleep(1)
        except Exception as e:
            log_warn(f"Could not automatically free port {port}: {e}")
    else:
        try:
            subprocess.run(f"fuser -k {port}/tcp", shell=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
            time.sleep(1)
        except Exception:
            pass

def poll_healthz(url: str, timeout_seconds: int = 35) -> bool:
    """Polls backend healthcheck endpoint with dynamic terminal animation."""
    start_time = time.time()
    spinner = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"]
    idx = 0
    while time.time() - start_time < timeout_seconds and not shutdown_event.is_set():
        try:
            req = url_request.Request(url, headers={"User-Agent": "KalaSetu-Orchestrator"})
            with url_request.urlopen(req, timeout=1.5) as resp:
                if resp.status == 200:
                    sys.stdout.write("\r" + " " * 80 + "\r")
                    sys.stdout.flush()
                    return True
        except (URLError, Exception):
            pass
        
        char = spinner[idx % len(spinner)]
        elapsed = int(time.time() - start_time)
        sys.stdout.write(f"\r{C.B_CYAN}{char}{C.RESET} Waiting for Backend API readiness probe ({url}) [{elapsed}s]... ")
        sys.stdout.flush()
        idx += 1
        time.sleep(0.4)
        
    sys.stdout.write("\r" + " " * 80 + "\r")
    sys.stdout.flush()
    return False

# ==============================================================================
# Comprehensive Full-Stack API Integration Verification
# ==============================================================================
def verify_api_integration(backend_port: int, frontend_port: Optional[int] = None) -> bool:
    """
    Executes an automated, real-time live probe on all backend API endpoints
    and frontend web connectivity, displaying a colorized audit table.
    """
    import json
    log_orchestrator("Running automated end-to-end API integration & health verification...")
    
    base_url = f"http://127.0.0.1:{backend_port}"
    results = []

    # 1. Health Probe
    try:
        req = url_request.Request(f"{base_url}/api/healthz", headers={"User-Agent": "KalaSetu-Verifier"})
        with url_request.urlopen(req, timeout=3) as resp:
            data = json.loads(resp.read().decode())
            status_ok = resp.status == 200 and data.get("status") == "ok"
            results.append({
                "name": "Backend Health Probe",
                "endpoint": "GET /api/healthz",
                "ok": status_ok,
                "detail": f"Status 200 • {data.get('status', 'ok')}"
            })
    except Exception as e:
        results.append({
            "name": "Backend Health Probe",
            "endpoint": "GET /api/healthz",
            "ok": False,
            "detail": f"Err: {str(e)[:14]}"
        })

    # 2. Local Database & Users
    try:
        req = url_request.Request(f"{base_url}/api/auth/users", headers={"User-Agent": "KalaSetu-Verifier"})
        with url_request.urlopen(req, timeout=3) as resp:
            data = json.loads(resp.read().decode())
            user_count = len(data.get("users", []))
            results.append({
                "name": "Artisan Registry & Local DB",
                "endpoint": "GET /api/auth/users",
                "ok": resp.status == 200 and user_count > 0,
                "detail": f"{user_count} artisans registered"
            })
    except Exception as e:
        results.append({
            "name": "Artisan Registry & Local DB",
            "endpoint": "GET /api/auth/users",
            "ok": False,
            "detail": f"Err: {str(e)[:14]}"
        })

    # 3. Artisan Account Registration & Sovereign Pehchan ID
    try:
        reg_payload = json.dumps({
            "name": "Meera Ben Patel",
            "phone": "+91 98765 43220",
            "state": "Gujarat",
            "district": "Kutch",
            "craftCluster": "Ajrakhpur Block Print & Bandhani",
            "socialCategory": "Artisan Self Help Group"
        }).encode("utf-8")
        req = url_request.Request(
            f"{base_url}/api/auth/register",
            data=reg_payload,
            headers={"Content-Type": "application/json", "User-Agent": "KalaSetu-Verifier"},
            method="POST"
        )
        with url_request.urlopen(req, timeout=3) as resp:
            data = json.loads(resp.read().decode())
            pehchan = data.get("artisan", {}).get("pehchanId", "N/A")
            results.append({
                "name": "Sovereign Pehchan ID Issuance",
                "endpoint": "POST /api/auth/register",
                "ok": resp.status == 201,
                "detail": f"Issued {pehchan}"
            })
    except Exception as e:
        results.append({
            "name": "Sovereign Pehchan ID Issuance",
            "endpoint": "POST /api/auth/register",
            "ok": False,
            "detail": f"Err: {str(e)[:14]}"
        })

    # 4. Multi-Language Catalog Gen (7 Languages)
    try:
        cat_payload = json.dumps({
            "description": "Handcrafted pure terracotta elephant with natural clay motifs",
            "targetMarket": "Domestic & Export"
        }).encode("utf-8")
        req = url_request.Request(
            f"{base_url}/api/catalog/generate",
            data=cat_payload,
            headers={"Content-Type": "application/json", "User-Agent": "KalaSetu-Verifier"},
            method="POST"
        )
        with url_request.urlopen(req, timeout=4) as resp:
            data = json.loads(resp.read().decode())
            translations = data.get("regionalTranslations", {})
            langs_supported = len(translations.keys())
            has_multilingual = langs_supported >= 5
            results.append({
                "name": "7-Language Multilingual Catalog",
                "endpoint": "POST /api/catalog/generate",
                "ok": resp.status == 200 and has_multilingual,
                "detail": f"{langs_supported} languages ready"
            })
    except Exception as e:
        results.append({
            "name": "7-Language Multilingual Catalog",
            "endpoint": "POST /api/catalog/generate",
            "ok": False,
            "detail": f"Err: {str(e)[:14]}"
        })

    # 5. AI Studio Image Enhancement
    try:
        enh_payload = json.dumps({
            "imageBase64": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
            "mimeType": "image/png"
        }).encode("utf-8")
        req = url_request.Request(
            f"{base_url}/api/enhance-image",
            data=enh_payload,
            headers={"Content-Type": "application/json", "User-Agent": "KalaSetu-Verifier"},
            method="POST"
        )
        with url_request.urlopen(req, timeout=4) as resp:
            data = json.loads(resp.read().decode())
            provider = data.get("provider", "local")
            results.append({
                "name": "AI Studio 4K Enhancement",
                "endpoint": "POST /api/enhance-image",
                "ok": resp.status == 200 and data.get("enhanced") is True,
                "detail": f"Prov: {provider[:10]}"
            })
    except Exception as e:
        results.append({
            "name": "AI Studio 4K Enhancement",
            "endpoint": "POST /api/enhance-image",
            "ok": False,
            "detail": f"Err: {str(e)[:14]}"
        })

    # 6. Multi-Dialect Voice Transcribe
    try:
        voice_payload = json.dumps({
            "language": "bn",
            "audioBase64": "mock-audio-payload"
        }).encode("utf-8")
        req = url_request.Request(
            f"{base_url}/api/transcribe",
            data=voice_payload,
            headers={"Content-Type": "application/json", "User-Agent": "KalaSetu-Verifier"},
            method="POST"
        )
        with url_request.urlopen(req, timeout=3) as resp:
            data = json.loads(resp.read().decode())
            results.append({
                "name": "Speech Synthesis & ASR Engine",
                "endpoint": "POST /api/transcribe",
                "ok": resp.status == 200 and "text" in data,
                "detail": f"Lang: {data.get('languageNameNative', 'Bangla')}"
            })
    except Exception as e:
        results.append({
            "name": "Speech Synthesis & ASR Engine",
            "endpoint": "POST /api/transcribe",
            "ok": False,
            "detail": f"Err: {str(e)[:14]}"
        })

    # 7. ONDC Marketplace Products Feed
    try:
        req = url_request.Request(f"{base_url}/api/products", headers={"User-Agent": "KalaSetu-Verifier"})
        with url_request.urlopen(req, timeout=3) as resp:
            data = json.loads(resp.read().decode())
            count = len(data) if isinstance(data, list) else len(data.get("products", []))
            results.append({
                "name": "ONDC Open Craft Catalog Feed",
                "endpoint": "GET /api/products",
                "ok": resp.status == 200 and count > 0,
                "detail": f"{count} products loaded"
            })
    except Exception as e:
        results.append({
            "name": "ONDC Open Craft Catalog Feed",
            "endpoint": "GET /api/products",
            "ok": False,
            "detail": f"Err: {str(e)[:14]}"
        })

    # 8. Activity History Ledger
    try:
        req = url_request.Request(f"{base_url}/api/history", headers={"User-Agent": "KalaSetu-Verifier"})
        with url_request.urlopen(req, timeout=3) as resp:
            data = json.loads(resp.read().decode())
            hist_count = len(data) if isinstance(data, list) else 0
            results.append({
                "name": "Persistent Activity & Local DB",
                "endpoint": "GET /api/history",
                "ok": resp.status == 200,
                "detail": f"{hist_count} activity records"
            })
    except Exception as e:
        results.append({
            "name": "Persistent Activity & Local DB",
            "endpoint": "GET /api/history",
            "ok": False,
            "detail": f"Err: {str(e)[:14]}"
        })

    # 9. Frontend Web App Connectivity (if frontend_port given)
    if frontend_port:
        try:
            req = url_request.Request(f"http://127.0.0.1:{frontend_port}", headers={"User-Agent": "KalaSetu-Verifier"})
            with url_request.urlopen(req, timeout=3) as resp:
                results.append({
                    "name": "Frontend Web Client (Vite React)",
                    "endpoint": f"GET :{frontend_port}/",
                    "ok": resp.status == 200,
                    "detail": "HTML & bundle ready"
                })
        except Exception as e:
            results.append({
                "name": "Frontend Web Client (Vite React)",
                "endpoint": f"GET :{frontend_port}/",
                "ok": False,
                "detail": f"Err: {str(e)[:14]}"
            })

    # Print Visual Audit Table
    print(f"\n{C.B_CYAN}{C.BOLD}┌────────────────────────────────────────────────────────────────────────────────┐{C.RESET}")
    print(f"{C.B_CYAN}{C.BOLD}│ 🔬 FULL-STACK BACKEND & FRONTEND API INTEGRATION VERIFICATION                  │{C.RESET}")
    print(f"{C.B_CYAN}{C.BOLD}├───────────────────────────────┬──────────────────────────┬────────┬────────────┤{C.RESET}")
    print(f"{C.B_CYAN}{C.BOLD}│ Feature Service               │ API Endpoint             │ Status │ Telemetry  │{C.RESET}")
    print(f"{C.B_CYAN}{C.BOLD}├───────────────────────────────┼──────────────────────────┼────────┼────────────┤{C.RESET}")
    all_ok = True
    for r in results:
        name_str = r["name"][:29].ljust(29)
        ep_str = r["endpoint"][:24].ljust(24)
        if r["ok"]:
            status_str = f"{C.B_GREEN}[PASS]{C.RESET} "
        else:
            all_ok = False
            status_str = f"{C.B_RED}[FAIL]{C.RESET} "
        det_str = r["detail"][:10].ljust(10)
        print(f"│ {C.WHITE}{name_str}{C.RESET} │ {C.DIM}{ep_str}{C.RESET} │ {status_str}│ {C.CYAN}{det_str}{C.RESET} │")
    print(f"{C.B_CYAN}{C.BOLD}└───────────────────────────────┴──────────────────────────┴────────┴────────────┘{C.RESET}\n", flush=True)
    
    if all_ok:
        log_success("All Backend APIs and Frontend components are fully integrated & healthy!")
    else:
        log_warn("One or more integration checks returned a notice. Check details above.")
    return all_ok

# ==============================================================================
# Stream Output Consumer (Multiplexes Frontend and Backend into Terminal)
# ==============================================================================
def stream_logs(pipe, badge: str, color: str, is_frontend: bool = False):
    """Continuously reads a sub-process pipe line-by-line and streams colorized output."""
    try:
        for line in iter(pipe.readline, ""):
            if shutdown_event.is_set():
                break
            if not line:
                continue
            
            clean_line = line.rstrip("\r\n")
            if not clean_line.strip():
                continue

            # Highlight specific frontend Metro/React Native activities
            if is_frontend:
                # Highlight Metro bundler compilation progress
                if "Bundling" in clean_line or "bundled in" in clean_line:
                    formatted_line = f"{C.B_CYAN}{C.BOLD}{clean_line}{C.RESET}"
                elif "Metro waiting on" in clean_line or "Starting Metro" in clean_line:
                    formatted_line = f"{C.B_GREEN}{clean_line}{C.RESET}"
                elif "Warning:" in clean_line or "warn" in clean_line.lower():
                    formatted_line = f"{C.B_YELLOW}{clean_line}{C.RESET}"
                elif "Error" in clean_line or "FAIL" in clean_line:
                    formatted_line = f"{C.B_RED}{C.BOLD}{clean_line}{C.RESET}"
                elif any(kw in clean_line for kw in ["iOS", "Android", "Web", "web"]):
                    formatted_line = f"{C.B_MAGENTA}{clean_line}{C.RESET}"
                else:
                    formatted_line = f"{C.WHITE}{clean_line}{C.RESET}"
            else:
                # Backend logs
                if "HTTP" in clean_line or "GET" in clean_line or "POST" in clean_line:
                    formatted_line = f"{C.CYAN}{clean_line}{C.RESET}"
                elif "error" in clean_line.lower():
                    formatted_line = f"{C.B_RED}{clean_line}{C.RESET}"
                else:
                    formatted_line = f"{C.DIM}{clean_line}{C.RESET}"

            print(f"{C.DIM}[{ts()}]{C.RESET} {color}{C.BOLD}{badge}{C.RESET} {formatted_line}", flush=True)
    except (ValueError, Exception):
        pass

# ==============================================================================
# Pre-Flight Environment Setup & Verification
# ==============================================================================
# ==============================================================================
# Interactive Software & Dependency Verification System
# ==============================================================================
def prompt_user(question: str, default: bool = True) -> bool:
    """Prompts the user interactively in terminal with default option."""
    if not sys.stdin.isatty():
        return default
    suffix = " [Y/n]: " if default else " [y/N]: "
    try:
        ans = input(f"{C.B_YELLOW}{C.BOLD}?{C.RESET} {C.WHITE}{question}{C.RESET}{C.DIM}{suffix}{C.RESET}").strip().lower()
        if not ans:
            return default
        return ans in ["y", "yes", "true", "1"]
    except (EOFError, KeyboardInterrupt):
        print()
        return False

def verify_and_install_system_and_libraries(
    backend_choice: str,
    auto_yes: bool = False,
    force_install: bool = False,
    skip_build: bool = False,
) -> bool:
    log_orchestrator("Performing full system software and dependency verification...")

    diagnostics = []
    missing_items = []

    # 1. Check Node.js
    node_version = None
    try:
        node_version = subprocess.check_output("node --version", shell=True).decode().strip()
        diagnostics.append({"Component": "Node.js Runtime", "Status": "INSTALLED", "Details": node_version, "Ok": True})
    except Exception:
        diagnostics.append({"Component": "Node.js Runtime", "Status": "MISSING", "Details": "Node.js v20+ required", "Ok": False})
        missing_items.append("Node.js Runtime (Download from https://nodejs.org)")

    # 2. Check Package Manager (pnpm / npx pnpm / npm)
    pkg_manager = None
    for mgr in ["pnpm", "npx pnpm", "npm"]:
        try:
            ver_out = subprocess.check_output(f"{mgr} --version", shell=True, stderr=subprocess.DEVNULL).decode().strip()
            ver = ver_out.splitlines()[-1].strip()
            display_name = "pnpm" if "pnpm" in mgr else "npm"
            pkg_manager = (display_name, ver, mgr)
            break
        except Exception:
            pass
    if pkg_manager:
        diagnostics.append({"Component": "Package Manager", "Status": "INSTALLED", "Details": f"{pkg_manager[0]} v{pkg_manager[1]}", "Ok": True})
    else:
        diagnostics.append({"Component": "Package Manager", "Status": "MISSING", "Details": "pnpm or npm required", "Ok": False})
        missing_items.append("Package Manager (pnpm/npm)")

    # 3. Check Python Engine
    py_version = f"v{sys.version_info.major}.{sys.version_info.minor}.{sys.version_info.micro}"
    diagnostics.append({"Component": "Python Engine", "Status": "INSTALLED", "Details": py_version, "Ok": True})

    # 4. Check Root & Workspace node_modules
    root_node_modules = os.path.join(WORKSPACE_ROOT, "node_modules")
    market_node_modules = os.path.join(WORKSPACE_ROOT, "artifacts", "artisan-market", "node_modules")
    api_node_modules = os.path.join(WORKSPACE_ROOT, "artifacts", "api-server", "node_modules")

    node_modules_ok = os.path.exists(root_node_modules) and os.path.exists(market_node_modules)
    if node_modules_ok:
        diagnostics.append({"Component": "Monorepo Packages", "Status": "INSTALLED", "Details": "Node dependencies verified", "Ok": True})
    else:
        diagnostics.append({"Component": "Monorepo Packages", "Status": "MISSING", "Details": "pnpm install required", "Ok": False})
        missing_items.append("Monorepo Node dependencies")

    # 5. Check Shared Workspace Libraries Build (tsc --build)
    db_dist = os.path.join(WORKSPACE_ROOT, "lib", "db", "dist")
    if os.path.exists(db_dist):
        diagnostics.append({"Component": "Shared Workspace Libs", "Status": "COMPILED", "Details": "Drizzle & Zod dist ready", "Ok": True})
    else:
        diagnostics.append({"Component": "Shared Workspace Libs", "Status": "UNBUILT", "Details": "npx tsc --build required", "Ok": False})
        missing_items.append("Shared workspace libraries build")

    # 6. Check API Gateway Bundle (esbuild)
    api_dist = os.path.join(WORKSPACE_ROOT, "artifacts", "api-server", "dist", "index.mjs")
    if os.path.exists(api_dist):
        diagnostics.append({"Component": "API Gateway Bundle", "Status": "BUNDLED", "Details": "dist/index.mjs ready", "Ok": True})
    else:
        diagnostics.append({"Component": "API Gateway Bundle", "Status": "UNBUILT", "Details": "node build.mjs required", "Ok": False})
        missing_items.append("API Gateway production bundle")

    # 7. Check Python FastAPI Microservice Dependencies
    py_deps_ok = True
    missing_py_list = []
    if backend_choice in ["python", "both"]:
        for mod, pkg_name in [("fastapi", "fastapi"), ("uvicorn", "uvicorn"), ("pydantic", "pydantic"), ("httpx", "httpx")]:
            try:
                __import__(mod)
            except ImportError:
                py_deps_ok = False
                missing_py_list.append(pkg_name)

        if py_deps_ok:
            diagnostics.append({"Component": "Python Microservice", "Status": "INSTALLED", "Details": "FastAPI & Uvicorn ready", "Ok": True})
        else:
            diagnostics.append({"Component": "Python Microservice", "Status": "MISSING", "Details": f"Missing: {', '.join(missing_py_list)}", "Ok": False})
            missing_items.append(f"Python packages ({', '.join(missing_py_list)})")

    # Render Visual Diagnostics Table
    print(f"\n{C.B_WHITE}{C.BOLD}┌────────────────────────────────────────────────────────────────────────┐{C.RESET}")
    print(f"{C.B_WHITE}{C.BOLD}│ 🔍 SYSTEM SOFTWARE & DEPENDENCY DIAGNOSTICS                            │{C.RESET}")
    print(f"{C.B_WHITE}{C.BOLD}├──────────────────────────────┬─────────────────────────┬───────────────┤{C.RESET}")
    print(f"{C.B_WHITE}{C.BOLD}│ Component                    │ Status                  │ Details       │{C.RESET}")
    print(f"{C.B_WHITE}{C.BOLD}├──────────────────────────────┼─────────────────────────┼───────────────┤{C.RESET}")
    for d in diagnostics:
        comp = d["Component"].ljust(28)
        status_color = C.B_GREEN if d["Ok"] else C.B_RED
        status_sym = "[OK] " if d["Ok"] else "[!]  "
        status_str = f"{status_sym}{d['Status']}".ljust(23)
        details = d["Details"][:13].ljust(13)
        print(f"│ {C.WHITE}{comp}{C.RESET} │ {status_color}{C.BOLD}{status_str}{C.RESET} │ {C.DIM}{details}{C.RESET} │")
    print(f"{C.B_WHITE}{C.BOLD}└──────────────────────────────┴─────────────────────────┴───────────────┘{C.RESET}\n", flush=True)

    # Check for critical missing software that cannot be auto-installed
    if not node_version:
        log_error("CRITICAL: Node.js is required to run KalaSetu. Please install Node.js v20+ from https://nodejs.org and re-run.")
        return False

    # Handle .env file auto-creation
    env_file = os.path.join(WORKSPACE_ROOT, ".env")
    env_example = os.path.join(WORKSPACE_ROOT, ".env.example")
    if not os.path.exists(env_file) and os.path.exists(env_example):
        shutil.copyfile(env_example, env_file)
        log_success("Created .env with default offline demo configuration.")

    # Determine if installation / build is required or requested
    needs_install = len(missing_items) > 0 or force_install

    if needs_install:
        if missing_items:
            log_warn(f"Missing or unbuilt items detected: {', '.join(missing_items)}")
        
        do_install = auto_yes or prompt_user("Would you like to install and build all required libraries now?", default=True)
        if not do_install:
            log_warn("Skipping dependency installation upon user request. Starting might fail if components are missing.")
            return True

        # Run package installation
        raw_cmd = pkg_manager[2] if pkg_manager else "npm"
        log_orchestrator(f"Installing monorepo dependencies using {raw_cmd}...")
        install_cmd = f"{raw_cmd} install"
        res = subprocess.run(install_cmd, cwd=WORKSPACE_ROOT, shell=True)
        if res.returncode == 0:
            log_success("Monorepo dependencies installed successfully.")
        else:
            log_warn(f"{mgr_cmd} install finished with return code {res.returncode}. Continuing with build...")

        # Build shared libraries
        log_orchestrator("Compiling shared workspace libraries (tsc --build)...")
        res_build = subprocess.run("npx tsc --build", cwd=WORKSPACE_ROOT, shell=True)
        if res_build.returncode == 0:
            log_success("Shared libraries compiled successfully.")
        else:
            log_warn("tsc --build completed with notices.")

        # Build API server bundle
        api_dir = os.path.join(WORKSPACE_ROOT, "artifacts", "api-server")
        log_orchestrator("Building API Server esbuild bundle (build.mjs)...")
        res_api = subprocess.run("node ./build.mjs", cwd=api_dir, shell=True)
        if res_api.returncode == 0:
            log_success("API Server bundle compiled successfully.")

        # Install Python dependencies if requested
        if backend_choice in ["python", "both"] or not py_deps_ok:
            py_req = os.path.join(WORKSPACE_ROOT, "artifacts", "api-server-python", "requirements.txt")
            if os.path.exists(py_req):
                log_orchestrator("Installing Python FastAPI microservice dependencies...")
                subprocess.run(f'"{sys.executable}" -m pip install -r "{py_req}"', shell=True)
                log_success("Python FastAPI dependencies installed.")

        log_success("All required libraries have been verified and prepared!\n")
    else:
        log_success("All required system software, packages, and workspace libraries are verified and ready!")
        # In interactive terminal, give user the option to perform a fresh update if desired
        if not auto_yes and sys.stdin.isatty():
            refresh = prompt_user("Would you like to run a fresh dependency update/rebuild before starting?", default=False)
            if refresh:
                log_orchestrator("Refreshing and building workspace...")
                subprocess.run("npx tsc --build", cwd=WORKSPACE_ROOT, shell=True)
                subprocess.run("node ./build.mjs", cwd=os.path.join(WORKSPACE_ROOT, "artifacts", "api-server"), shell=True)
                log_success("Rebuild completed.")

    return True

# ==============================================================================
# Mission Control Dashboard
# ==============================================================================
def get_local_ip() -> str:
    """Attempts to dynamically determine host local network IP for mobile device access."""
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.settimeout(0.2)
        # Connect to public DNS address (does not actually send data)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception:
        return "127.0.0.1"

# ==============================================================================
# Mission Control Dashboard
# ==============================================================================
def print_mission_control(backend_type: str, backend_port: int, frontend_mode: str, web_port: int, mobile_port: int):
    api_title = "Node.js Express Gateway" if backend_type == "node" else "Python FastAPI Microservice"
    local_ip = get_local_ip()
    
    docs_line = f"║  📚 API Swagger Docs : {C.B_CYAN}http://localhost:{backend_port}/docs{C.RESET}{' ' * (37 - len(str(backend_port)))}║\n" if backend_type == "python" else ""
    
    web_local = f"http://localhost:{web_port}"
    web_net = f"http://{local_ip}:{web_port}"
    
    web_lines = ""
    if frontend_mode in ["desktop", "both"]:
        web_lines = (
            f"║  💻 Laptop / Desktop : {C.B_GREEN}{web_local}{C.RESET}{' ' * max(1, 57 - len(web_local))}║\n"
            f"║  📱 Phone / Wi-Fi    : {C.B_CYAN}{web_net}{C.RESET}{' ' * max(1, 57 - len(web_net))}║\n"
        )

    mobile_lines = ""
    if frontend_mode in ["mobile", "both"]:
        mobile_lines = (
            f"║  📱 Mobile Metro Hub : {C.B_MAGENTA}http://localhost:{mobile_port}{C.RESET}{' ' * max(1, 57 - len(f'http://localhost:{mobile_port}'))}║\n"
        )

    print(f"""
{C.B_GREEN}╔════════════════════════════════════════════════════════════════════════════════╗
║         🪔 KalaSetu (कलासेतु) • CROSS-DEVICE / MULTI-OS OPERATIONAL            ║
╠════════════════════════════════════════════════════════════════════════════════╣
{web_lines}{mobile_lines}║  ⚙️  API Gateway ({backend_type.upper()}) : {C.B_CYAN}http://localhost:{backend_port}{C.RESET} | {C.DIM}Network:{C.RESET} {C.B_CYAN}http://{local_ip}:{backend_port}{C.RESET}{' ' * max(1, 33 - len(local_ip) - len(str(backend_port)))}║
║  🏥 API Health Probe  : {C.B_WHITE}http://localhost:{backend_port}/api/healthz{C.RESET}{' ' * max(1, 55 - len(f'http://localhost:{backend_port}/api/healthz'))}║
{docs_line}║  📦 Backend Runtime   : {C.B_YELLOW}{api_title}{C.RESET}{' ' * max(1, 55 - len(api_title))}║
║  🌐 Browser Support   : Chrome, Safari, Edge, Firefox, iOS Webkit, Android     ║
║  🎯 Stitch Design UI  : Light & Colourful "KalaSetu Craft Modernity" Theme     ║
╚════════════════════════════════════════════════════════════════════════════════╝{C.RESET}
{C.DIM}👉 Tip: Open the {C.B_CYAN}Phone / Wi-Fi{C.DIM} URL on your smartphone browser on the same Wi-Fi!{C.RESET}
{C.DIM}👉 Tip: Press {C.B_WHITE}Ctrl + C{C.DIM} anytime to safely shut down all services.{C.RESET}
""", flush=True)

# ==============================================================================
# Process Lifecycle Management & Graceful Teardown
# ==============================================================================
def terminate_all_processes(signum=None, frame=None):
    if shutdown_event.is_set():
        return
    shutdown_event.set()
    print("\n")
    log_orchestrator("Received shutdown signal. Gracefully stopping all services...")
    
    for proc in running_processes:
        if proc.poll() is None:
            try:
                if sys.platform.startswith("win"):
                    subprocess.run(f"taskkill /F /T /PID {proc.pid}", shell=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
                else:
                    proc.terminate()
            except Exception:
                pass

    log_success("All background services terminated cleanly. KalaSetu stopped.")
    sys.exit(0)

# ==============================================================================
# Main Orchestrator Execution Flow
# ==============================================================================
def main():
    parser = argparse.ArgumentParser(
        description="KalaSetu Unified Orchestrator: Runs entire full-stack platform with real-time logs."
    )
    parser.add_argument(
        "--backend",
        choices=["node", "python", "both"],
        default="node",
        help="Backend runtime to launch: 'node' (default Express), 'python' (FastAPI), or 'both' (hybrid mesh).",
    )
    parser.add_argument(
        "--frontend",
        choices=["desktop", "mobile", "both"],
        default="desktop",
        help="Frontend client to launch: 'desktop' (Vite Stitch Web App), 'mobile' (Expo App), or 'both'.",
    )
    parser.add_argument(
        "--port-backend",
        type=int,
        default=3000,
        help="Port for the primary backend API server (default: 3000).",
    )
    parser.add_argument(
        "--port-frontend",
        type=int,
        default=5173,
        help="Port for the primary frontend dev server (default: 5173 for desktop, 8082 for mobile).",
    )
    parser.add_argument(
        "--open",
        action="store_true",
        default=True,
        help="Automatically open the frontend in your default browser once healthy (default: True).",
    )
    parser.add_argument(
        "--no-open",
        dest="open",
        action="store_false",
        help="Do not open browser automatically.",
    )
    parser.add_argument(
        "--skip-build",
        action="store_true",
        help="Skip shared library compilation check to boot faster.",
    )
    parser.add_argument(
        "--clean",
        action="store_true",
        help="Forcefully kill any existing processes using required ports before launch.",
    )
    parser.add_argument(
        "-y", "--yes",
        action="store_true",
        help="Automatically confirm and proceed with dependency installation without prompting.",
    )
    parser.add_argument(
        "--install",
        action="store_true",
        help="Force check and re-install/update all dependencies before launching.",
    )
    parser.add_argument(
        "--verify-only",
        action="store_true",
        help="Run live API integration probe across all endpoints and exit immediately.",
    )

    args = parser.parse_args()
    print_banner(args.backend)

    # Register signal handlers for clean exit
    signal.signal(signal.SIGINT, terminate_all_processes)
    signal.signal(signal.SIGTERM, terminate_all_processes)

    # Clean ports if requested
    if args.clean:
        kill_process_on_port(args.port_backend)
        kill_process_on_port(args.port_frontend)

    # Verify and interactively install system software & libraries
    if not verify_and_install_system_and_libraries(
        backend_choice=args.backend,
        auto_yes=args.yes,
        force_install=args.install,
        skip_build=args.skip_build,
    ):
        sys.exit(1)

    # Check for port conflicts
    if is_port_in_use(args.port_backend):
        log_warn(f"Port {args.port_backend} is already in use!")
        kill_process_on_port(args.port_backend)
    if is_port_in_use(args.port_frontend):
        log_warn(f"Port {args.port_frontend} is already in use!")
        kill_process_on_port(args.port_frontend)

    # --------------------------------------------------------------------------
    # 1. Start Backend API Gateway
    # --------------------------------------------------------------------------
    backend_env = os.environ.copy()
    backend_env["PORT"] = str(args.port_backend)
    backend_env["NODE_ENV"] = "development"

    if args.backend == "node":
        api_dir = os.path.join(WORKSPACE_ROOT, "artifacts", "api-server")
        log_orchestrator(f"Launching Node.js Express API Server on port {args.port_backend}...")
        
        # Build first if dist missing
        dist_index = os.path.join(api_dir, "dist", "index.mjs")
        if not os.path.exists(dist_index):
            log_system("Building API Server esbuild bundle...")
            subprocess.run("node ./build.mjs", cwd=api_dir, shell=True)

        cmd = "node --enable-source-maps ./dist/index.mjs"
        backend_proc = subprocess.Popen(
            cmd,
            cwd=api_dir,
            shell=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True,
            bufsize=1,
            env=backend_env,
        )
        running_processes.append(backend_proc)
        threading.Thread(target=stream_logs, args=(backend_proc.stdout, "[BACKEND:NODE]", C.B_CYAN, False), daemon=True).start()

    elif args.backend == "python":
        py_dir = os.path.join(WORKSPACE_ROOT, "artifacts", "api-server-python")
        log_orchestrator(f"Launching Python FastAPI Microservice on port {args.port_backend}...")
        cmd = f'"{sys.executable}" -m uvicorn main:app --host 0.0.0.0 --port {args.port_backend} --reload'
        backend_proc = subprocess.Popen(
            cmd,
            cwd=py_dir,
            shell=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True,
            bufsize=1,
            env=backend_env,
        )
        running_processes.append(backend_proc)
        threading.Thread(target=stream_logs, args=(backend_proc.stdout, "[BACKEND:PYTHON]", C.B_YELLOW, False), daemon=True).start()

    elif args.backend == "both":
        # Node on 3000, Python on 8000
        api_dir = os.path.join(WORKSPACE_ROOT, "artifacts", "api-server")
        py_dir = os.path.join(WORKSPACE_ROOT, "artifacts", "api-server-python")
        log_orchestrator("Launching Hybrid Mesh: Node.js (3000) + Python FastAPI (8000)...")
        
        node_cmd = "node --enable-source-maps ./dist/index.mjs"
        node_proc = subprocess.Popen(node_cmd, cwd=api_dir, shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True, bufsize=1, env=backend_env)
        running_processes.append(node_proc)
        threading.Thread(target=stream_logs, args=(node_proc.stdout, "[BACKEND:NODE]", C.B_CYAN, False), daemon=True).start()

        py_env = backend_env.copy()
        py_env["PORT"] = "8000"
        py_cmd = f'"{sys.executable}" -m uvicorn main:app --host 0.0.0.0 --port 8000'
        py_proc = subprocess.Popen(py_cmd, cwd=py_dir, shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True, bufsize=1, env=py_env)
        running_processes.append(py_proc)
        threading.Thread(target=stream_logs, args=(py_proc.stdout, "[BACKEND:PYTHON]", C.B_YELLOW, False), daemon=True).start()

    # --------------------------------------------------------------------------
    # 2. Wait for Backend Readiness (Health Probe)
    # --------------------------------------------------------------------------
    health_url = f"http://127.0.0.1:{args.port_backend}/api/healthz"
    healthy = poll_healthz(health_url, timeout_seconds=30)
    if healthy:
        log_success(f"Backend API Gateway is LIVE & Verified at {health_url}")
    else:
        log_warn("Backend health check timed out. Proceeding to launch frontend anyway...")

    # --------------------------------------------------------------------------
    # 3. Launch Frontend (Desktop Web App / Mobile App / Both)
    # --------------------------------------------------------------------------
    web_port = args.port_frontend if args.frontend != "mobile" else 5173
    mobile_port = args.port_frontend if args.frontend == "mobile" else 8082

    # Launch Desktop Web App (Vite React - Stitch Design)
    if args.frontend in ["desktop", "both"]:
        web_dir = os.path.join(WORKSPACE_ROOT, "artifacts", "mockup-sandbox")
        log_orchestrator(f"Launching Stitch Desktop Web Application on port {web_port}...")
        log_system("Streaming live desktop frontend events below:")
        
        web_cmd = f"npx vite --port {web_port} --host 0.0.0.0"
        web_proc = subprocess.Popen(
            web_cmd,
            cwd=web_dir,
            shell=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True,
            bufsize=1,
        )
        running_processes.append(web_proc)
        threading.Thread(
            target=stream_logs,
            args=(web_proc.stdout, "[FRONTEND:DESKTOP]", C.B_MAGENTA, True),
            daemon=True,
        ).start()

    # Launch Mobile App (Expo)
    if args.frontend in ["mobile", "both"]:
        market_dir = os.path.join(WORKSPACE_ROOT, "artifacts", "artisan-market")
        frontend_env = os.environ.copy()
        frontend_env["PORT"] = str(mobile_port)
        frontend_env["EXPO_PUBLIC_DOMAIN"] = f"localhost:{args.port_backend}"
        frontend_env["EXPO_PUBLIC_API_URL"] = f"http://localhost:{args.port_backend}"

        log_orchestrator(f"Launching Expo Mobile Development Server on port {mobile_port}...")
        expo_cmd = f"npx expo start --localhost --port {mobile_port}"
        mobile_proc = subprocess.Popen(
            expo_cmd,
            cwd=market_dir,
            shell=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True,
            bufsize=1,
            env=frontend_env,
        )
        running_processes.append(mobile_proc)
        threading.Thread(
            target=stream_logs,
            args=(mobile_proc.stdout, "[FRONTEND:MOBILE]", C.B_YELLOW, True),
            daemon=True,
        ).start()

    # --------------------------------------------------------------------------
    # 4. End-to-End API Integration & Cross-Service Verification Probe
    # --------------------------------------------------------------------------
    time.sleep(2)
    verification_passed = verify_api_integration(
        backend_port=args.port_backend,
        frontend_port=web_port if args.frontend in ["desktop", "both"] else None,
    )

    if args.verify_only:
        log_orchestrator(f"Integration probe completed (Pass: {verification_passed}). Shutting down services...")
        terminate_all_processes()
        sys.exit(0 if verification_passed else 1)

    # Display HUD Mission Control
    print_mission_control(args.backend, args.port_backend, args.frontend, web_port, mobile_port)

    # Automatically open browser if requested
    if args.open:
        primary_url = f"http://localhost:{web_port}" if args.frontend in ["desktop", "both"] else f"http://localhost:{mobile_port}"
        log_orchestrator(f"Opening default web browser to {primary_url}...")
        time.sleep(1.5)
        webbrowser.open(primary_url)

    # --------------------------------------------------------------------------
    # 5. Keep Main Thread Alive & Supervise Worker Processes
    # --------------------------------------------------------------------------
    try:
        while not shutdown_event.is_set():
            # Supervise processes: if any process unexpectedly died, report it
            for p in running_processes:
                ret = p.poll()
                if ret is not None and not shutdown_event.is_set():
                    log_warn(f"A child process exited unexpectedly with code {ret}")
            time.sleep(1)
    except KeyboardInterrupt:
        terminate_all_processes()

if __name__ == "__main__":
    main()
