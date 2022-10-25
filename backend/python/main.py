import os
import sys
import json
from docxtpl import DocxTemplate, InlineImage
from docx.shared import Cm


def pathsToInlineImages(paths, width):
    datos = []
    for path in paths:
        datos.append(InlineImage(doc, image_descriptor=os.path.abspath(path), width=Cm(width)))
    return datos


datos = json.loads(sys.argv[1])
doc = DocxTemplate(os.path.abspath(f"python/templates/{datos['docx']}"))

for lista in json.loads(datos['listas']):
    datos[lista['nombre']] = pathsToInlineImages(
        datos[lista['nombre']], lista['width'])

doc.render(datos)
doc.save(os.path.abspath(f"python/output/{datos['docxNew']}"))
