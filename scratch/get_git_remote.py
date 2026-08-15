import subprocess

git_bin = r"C:\Program Files\Git\cmd\git.exe"
cwd = r"c:\Users\user\Desktop\KURS\iib-kiberxavfsizlik-akademiyasi"

res = subprocess.run([git_bin, "remote", "-v"], cwd=cwd, capture_output=True, text=True)
print("CURRENT GIT REMOTE:\n", res.stdout)
