import os

src_dir = r"c:\Users\user\Desktop\KURS\iib-kiberxavfsizlik-akademiyasi"

for root, dirs, files in os.walk(src_dir):
    for file in files:
        if 'iib' in file.lower() or file.endswith(('.jpg', '.png', '.ico')):
            print(os.path.join(root, file))
