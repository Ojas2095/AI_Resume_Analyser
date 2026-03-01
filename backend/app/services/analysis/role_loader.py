import json
from pathlib import Path

ROLE_PATH=Path(__file__).resolve().parents[2]/"data"/"roles"
def load_role(role_name:str)->dict:
    file_name=role_name.lower().replace(" ", "_")+".json"
    path=ROLE_PATH/file_name

    if not path.exists():
        raise FileNotFoundError(f"Role '{role_name}' not found")
    with open(path,"r",encoding="utf-8")as f:
        return json.load(f)
        