import numpy as np, wave, os
SR=44100
rng=np.random.default_rng(7)
def t(d): return np.linspace(0,d,int(SR*d),endpoint=False)
def env(n,a=0.005,r=0.2,curve=3):
    x=np.arange(n)/SR; e=np.minimum(x/a,1)*np.exp(-x*curve/max(r,1e-3)*1.0)
    return e
def lp(x,fc):
    X=np.fft.rfft(x); f=np.fft.rfftfreq(len(x),1/SR); X*=1/(1+(f/fc)**4); return np.fft.irfft(X,len(x))
def hp(x,fc):
    X=np.fft.rfft(x); f=np.fft.rfftfreq(len(x),1/SR); X*=1-1/(1+(f/fc)**4); return np.fft.irfft(X,len(x))
def bp(x,fc,w):
    X=np.fft.rfft(x); f=np.fft.rfftfreq(len(x),1/SR); X*=np.exp(-((f-fc)/w)**2); return np.fft.irfft(X,len(x))
def noise(d): return rng.standard_normal(int(SR*d))
def sweep(d,f0,f1,exp=True):
    tt=t(d); k=(f1/f0)**(tt/d) if exp else None
    ph=2*np.pi*f0*d/np.log(f1/f0)*(k-1) if exp else 2*np.pi*(f0*tt+(f1-f0)*tt**2/(2*d))
    return np.sin(ph)
def fade(x,a=0.005,b=0.02):
    n=len(x); fa=int(SR*a); fb=int(SR*b); x=x.copy(); x[:fa]*=np.linspace(0,1,fa); x[-fb:]*=np.linspace(1,0,fb); return x
def save(name,x,peak=0.8):
    x=fade(x); x=x/(np.abs(x).max()+1e-9)*peak
    with wave.open(f'public/sfx/{name}.wav','wb') as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((x*32767).astype('<i2').tobytes())
def whoosh(d,fc0,fc1,peak_at=0.5):
    n=noise(d); N=len(n); tt=np.arange(N)/N
    out=np.zeros(N); steps=24
    for i in range(steps):
        a=i/steps; fc=fc0*(fc1/fc0)**a
        seg=bp(n,fc,fc*0.5)
        w=np.exp(-((tt-a)/0.09)**2)
        out+=seg*w
    shape=np.sin(np.pi*np.clip(tt/ (1),0,1))**1.5
    shape=np.where(tt<peak_at,(tt/peak_at)**2,((1-tt)/(1-peak_at))**1.5)
    return out*shape
# transitions
save('whoosh',whoosh(0.9,300,5000,0.45))
save('whoosh_big',whoosh(1.2,120,3500,0.5)+0.5*lp(sweep(1.2,60,40),200)*np.sin(np.pi*t(1.2)/1.2))
save('whoosh_soft',whoosh(0.6,500,3000,0.4)*0.7)
save('swish_up',whoosh(0.5,400,7000,0.7))
save('swish_down',whoosh(0.5,7000,400,0.3))
# ui
e=env(int(SR*0.06),0.001,0.03,5); save('click',hp(noise(0.06),1500)*e+np.sin(2*np.pi*1800*t(0.06))*e*0.4)
e=env(int(SR*0.12),0.001,0.06,5); save('tick',np.sin(2*np.pi*2600*t(0.12))*e)
tt=t(0.22); save('pop',np.sin(sweep(0.22,300,900)*1)*np.exp(-tt*18)+0.2*hp(noise(0.22),3000)*np.exp(-tt*60))
tt=t(0.3); save('pop_low',np.sin(2*np.pi*(180*np.exp(-tt*8)+90)*tt)*np.exp(-tt*9))
# musical
def bell(f,d,amp=1):
    tt=t(d); return amp*(np.sin(2*np.pi*f*tt)*np.exp(-tt*4)+0.4*np.sin(2*np.pi*f*2.76*tt)*np.exp(-tt*7)+0.2*np.sin(2*np.pi*f*5.4*tt)*np.exp(-tt*11))
save('ding',bell(1318,1.2))
x=np.zeros(int(SR*1.4)); 
for i,f in enumerate([880,1108,1318]): 
    b=bell(f,1.0); s=int(SR*0.09*i); x[s:s+len(b)]+=b
save('success',x)
tt=t(0.5); b=np.sign(np.sin(2*np.pi*110*tt))*0.5+np.sin(2*np.pi*164*tt)*0.5; save('error',lp(b,900)*np.exp(-tt*4)*np.minimum(tt/0.01,1))
x=np.zeros(int(SR*0.9)); 
for i in range(3):
    b=lp(np.sign(np.sin(2*np.pi*140*t(0.18))),700)*np.exp(-t(0.18)*8); s=int(SR*0.22*i); x[s:s+len(b)]+=b
