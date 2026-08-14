import os
import shutil

video_src = r"c:\Users\user\Desktop\KURS\iib-kiberxavfsizlik-akademiyasi\kibersavodxon slayd\video_2026-08-14_21-49-56.mp4"
video_dst = r"c:\Users\user\Desktop\KURS\iib-kiberxavfsizlik-akademiyasi\public\video_intro.mp4"

if os.path.exists(video_src):
    shutil.copyfile(video_src, video_dst)
    print("SUCCESS: Copied user video to public/video_intro.mp4!")
else:
    print("Video src file not found.")
