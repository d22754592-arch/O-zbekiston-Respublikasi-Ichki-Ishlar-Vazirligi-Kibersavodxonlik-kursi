import subprocess
import os

env = os.environ.copy()
env["PATH"] = r"C:\Program Files\Git\cmd;C:\Program Files\Git\bin;" + env.get("PATH", "")

cwd = r"c:\Users\user\Desktop\KURS\iib-kiberxavfsizlik-akademiyasi"

# Check remotes
res = subprocess.run(["git", "remote", "-v"], cwd=cwd, capture_output=True, text=True, env=env)
print("REMOTES:\n", res.stdout)

# Check status
res = subprocess.run(["git", "status"], cwd=cwd, capture_output=True, text=True, env=env)
print("STATUS:\n", res.stdout[:500])
