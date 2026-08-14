import os

setup_file = r"c:\Users\user\Desktop\KURS\iib-kiberxavfsizlik-akademiyasi\scratch\GitSetup.exe"

if os.path.exists(setup_file):
    size = os.path.getsize(setup_file)
    print(f"Git setup downloaded! Size: {size / (1024*1024):.2f} MB")
else:
    print("Git setup file downloading...")
