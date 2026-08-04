import json
import sys

with open("seo_payload_output_2.json") as f:
    text = f.read()

start = text.find("[")
text = text[start:]
data = json.loads(text)

for page in data:
    route = page["route"]
    print(f"\n--- {route} ---")
    
    ptext = page["cleanText"].lower()
    headings = " ".join([h["text"] for h in page["headings"]]).lower()
    
    if route == "/corporate-advisory":
        for entity in ["asesoría corporativa", "derecho mercantil", "cumplimiento normativo", "gobierno corporativo"]:
            print(f"Entity check (Corp) - {entity}:", "FOUND" if entity in ptext or entity in headings else "MISSING")
    
    if route == "/workers-advisory":
        for entity in ["derecho laboral", "asesoría a trabajadores", "contratos individuales", "seguridad social"]:
            print(f"Entity check (Work) - {entity}:", "FOUND" if entity in ptext or entity in headings else "MISSING")
            
    for jd in page.get("jsonLd", []):
        t = jd.get("@type")
        print(f"Schema @type: {t}")
        print(f"URL: {jd.get('url')}")
        
        phone = jd.get("telephone", "")
        addr = jd.get("address", {}).get("streetAddress", "")
        if phone:
            print(f"Phone JSON-LD: {phone}, present in text:", phone in page["cleanText"] or "+52" in page["cleanText"])
        if addr:
            print(f"Addr JSON-LD: {addr}, present in text:", addr in page["cleanText"])
