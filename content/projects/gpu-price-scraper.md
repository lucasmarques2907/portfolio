---
title: "GPU Price Scraper"
createdAt: "2025-08-28"
github: "https://github.com/lucasmarques2907/gpu-price-scraper"
tags: ["python", "cli"]
image: "/projects/gpu-price-scraper.jpg"
imageAlt: "Preview do repositório gpu-price-scraper no GitHub"
summary: "Web scraper para procurar placas de vídeo com o menor preço disponível no site da Pichau Informática."
isFeatured: false
---

# gpu-price-scraper

## Sobre

Este projeto é um web scraper feito para procurar placas de vídeo com o menor preço possível nos provedores disponíveis.
Atualmente o projeto conta com somente um provedor [Pichau](https://www.pichau.com.br/), mas pretendo expandir futuramente, além de adicionar outras funcionalidades como especificações do modelo e comparação com outras placas de vídeo.

## Requisitos

Python 3.9 ou superior.

## Instalação

Linux / macOS:

1. `python3 -m venv .venv`
2. `source .venv/bin/activate`
3. `pip install -r requirements.txt`

Windows (PowerShell):

1. `py -m venv .venv`
2. `.venv\Scripts\Activate.ps1`
3. `pip install -r requirements.txt`

## Executar

- `python3 main.py`
