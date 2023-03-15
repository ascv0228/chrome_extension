
def webListHtml(url, text, methods, type):
    if (type == "head"):
        return """<!DOCTYPE html>
<html>
    
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>WebList</title>
        <meta name="description" content="WebList">
    </head>
    <body>
    <table border=border-collapse:collapse style="font-size:20px;"> <tr> <th>url</th><th>methods</th></tr>"""
    elif type == "end":
        return """    </table>        
    </body>
</html>"""
    else:
        return f"<tr> <th> "+ f'<a href=\'{url}\'>{text}</a></th>' + f"<th>{', '.join(methods)}</th></tr>"
    

