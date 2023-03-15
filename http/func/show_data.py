from flask import request, render_template, make_response
import json
import os
import pandas as pd
from dotenv import load_dotenv

load_dotenv()

def showData():
    token = request.cookies.get('token')
    flag = not token
    if flag:
        token = os.getenv('TEST_TOKEN')
        
    data_file_path = f"./local/user_{token}.csv"
    print("data_file_path", data_file_path)
    if not os.path.exists(data_file_path):
        with open(data_file_path,"w") as f:
            print("date,matrix",file=f)
            pass
    uploaded_df = pd.read_csv(data_file_path, encoding='utf-8') # 'unicode_escape'
    print("uploaded_df", uploaded_df)
    uploaded_df_html = uploaded_df.to_html()
    res = make_response(render_template('show_database.html', data_var=uploaded_df_html))
    if flag:
        res.set_cookie(key='token', value=token, expires=None)
    return res

__exports__ = {
    "name" : "show_data",
    "path" : "/show_data",
    "methods": ['GET','POST' ],
    "execute": showData
}
