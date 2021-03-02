import pandas as pd

generationData = pd.read_csv('data/generation_cleaned.csv')
print(generationData.head())
types = list(generationData)
types.remove('year')
generationData['total'] = generationData[types].sum(axis=1)

print(generationData.head())

generationData.to_csv('data/generation_totals.csv', index=False)