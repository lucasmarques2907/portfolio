---
title: "Pokédex"
createdAt: "2026-09-05"
github: "https://github.com/lucasmarques2907/pokedex"
tags: ["python", "api", "cli"]
image: "/projects/pokedex.jpg"
imageAlt: "Preview do repositório pokedex no GitHub"
summary: "Pokédex em CLI com comandos de exploração de áreas, captura de pokémons, detalhes, etc. Dados consumidos da PokeAPI."
isFeatured: false
---

## Sobre

Pokédex em CLI feito com o objetivo de aprender como funcionam requisições HTTP e como manipulá-las.

## Comandos

help:

- Uso: `help`
- Descrição: Mostra todos os comandos disponíveis.

map:

- Uso: `map`
- Descrição: Retorna a próxima página de locais disponíveis.

mapb:

- Uso: `mapb`
- Descrição: Retorna a página anterior de locais disponíveis.

explore:

- Uso: `explore <location_name>`
- Descrição: Explora a localização especificada, retornando uma lista de Pokémons disponíveis.

catch:

- Uso: `catch <pokemon_name>`
- Descrição: Tenta capturar um Pokémon específico.

inspect:

- Uso: `inspect <pokemon_name>`
- Descrição: Retorna detalhes sobre um Pokémon capturado.

pokedex:

- Uso: `pokedex`
- Descrição: Retorna todos os Pokémons capturados.

exit:

- Uso: `exit`
- Descrição: Finaliza o programa.

## Tech Stack

Python @ 3.13
