#! /usr/bin/env python
import sys,os,re

def nth_replace(string, old, new, n=1, option='only nth'):
    """
    This function replaces occurrences of string 'old' with string 'new'.
    There are three types of replacement of string 'old':
    1) 'only nth' replaces only nth occurrence (default).
    2) 'all left' replaces nth occurrence and all occurrences to the left.
    3) 'all right' replaces nth occurrence and all occurrences to the right.
    """
    if option == 'only nth':
        left_join = old
        right_join = old
    elif option == 'all left':
        left_join = new
        right_join = old
    elif option == 'all right':
        left_join = old
        right_join = new
    else:
        print("Invalid option. Please choose from: 'only nth' (default), 'all left' or 'all right'")
        return None
    groups = string.split(old)
    nth_split = [left_join.join(groups[:n]), right_join.join(groups[n:])]
    return new.join(nth_split)

if len(sys.argv) == 2:
    file_name = sys.argv[1]
    print(file_name)
    with open(file_name,'r+') as f:
        contents = f.read()
        contents = nth_replace(contents,'pick','s',2,'all right')
        f.seek(0)
        f.write(contents)
        f.truncate()


sys.exit(0)