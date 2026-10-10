import sys,glob,os
from PIL import Image, ImageDraw
d=sys.argv[1]; cols=int(sys.argv[2]) if len(sys.argv)>2 else 2
fs=sorted(glob.glob(d+'/f*.png'), key=lambda p:int(os.path.basename(p)[1:-4]))
a=int(sys.argv[3]) if len(sys.argv)>3 else 0; b=int(sys.argv[4]) if len(sys.argv)>4 else len(fs); fs=fs[a:b]
w,h=960,540; rows=(len(fs)+cols-1)//cols
S=Image.new('RGB',(w*cols,h*rows))
for i,p in enumerate(fs):
    im=Image.open(p).convert('RGB').resize((w,h)); ImageDraw.Draw(im).text((10,10),os.path.basename(p),fill=(255,255,0)); S.paste(im,((i%cols)*w,(i//cols)*h))
S.save(d+f'/sheet{a}.png')
