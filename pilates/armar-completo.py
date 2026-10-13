"""Arma pilates-completo.html: la landing en un solo archivo (estilos, scripts e imágenes adentro).
Uso: python3 armar-completo.py  (desde la carpeta pilates/)"""
import re, base64

def uri(p):
    mime = {'webp': 'image/webp', 'png': 'image/png', 'jpg': 'image/jpeg'}[p.rsplit('.', 1)[1]]
    return f'data:{mime};base64,' + base64.b64encode(open(p, 'rb').read()).decode()

s = open('index.html').read()
css = open('../styles.css').read() + '\n' + open('pilates.css').read()
links = '<link rel="stylesheet" href="../styles.css">\n  <link rel="stylesheet" href="pilates.css">'
assert links in s
s = s.replace(links, '<style>\n' + css + '\n</style>')
s = re.sub(r'<meta property="og:image"[^>]*>\n\s*', '', s)
s = s.replace('href="../assets/favicon.png"', 'href="' + uri('../assets/favicon.png') + '"')

# Cada imagen va incrustada en su lugar, así se ven aunque el visor no ejecute scripts
cache = {}
def img(m):
    p = m.group(1)
    if p not in cache:
        cache[p] = uri(p)
    return f'src="{cache[p]}"'
s = re.sub(r'src="((?:\.\./)?assets/[^"]+)"', img, s)
s = s.replace(' loading="lazy"', '')

js = '\n'.join(open(f).read() for f in ['config.js', '../main.js', 'pilates.js'])
scripts = '<script src="config.js"></script>\n<script src="../main.js"></script>\n<script src="pilates.js"></script>'
assert scripts in s
s = s.replace(scripts, '<script>\n' + js + '\n</script>')

open('pilates-completo.html', 'w').write(s)
print(f'pilates-completo.html: {len(s) // 1024} KB, {len(cache)} imágenes')
