# -*- coding:utf-8 -*-
from __future__ import print_function
import pickle,sys,os
import os.path
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
import json
from collections import OrderedDict
import codecs
import my_input
import merge_all_json

# If modifying these scopes, delete the file token.pickle.
SCOPES = ['https://www.googleapis.com/auth/spreadsheets']

# The ID and range of a sample spreadsheet.
SAMPLE_SPREADSHEET_ID = '1LHUiQZcpNqDbT1EvNPLHGv_u8xFo2qGmcioSa9gvAME'
SAMPLE_RANGE_NAME = 'A1:C1'

def file_extension(path): 
	return os.path.splitext(path)[1]

def file_without_extension(path): 
	return os.path.splitext(os.path.basename(path))[0] 

def get_json_data(f):
    with open(f, "r") as load_f:
        # sys.getfilesystemencoding()
        load_dict = json.load(load_f,"utf-8")
        return load_dict

def test_sample(service):
    # Call the Sheets API
    sheet = service.spreadsheets()
    result = sheet.values().get(spreadsheetId=SAMPLE_SPREADSHEET_ID,
                                range=SAMPLE_RANGE_NAME).execute()
    values = result.get('values', [])

    if not values:
        print('No data found.')
    else:
        print('Name, Major:')
        for row in values:
            # Print columns A and E, which correspond to indices 0 and 4.
            print('%s, %s' % (row[0], row[1]))

def test_write_sheet(service):
    spreadsheet = {
        'properties': {
            'title': "Npc"
        }
    }
    spreadsheet = service.spreadsheets().create(body=spreadsheet,
                                        fields='spreadsheetId').execute()
    print('Spreadsheet ID: {0}'.format(spreadsheet.get('spreadsheetId')))

def update_sheet(values,service,range,iOpt="RAW",spreadsheet_id=SAMPLE_SPREADSHEET_ID):
    body = {
        'values': values
    }
    result = service.spreadsheets().values().update(
        spreadsheetId=spreadsheet_id, range=range,
        valueInputOption=iOpt, body=body).execute()
    print('{0} cells updated.'.format(result.get('updatedCells')))

def number2char(number):
    if number < 10:
        return str(number)
    else:
        return chr( ord('A') + (number - 10))

def char2number(ch):
    o_ch = ord(ch)
    if o_ch >= ord('0') and o_ch <= ord('9'):
        return int(ch)
    else:
        off = o_ch - ord('A')
        return 10 + off

def write_2_sheet(js_data,sheet_name,service):
    data = js_data["data"]
    keys = js_data["keys"]
    default = js_data["default"]

    results_raws = []
    # write keys
    keys_sort = []
    for k in keys:
        keys_sort.append([char2number(keys[k]),k])
    keys_sort.sort()
    keys_sort2 = ['id']
    keys_type = ['STR']
    for x in keys_sort:
        keys_sort2.append(x[1])
        keys_type.append("STR")
    
    max_key_len = len(keys_sort2)
    results_raws.append(keys_sort2)
    results_raws.append(keys_type)
    # default values
    default_values = []
    for k in keys_sort2:
        if k in default:
            default_values.append(default.get(k))
        else:
            default_values.append(None)
            pass

    results_raws.append(default_values)
    # data
    data_ids = []
    for x in data:
        data_ids.append(int(x))
    data_ids.sort()

    for x_id in data_ids:
        x = str(x_id)
        t_row = [x]
        t_d = data[x]
        for i in range(max_key_len):
            i_str = number2char(i)
            if i_str in t_d:
                tType = type(t_d[i_str])
                if tType is list or tType is dict:
                    t_row.append(json.dumps(t_d[i_str],ensure_ascii=False))
                    if keys_type[i+1] == "STR":
                        keys_type[i+1] = "JSON"
                else:
                    t_row.append(t_d[i_str])
                    if tType is int:
                        if keys_type[i+1] == "STR":
                            keys_type[i+1] = "INT"
                    elif tType is float:
                        if keys_type[i+1] == "STR" or keys_type[i+1] == "INT":
                            keys_type[i+1] = "FLOAT"
                    
            else:
                t_row.append(None)
        results_raws.append(t_row)
    
    update_sheet(results_raws,service,sheet_name)

def init_set_sheet(service):
    js_path = "decode1/data_decode.json"
    js_data = get_json_data(js_path)
    test_name = "Task"
    # write_2_sheet(js_data[test_name],test_name,service)
    for x in js_data:
        write_2_sheet(js_data[x],x,service)

