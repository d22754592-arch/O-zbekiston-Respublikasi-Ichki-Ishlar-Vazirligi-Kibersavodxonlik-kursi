import os
import re

src_dir = r"c:\Users\user\Desktop\KURS\iib-kiberxavfsizlik-akademiyasi\src"

color_pattern = re.compile(
    r'(?:bg|text|border|ring)-(?:indigo|slate|emerald|rose|amber|purple|blue|zinc|gray)-(?:\d{2,3}(?:/\d{2})?)|style=\{\{[^}]+\}\}|#[0-9a-fA-F]{3,6}'
)

results_by_file = {}

for root, dirs, files in os.walk(src_dir):
    for file in files:
        if file.endswith(('.tsx', '.ts', '.css')):
            filepath = os.path.join(root, file)
            relpath = os.path.relpath(filepath, src_dir)
            with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
                lines = f.readlines()
                file_matches = []
                for idx, line in enumerate(lines, 1):
                    matches = color_pattern.findall(line)
                    if matches:
                        file_matches.append({
                            'line': idx,
                            'matches': sorted(list(set(matches))),
                        })
                if file_matches:
                    results_by_file[relpath] = file_matches

output_path = r"c:\Users\user\Desktop\KURS\iib-kiberxavfsizlik-akademiyasi\scratch\hardcoded_colors_report.txt"
with open(output_path, 'w', encoding='utf-8') as out:
    out.write("=== HARDCODED TAILWIND & HEX COLOR AUDIT REPORT ===\n\n")
    total_found = sum(len(v) for v in results_by_file.values())
    out.write(f"Total files with hardcoded colors: {len(results_by_file)}\n")
    out.write(f"Total lines with hardcoded color tokens: {total_found}\n\n")

    for fname, occurrences in results_by_file.items():
        out.write(f"📁 FILE: src\\{fname} ({len(occurrences)} lines)\n")
        for occ in occurrences:
            out.write(f"  - Line {occ['line']}: {', '.join(occ['matches'])}\n")
        out.write("\n")

print(f"Audit complete. Results saved to: {output_path}")
