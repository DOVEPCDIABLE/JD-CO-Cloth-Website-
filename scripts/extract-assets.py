"""Extract website photography from the supplied JD catalogues (PyMuPDF/Pillow)."""
import glob, fitz
from PIL import Image
from collections import deque
from pathlib import Path
out=Path('public/images');out.mkdir(parents=True,exist_ok=True)
def page(name,n):
 f=glob.glob('webiste-detals/JD '+name+'*.pdf')[0];p=fitz.open(f)[n];pix=p.get_pixmap(matrix=fitz.Matrix(4,4));return Image.frombytes('RGB',(pix.width,pix.height),pix.samples)
def crop(im,box):return im.crop(tuple(int(v*s) for v,s in zip(box,(im.width,im.height,im.width,im.height))))
def cut(im,name,dark=False):
 im=im.convert('RGBA');px=im.load();w,h=im.size;seen=set();q=deque([(x,0) for x in range(w)]+[(x,h-1) for x in range(w)]+[(0,y) for y in range(h)]+[(w-1,y) for y in range(h)])
 while q:
  x,y=q.popleft()
  if (x,y) in seen or not(0<=x<w and 0<=y<h):continue
  seen.add((x,y));r,g,b,a=px[x,y]
  bg=max(r,g,b)<48 if dark else min(r,g,b)>145 and max(r,g,b)-min(r,g,b)<50
  if bg:
   px[x,y]=(r,g,b,0);q.extend([(x+1,y),(x-1,y),(x,y+1),(x,y-1)])
 im.save(out/(name+'.webp'))
corp=page('corporate',3)
cut(crop(corp,(.012,.307,.12,.507)),'corporate');cut(crop(corp,(.02,.507,.115,.664)),'corporate-back')
cut(crop(corp,(.13,.307,.237,.507)),'corporate-navy')
cut(crop(page('Sport',0),(.319,.34,.394,.49)),'sport')
cut(crop(page('safari',0),(.016,.568,.077,.714)),'safari')
cut(crop(page('campos',1),(.54,.205,.602,.342)),'campus')
cut(crop(page('healthcare',4),(.02,.53,.09,.67)),'healthcare')
cut(crop(page('logistics',0),(.519,.225,.58,.38)),'logistics',True)
cut(crop(page('tactical',1),(.52,.24,.58,.4)),'tactical',True)
cut(crop(page('mining',0),(.515,.195,.575,.37)),'mining',True)
crop(corp,(.5,.12,.99,.405)).save(out/'corporate-team.webp')
crop(page('safari',0),(.155,.07,.498,.54)).save(out/'safari-team.webp')
crop(page('logistics',0),(.159,.04,.498,.49)).save(out/'logistics-team.webp')
crop(page('healthcare',0),(.155,.048,.498,.49)).save(out/'healthcare-team.webp')
# Dark catalogue pages need a silhouette mask rather than a luminance key:
# their jacket fabric and their page backgrounds both contain near-black pixels.
from PIL import ImageDraw
for source,n,box,name in [
 ('logistics',0,(.518,.232,.581,.381),'logistics'),
 ('tactical',1,(.516,.249,.595,.365),'tactical'),
 ('mining',0,(.624,.224,.677,.376),'mining')]:
 im=crop(page(source,n),box).convert('RGBA');w,h=im.size;mask=Image.new('L',im.size);draw=ImageDraw.Draw(mask)
 points=[(.37,0),(.66,0),(.69,.09),(.85,.17),(.94,.28),(1,.96),(.79,1),(.73,.51),(.73,1),(.25,1),(.25,.51),(.2,1),(0,.97),(.05,.3),(.17,.17),(.34,.09)]
 draw.polygon([(int(x*w),int(y*h)) for x,y in points],fill=255);im.putalpha(mask);im.save(out/(name+'.webp'))
cut(crop(page('healthcare',4),(.513,.758,.545,.826)),'healthcare')
# Remove disconnected label pixels around the product cutouts.
for path in out.glob('*.webp'):
 if 'team' in path.name:continue
 im=Image.open(path).convert('RGBA');w,h=im.size;px=im.load();seen=set();parts=[]
 for y in range(h):
  for x in range(w):
   if (x,y) in seen or px[x,y][3]<100:continue
   comp=[];q=deque([(x,y)]);seen.add((x,y))
   while q:
    a,b=q.popleft();comp.append((a,b))
    for c,d in [(a+1,b),(a-1,b),(a,b+1),(a,b-1)]:
     if 0<=c<w and 0<=d<h and (c,d) not in seen and px[c,d][3]>=100:seen.add((c,d));q.append((c,d))
   parts.append(comp)
 if parts:
  largest=max(parts,key=len);keep=set(largest)
  for comp in parts:
   if comp is largest:continue
   for x,y in comp:px[x,y]=(0,0,0,0)
 im.save(path)

# Trim unused transparent space in the smaller healthcare cutout.
p=out/'healthcare.webp';im=Image.open(p);im.crop(im.getbbox()).save(p)
