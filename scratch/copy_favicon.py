import shutil

src_logo = r"c:\Users\user\Desktop\KURS\iib-kiberxavfsizlik-akademiyasi\src\components\iib.jpg"
public_logo = r"c:\Users\user\Desktop\KURS\iib-kiberxavfsizlik-akademiyasi\public\iib.jpg"
public_favicon = r"c:\Users\user\Desktop\KURS\iib-kiberxavfsizlik-akademiyasi\public\favicon.ico"

shutil.copyfile(src_logo, public_logo)
shutil.copyfile(src_logo, public_favicon)

print("Copied IIB logo from src/components/iib.jpg to public directory!")
