import glob

html_files = glob.glob('**/*.html', recursive=True)
py_files = glob.glob('*.py')

old_fa = '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">'
new_fa = '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer">'

old_gf = '<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&display=swap" rel="stylesheet">'
new_gf = '<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&display=swap" rel="stylesheet" crossorigin="anonymous">'

for file_list in [html_files, py_files]:
    for filepath in file_list:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        if old_fa in content or old_gf in content:
            content = content.replace(old_fa, new_fa)
            content = content.replace(old_gf, new_gf)
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Updated {filepath}")
