# 🎵 Spotify App – Django + React SPA

## 📌 Sobre o projeto

- Esta aplicação é uma Single Page Application (SPA) construída com React no frontend e Django no backend, com integração à API do Spotify.
- O objetivo é fornecer uma experiência completa de autenticação, consumo de dados e interação com os recursos do Spotify, unindo a robustez do Django no servidor com a agilidade do React na interface.

## 🚀 Tecnologias utilizadas

### Backend

- Django – Framework web
- Django REST Framework (DRF) – criação de APIs RESTful
- Integração com API do Spotify – autenticação OAuth2 e consumo de endpoints
- Controle de Sessões (Django Sessions) – gerenciamento seguro do estado do usuário autenticado

### Frontend

- React – Construção da SPA
- React Router – Navegação
- Fetch – Chamadas à API
- MUI - UI framework

### Outros

- Github Actions - CI/CD com auto deploy no VPS ao detectar push na branch main
- Nginx – Proxy reverso, roteamento para api correta e distribuição de assets estáticos
- Docker & Docker Compose – Orquestração dos serviços (frontend, backend e nginx) em containers
- Spotify Web API – Acesso a dados de usuário, playlists, artistas e faixas
