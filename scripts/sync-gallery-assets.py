"""Copy original transparent front/back PNGs unchanged and create the gallery manifest."""
import hashlib,json,shutil
from pathlib import Path
from PIL import Image
source=Path('h1 image'); dest=Path('public/gallery/images');dest.mkdir(parents=True,exist_ok=True)
items=[
('corporate-puffer','Corporate executive puffer','corporate','cooperate pro.png','Black','Puffer'),
('campus-softshell','Campus crest softshell','campus','campus pro.png','Navy','Softshell'),
('healthcare-softshell','Healthcare executive softshell','healthcare','healthcrae pro.png','Navy','Softshell'),
('logistics-red','Logistics contrast softshell','logistics','Logistics Pro Black hooded softshell with red accents-1.png','Black / red','Softshell'),
('logistics-black','Logistics classic softshell','logistics','logistics Pro Black softshell jacket front and back-3.png','Black','Softshell'),
('logistics-industrial','Logistics industrial softshell','logistics','Logisctics Pro Black hooded industrial softshell front and back-4.png','Black / red','Softshell'),
('mining-reflective','Mining reflective softshell','mining','miniming pro reflective stripe Hi-vis black hooded softshell, front and back-2.png','Black / high-vis','Softshell'),
('mining-orange','Mining orange safety jacket','mining','miniming pro Reflective orange mining jacket, front and back-5.png','Orange','Safety jacket'),
('mining-yellow','Mining yellow safety jacket','mining','minin pro yello .png','Yellow / black','Safety jacket'),
('mining-bodywarmer','Mining high-vis bodywarmer','mining','minimg pro Yellow mining without hand ront and back-7.png','Yellow','Bodywarmer'),
('mining-puffer','Mining heavy-duty puffer','mining','minimg pro Heavy-Duty Mining Puffer, Front and Back-9.png','Orange / navy','Puffer'),
('safari-puffer','Safari olive puffer','safari','safari pro dhort Olive puffer jacket front and back-11.png','Olive','Puffer'),
('safari-olive-parka','Safari olive hooded parka','safari','safa ri pro Olive Hooded Coat, Front and Back-12.png','Olive','Parka'),
('safari-camo','Safari camouflage parka','safari','safari pro long arrmy color.png','Camouflage','Parka'),
('safari-brown','Safari earth-tone parka','safari','safar pro brown long .png','Earth brown','Parka'),
('sport-gradient','Sport white-to-blue windbreaker','sport','sport pro wind breaker .png','White / blue','Windbreaker'),
('sport-blue','Sport sky-blue windbreaker','sport','sports pro blue black Sky blue windbreaker front and back-15.png','Sky blue / black','Windbreaker'),
('sport-bodywarmer','Sport performance bodywarmer','sport','sports pro armless.png','Blue / black','Bodywarmer'),
('sport-fleece','Sport technical fleece','sport','Sports pro Black technical fleece jacket, front and back-8.png','Black / orange','Fleece'),
('sport-coach','Sport extreme-cold coaches parka','sport','sport pro coaches Black extreme cold parka, front and back-10.png','Black','Parka'),
]
manifest=[]
for id,name,collection,filename,colour,kind in items:
 f=source/filename;raw=f.read_bytes();hash=hashlib.sha256(raw).hexdigest()[:10];path=dest/f'{id}.{hash}.png';shutil.copyfile(f,path);im=Image.open(f)
 manifest.append(dict(id=id,name=name,collection=collection,image='/gallery/images/'+path.name,colour=colour,kind=kind,aspect=im.width/2/im.height))
Path('src/gallery/products.json').write_text(json.dumps(manifest,indent=2)+'\n')
print('Copied',len(manifest),'original RGBA PNGs without modifying pixels.')
