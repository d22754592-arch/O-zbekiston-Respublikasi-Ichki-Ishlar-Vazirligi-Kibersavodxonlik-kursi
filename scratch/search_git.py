import os

search_paths = [
    r"C:\Program Files",
    r"C:\Program Files (x86)",
    r"C:\Users\user\AppData\Local\Programs",
    r"C:\Users\user\AppData\Local",
    r"C:\Users\user\AppData\Roaming"
]

found = []
for spath in search_paths:
    if os.path.exists(spath):
        for root, dirs, files in os.walk(spath):
            if "git.exe" in files:
                full_path = os.path.join(root, "git.exe")
                found.append(full_path)

print("GIT SEARCH RESULTS:")
for f in found:
    print(f" - {f}")
