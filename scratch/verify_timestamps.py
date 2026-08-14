import os
import time

src_dir = r"c:\Users\user\Desktop\KURS\iib-kiberxavfsizlik-akademiyasi\src"
now = time.time()

for root, dirs, files in os.walk(src_dir):
    for file in files:
        filepath = os.path.join(root, file)
        mtime = os.path.getmtime(filepath)
        diff = now - mtime
        if diff < 600:
            print(f" - {os.path.relpath(filepath, src_dir)}: modified {int(diff)}s ago")
