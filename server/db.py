
rep = []

def add_item(item):
    rep.append(item)

def edit_item(item, index):
    rep[index] = item

def delete_item(index):
    rep.pop(index)

def get_items():
    return rep