def get_all_sheets(service,spreadsheet_id=SAMPLE_SPREADSHEET_ID):
    sheet_metadata = service.spreadsheets().get(spreadsheetId=spreadsheet_id).execute()
    sheets = sheet_metadata.get('sheets', '')
    res = []
    for x in sheets:
        title = x.get("properties", {}).get("title", "Sheet1")
        res.append(title)
    return res

def pull_all_sheets(service,spreadsheet_id=SAMPLE_SPREADSHEET_ID,dst_dir="/Users/tangwen/Documents/my_projects/cocos_creator/some_comp/dbs/c_dbs"):
    all_sheets = get_all_sheets(service,spreadsheet_id)
    for x in all_sheets:
        pull_json_from_sheet(service,x,spreadsheet_id,dst_dir)

    is_merge = my_input.my_input(u"是否合并所有表?(y/n)") == 'y'
    if is_merge:
        merge_all_json.merge_all_json(dst_dir)

def pull_json_from_sheet(service,table_name="Map",spreadsheet_id=SAMPLE_SPREADSHEET_ID,dst_dir="/Users/tangwen/Documents/my_projects/cocos_creator/some_comp/dbs/c_dbs"):
    sheets = get_all_sheets(service)
    result = service.spreadsheets().values().get(spreadsheetId=spreadsheet_id,range=table_name).execute()
    values = result["values"]
    keys = values[0]
    types = values[1]
    res = None
    if len(values) > 2:
        default = values[2]
        default_len = len(values[2])
        res = {}
        keys_mp = {}
        default_mp = {}
        for i,x in enumerate(keys):
            keys_mp[x] = number2char(i)
            if i < default_len and default[i] != None and default[i] != u"":
                if types[i] == "INT":
                    default_mp[x] = int(default[i])
                elif types[i] == "FLOAT":
                    default_mp[x] = float(default[i])
                else:
                    default_mp[x] = default[i]
        res["keys"] = keys_mp
        res["default"] = default_mp

        data = {}
        for x in values[3:]:
            id0 = x[0]
            data[id0] = {}
            for iy,y in enumerate(x[1:]):
                if y != None and y != u"":
                    t_iy = iy + 1
                    if types[t_iy] == "INT":
                        data[id0][number2char(t_iy)] = int(y)
                    elif types[t_iy] == "FLOAT":
                        data[id0][number2char(t_iy)] = float(y)
                    elif types[t_iy] == "JSON":
                        try:
                            jy = json.loads(y,"utf-8")
                            data[id0][number2char(t_iy)] = jy
                        except Exception as e:
                            data[id0][number2char(t_iy)] = y
                    else:
                        data[id0][number2char(t_iy)] = y
        od = OrderedDict(sorted(data.items(), key=lambda t: int(t[0])))
        res["data"] = od
    else:
        res = {
            "data": {},
            "keys": {},
            "default": {}
        }
    if not os.path.exists(dst_dir):
        os.makedirs(dst_dir)
    fp = codecs.open(os.path.join(dst_dir,table_name+".json"), 'w', 'utf-8')
    fp.write(json.dumps(res,ensure_ascii=False))
    fp.close()
    print("save {} successful".format(table_name+".json"))

def main():
    """Shows basic usage of the Sheets API.
    Prints values from a sample spreadsheet.
    """
    creds = None
    # The file token.pickle stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for the first
    # time.
    if os.path.exists('token.pickle'):
        with open('token.pickle', 'rb') as token:
            creds = pickle.load(token)
    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                'credentials.json', SCOPES)
            creds = flow.run_local_server(port=0)
        # Save the credentials for the next run
        with open('token.pickle', 'wb') as token:
            pickle.dump(creds, token)

    service = build('sheets', 'v4', credentials=creds)

    spreadsheet_id = SAMPLE_SPREADSHEET_ID
    # 
    # test_write_sheet(service)
    # 

    # init_set_sheet(service)
    # 
    # pull_json_from_sheet(service)
    pull_all_sheets(service,SAMPLE_SPREADSHEET_ID,"/Users/mac/Documents/my_projects/creator_proj/some_component/server/game-server/s_dbs")
    # merge_all_json.merge_all_json("/Users/tangwen/Documents/my_projects/cocos_creator/some_comp/dbs/c_dbs")

def test():
    # la = [[1,3],[5,5],[2,3]]
    # la.sort()
    # lb = la
    a = number2char(5)
    b = char2number("B")
    pass

if __name__ == '__main__':
    # test()
    main()
    pass