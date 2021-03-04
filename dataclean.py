import pandas as pd

generationData = pd.read_csv('data/generation_cleaned.csv')
types = list(generationData)
types.remove('year')
generationData.to_csv('data/generation.csv', index=False)
generationData['total'] = generationData[types].sum(axis=1)

generationData.to_csv('data/generation_totals.csv', index=False)