import os

pub_video = r"c:\Users\user\Desktop\KURS\iib-kiberxavfsizlik-akademiyasi\public\video_intro.mp4"

if os.path.exists(pub_video):
    size = os.path.getsize(pub_video)
    print(f"CONFIRMED: public/video_intro.mp4 exists! Size: {size / (1024*1024):.2f} MB")
else:
    print("ERROR: public/video_intro.mp4 missing.")
