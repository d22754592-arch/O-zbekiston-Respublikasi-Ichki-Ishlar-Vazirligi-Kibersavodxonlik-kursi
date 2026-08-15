import os

for root, dirs, files in os.walk(r"C:\Program Files"):
    if "git.exe" in files:
        print("FOUND:", os.path.join(root, "git.exe"))

for root, dirs, files in os.walk(r"C:\Users\user"):
    if "git.exe" in files:
        print("FOUND USER:", os.path.join(root, "git.exe"))
