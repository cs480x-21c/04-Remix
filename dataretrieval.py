import requests
import json
import numpy as np
import pandas as pd
from datetime import datetime

#Reference: https://towardsdatascience.com/getting-weather-data-in-3-easy-steps-8dc10cc5c859
Token = 'SiHNpIkHCYKpbZcCefXXpAuQWFwrpuwH'

r = requests.get('https://www.ncdc.noaa.gov/cdo-web/api/v2/datasets', headers={'token':Token})
j = json.loads(r.content)
with open('datasets.json', 'w') as datasets:
	datasets.truncate(0)
	json.dump(j, datasets, indent=3, sort_keys=True)