save('alert',x)
# glitch
x=np.zeros(int(SR*0.5))
for i in range(9):
    d=0.03+0.03*rng.random(); s=int(SR*i*0.05); seg=np.sign(np.sin(2*np.pi*(200+rng.random()*2500)*t(d)))*0.6+noise(d)*0.4
    x[s:s+len(seg)]+=seg*np.hanning(len(seg))
save('glitch',x)
# impact
tt=t(1.4); save('impact',np.sin(2*np.pi*(55*np.exp(-tt*2.2)+38)*tt)*np.exp(-tt*3.2)+0.5*lp(noise(1.4),400)*np.exp(-tt*5))
tt=t(0.5); save('stamp',np.sin(2*np.pi*(90*np.exp(-tt*10)+50)*tt)*np.exp(-tt*10)+0.6*hp(noise(0.5),800)*np.exp(-tt*40))
tt=t(2.2); save('riser',(lp(noise(2.2),6000)*0.5+0.5*np.sin(sweep(2.2,150,1800)))*(tt/2.2)**2)
tt=t(1.5); save('sub_drop',np.sin(2*np.pi*(120*np.exp(-tt*1.5)+35)*tt)*np.exp(-tt*2))
x=np.zeros(int(SR*1.2))
for i in range(14):
    f=2000+rng.random()*5000; d=0.4; s=int(SR*rng.random()*0.6); b=np.sin(2*np.pi*f*t(d))*np.exp(-t(d)*9)*0.5
    x[s:s+len(b)]+=b
save('shimmer',x)
x=np.zeros(int(SR*0.6))
for i in range(4):
    d=0.05; s=int(SR*i*0.1); b=np.sin(2*np.pi*(1200+i*300)*t(d))*np.hanning(int(SR*d)); x[s:s+len(b)]+=b
save('scan',x)
tt=t(0.1); save('blip',np.sin(2*np.pi*1500*tt)*np.hanning(len(tt)))
# logo sting: riser + impact + shimmer
L=np.zeros(int(SR*4.0))
r=(lp(noise(1.6),7000)*0.5+0.5*np.sin(sweep(1.6,120,2400)))*(t(1.6)/1.6)**2.2; L[:len(r)]+=r*0.6
tt=t(2.4); im=np.sin(2*np.pi*(60*np.exp(-tt*2)+40)*tt)*np.exp(-tt*2.2)+0.4*lp(noise(2.4),500)*np.exp(-tt*4)
s=int(SR*1.6); L[s:s+len(im)]+=im
for i,f in enumerate([659,880,1318,1760]):
    b=bell(f,2.0,0.5); s=int(SR*(1.65+0.1*i)); L[s:s+len(b)]+=b[:len(L)-s]
save('logo_sting',L)
# notification bell
x=np.zeros(int(SR*1.6))
for i,f in enumerate([1568,2093]): 
    b=bell(f,1.2); s=int(SR*0.18*i); x[s:s+len(b)]+=b
save('bell',x)
# typing burst
x=np.zeros(int(SR*0.8))
for i in range(10):
    s=int(SR*i*0.07); d=0.02; b=hp(noise(d),2000)*np.hanning(int(SR*d)); x[s:s+len(b)]+=b*(0.5+0.5*rng.random())
save('type',x)
# ambient pad loop 48s
D=48; tt=t(D); pad=np.zeros_like(tt)
chords=[[110,164.8,220,261.6],[87.3,130.8,174.6,261.6],[130.8,196,261.6,329.6],[98,146.8,196,246.9]]
seg=D/4
for k,ch in enumerate(chords):
    for f in ch:
        for det in (-0.4,0,0.5):
            s0=int(SR*seg*k); s1=int(SR*seg*(k+1)); n=s1-s0; ttt=np.arange(n)/SR
            w=np.sin(2*np.pi*(f+det)*ttt)+0.3*np.sin(2*np.pi*2*(f+det)*ttt)
            e=np.minimum(ttt/3,1)*np.minimum((seg-ttt)/3,1)
            pad[s0:s1]+=w*e*0.2
pad=lp(pad,1800); pad*=0.8+0.2*np.sin(2*np.pi*tt/12)
a=pad/np.abs(pad).max()*0.6
# loop crossfade not needed: chords start/end at zero env
with wave.open('public/sfx/ambient.wav','wb') as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((a*32767).astype('<i2').tobytes())
print(sorted(os.listdir('public/sfx')))
