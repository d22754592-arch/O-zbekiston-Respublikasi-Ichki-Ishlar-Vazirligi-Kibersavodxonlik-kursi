import subprocess
import os

git_bin = r"C:\Program Files\Git\cmd\git.exe"
cwd = r"c:\Users\user\Desktop\KURS\iib-kiberxavfsizlik-akademiyasi"

print("1. Pushing main branch to GitHub...")
res1 = subprocess.run([git_bin, "push", "-u", "origin", "main"], cwd=cwd, capture_output=True, text=True)
print("PUSH MAIN STDOUT:\n", res1.stdout)
print("PUSH MAIN STDERR:\n", res1.stderr)

print("\n2. Deploying dist to gh-pages...")
npx_bin = r"C:\Program Files\nodejs\npx.cmd"
res2 = subprocess.run([npx_bin, "gh-pages", "-d", "dist"], cwd=cwd, capture_output=True, text=True)
print("GH-PAGES STDOUT:\n", res2.stdout)
print("GH-PAGES STDERR:\n", res2.stderr)
