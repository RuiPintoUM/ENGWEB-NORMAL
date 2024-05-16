import pandas as pd

# Carrega o dataset CSV
df = pd.read_csv('contratos2024.csv', delimiter=';')

# Converte o DataFrame para JSON
json_str = df.to_json(orient='records', force_ascii=False)

# Salva o JSON em um arquivo
with open('contratos2024.json', 'w', encoding='utf-8') as f:
    f.write(json_str)

print("O arquivo JSON foi criado com sucesso!")