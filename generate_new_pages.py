import os

lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit."

case_studies = {
    'projets': [
        "dev api", "conception infra", "lab soc", "maintenance sys et hard", "echec en C"
    ],
    'expertise': [
        "reseau et secu app", "iam", "sys et virt", "secu", "hardening", "prog"
    ]
}

with open("generate_pages.py", "r") as f:
    orig = f.read()
    
# Extract just the template from generate_pages.py
start = orig.find('html_template = """')
if start != -1:
    end = orig.find('"""', start + 20)
    html_template = orig[start + 19:end]
else:
    html_template = """<!DOCTYPE html>
<html lang="fr" data-theme="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title} | Peter Chatzigianis</title>
    <link rel="stylesheet" href="../style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&display=swap" rel="stylesheet">
    <style>
        body {{ display: block !important; overflow-y: auto !important; background-color: {bg_color} !important; }}
        #case-study-standalone {{ padding: 2rem; max-width: 900px; margin: 5rem auto 2rem auto; background-color: transparent; }}
        .close-modal {{ display: inline-block; margin-bottom: 2rem; }}
        @media (max-width: 768px) {{ #case-study-standalone {{ padding: 1rem; margin-top: 6rem; }} }}
    </style>
</head>
<body>
    <nav>
        <div class="mobile-nav-controls" style="display: flex; align-items: center; gap: 1.5rem; pointer-events: auto;">
            <button id="mobile-nav-toggle" class="btn-icon" style="font-size: 2.5rem; color: var(--text-primary); background: none; border: none; cursor: pointer;">
                <i class="fa-solid fa-bars"></i>
            </button>
            <a href="../index.html" class="mobile-nav-brand-pc" style="font-family: 'Space Grotesk', sans-serif; font-size: 1.8rem; font-weight: 700; color: var(--text-primary); cursor: pointer; border: 2px solid var(--text-primary); border-radius: 8px; padding: 0.2rem 0.8rem; display: inline-block; text-decoration: none;">P.C.</a>
        </div>
    </nav>
    <div id="case-study-standalone">
        <a href="../index.html" class="btn btn-secondary close-modal" style="text-decoration: none;"><i class="fa-solid fa-arrow-left"></i> Retour aux réalisations</a>
        <div class="section-header">
            <h2 class="gradient-text-blue" style="font-size: 2.5rem; text-align: left; margin-bottom: 1.5rem;">{title}</h2>
        </div>
        <img src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&auto=format&fit=crop&w=3840&q=80" alt="{title}" style="width: 100%; max-height: 400px; object-fit: cover; border-radius: 12px; margin-bottom: 3rem; border: 1px solid var(--border-color);">
        <div class="grid" style="grid-template-columns: 1fr; gap: 3rem;">
            <div>
                <h3 style="color: var(--accent-blue); margin-bottom: 1rem;"><i class="fa-solid fa-crosshairs"></i> Problématique</h3>
                <p style="font-size: 1.15rem; line-height: 1.8; color: var(--text-secondary); margin-bottom: 2rem;">{lorem}</p>
                <h3 style="color: var(--accent-green); margin-bottom: 1rem;"><i class="fa-solid fa-gears"></i> Approche & Méthodologie</h3>
                <p style="font-size: 1.15rem; line-height: 1.8; color: var(--text-secondary);">{lorem}</p>
            </div>
            <div style="background: rgba(0,0,0,0.2); padding: 2rem; border-radius: 12px; border: 1px solid var(--border-color);">
                <h3 style="color: #ef4444; margin-bottom: 1rem;"><i class="fa-solid fa-triangle-exclamation"></i> Obstacles</h3>
                <p style="margin-bottom: 3rem; color: var(--text-secondary);">{lorem}</p>
                <h4 style="color: var(--text-primary); margin-bottom: 0.5rem;"><i class="fa-solid fa-check-circle" style="color: var(--accent-green); margin-right: 0.5rem;"></i> Solution</h4>
                <p style="line-height: 1.8; color: var(--text-secondary);">{lorem}</p>
            </div>
        </div>
        <a href="../index.html" class="btn btn-secondary" style="margin-top: 3rem; width: 100%; text-decoration: none; text-align: center; display: block;">Retour aux réalisations</a>
    </div>
</body>
</html>"""

os.makedirs('projets', exist_ok=True)
os.makedirs('expertise', exist_ok=True)

for folder, items in case_studies.items():
    bg_color = "#473346" if folder == "projets" else "#57384D"
    for item in items:
        # Cleanly replace spaces with hyphens, handle accented characters if any (not really needed here, just hyphens)
        filename = item.replace(" ", "-") + ".html"
        filepath = os.path.join(folder, filename)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(html_template.format(
                title=item.title(),
                image="https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&auto=format&fit=crop&w=3840&q=80",
                bg_color=bg_color,
                lorem=lorem
            ))
        print(f"Created {filepath}")
