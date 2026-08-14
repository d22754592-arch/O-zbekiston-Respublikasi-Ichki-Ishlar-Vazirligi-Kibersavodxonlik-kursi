import os
import subprocess

possible_git_paths = [
    r"C:\Program Files\Git\cmd\git.exe",
    r"C:\Program Files\Git\bin\git.exe",
    r"C:\Users\user\AppData\Local\Programs\Git\cmd\git.exe",
    r"C:\Program Files (x86)\Git\cmd\git.exe",
    "git"
]

git_executable = None
for gpath in possible_git_paths:
    try:
        res = subprocess.run([gpath, "--version"], capture_output=True, text=True)
        if res.returncode == 0:
            git_executable = gpath
            print(f"FOUND GIT: {gpath} -> {res.stdout.strip()}")
            break
    except Exception:
        pass

if not git_executable:
    print("Git executable not found in standard paths.")
