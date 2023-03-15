from flask import render_template
def weblist():
    return render_template("weblist.html")

__exports__ = {
    "name" : "weblist",
    "path" : "/weblist",
    "methods": ['GET'],
    "execute": weblist
}
