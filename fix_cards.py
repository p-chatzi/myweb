import re

with open('/var/www/html/index.html', 'r') as f:
    content = f.read()

url_map = {
    'tech-0': 'expertise/reseau-et-secu-app.html',
    'tech-1': 'expertise/iam.html',
    'tech-2': 'expertise/sys-et-virt.html',
    'tech-3': 'expertise/secu.html',
    'tech-4': 'expertise/hardening.html',
    'tech-5': 'expertise/prog.html',
    'projet-0': 'projets/dev-api.html',
    'projet-1': 'projets/conception-infra.html',
    'projet-2': 'projets/lab-soc.html',
    'projet-3': 'projets/maintenance-sys-et-hard.html',
    'projet-4': 'projets/echec-en-C.html'
}

for modal_id, url in url_map.items():
    pattern = r'(<div class="card")([^>]*>(?:(?!<div class="card").)*?)(<button[^>]+onclick="window\.location\.href=\'' + re.escape(url) + r'\'"[^>]*>.*?</button>\s*)'
    
    def repl(m):
        return f'{m.group(1)} style="cursor: pointer;" onclick="handleCardClick(event, \'{modal_id}\', \'{url}\')"{m.group(2)}'
    
    content, count = re.subn(pattern, repl, content, flags=re.DOTALL)
    print(f"Replaced {modal_id}: {count}")

with open('/var/www/html/index.html', 'w') as f:
    f.write(content)
