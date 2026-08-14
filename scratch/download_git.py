import urllib.request
import os

url = "https://github.com/git-for-windows/git/releases/download/v2.45.2.windows.1/Git-2.45.2-64-bit.exe"
dest = r"c:\Users\user\Desktop\KURS\iib-kiberxavfsizlik-akademiyasi\scratch\GitSetup.exe"

print("Downloading Git installer...")
urllib.request.urlretrieve(url, dest)
print(f"Downloaded Git installer! Size: {os.path.getsize(dest)/(1024*1024):.2f} MB")
