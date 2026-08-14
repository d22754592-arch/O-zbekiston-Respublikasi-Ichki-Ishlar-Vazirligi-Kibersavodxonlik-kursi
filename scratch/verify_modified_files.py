import os
import time

src_dir = r"c:\Users\user\Desktop\KURS\iib-kiberxavfsizlik-akademiyasi\src"
now = time.time()

modified_recently = []
for root, dirs, files in os.walk(src_dir):
    for file in files:
        filepath = os.path.join(root, file)
        mtime = os.path.getmtime(filepath)
        # Check files modified in the last 10 minutes
        if now - mtime < 600:
            modified_recently.append(os.path.relpath(filepath, src_dir))

print("MODIFIED FILES IN SRC IN LAST 10 MINUTES:")
for f in modified_recently:
    print(f" - {f}")
