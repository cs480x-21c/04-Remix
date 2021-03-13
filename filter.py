#read the file which the name was provided 
# log desired information in a master file 
# desired information: 1910-2019 top names, including state

import csv 

stateFiles = ['AK','AL','AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL','GA', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA', 'WI', 'WV', 'WY']

for state in range(52):
    check = True
    csvFile = open(('namesbystate/'+stateFiles[state]+".TXT") , 'r', newline='')
    obj= csv.reader(csvFile)
    csvMaster = open('master.csv', 'a+', newline='')
    obj2 = csv.writer(csvMaster)
    year = "1910"
    for entry in obj:
        if entry[2] == year:
            obj2.writerow(entry)
            year = str(int(year) +1)

