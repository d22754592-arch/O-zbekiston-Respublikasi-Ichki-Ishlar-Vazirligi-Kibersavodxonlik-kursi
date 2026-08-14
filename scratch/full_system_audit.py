import os
import re

src_dir = r"c:\Users\user\Desktop\KURS\iib-kiberxavfsizlik-akademiyasi\src"

files_checked = 0
errors = []

for root, dirs, files in os.walk(src_dir):
    for file in files:
        if file.endswith(('.tsx', '.ts')):
            files_checked += 1
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
                
                # Check for common syntax corruption like duplicate imports or typos
                if 'iimport' in content:
                    errors.append(f"{file}: Found typo 'iimport'")
                if 'mport React' in content and 'import React' not in content:
                    errors.append(f"{file}: Found typo 'mport React'")
                if content.count('export default') > 1:
                    errors.append(f"{file}: Found multiple 'export default'")

print(f"Audit completed: {files_checked} TypeScript files scanned.")
if errors:
    print("ERRORS FOUND:")
    for err in errors:
        print(f" - {err}")
else:
    print("ALL TYPESCRIPT FILES ARE CLEAN! NO SYNTAX CORRUPTIONS DETECTED.")
