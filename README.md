# ChainConnectMGL850

## Réseau local Ethereum

Le projet utilise un réseau local Ethereum mis en place à l'aide de Ganache
(https://trufflesuite.com/ganache/).

Paramètres: 
- Hostname: 127.0.0.1
- Port: 7545
- NetworkID: 5777

## Projet Truffle

Le projet utilise un projet Truffle pour la création, les tests, la compilation et la migration des Smart Contracts sur la chaîne de blocs.

Compilation: `$truffle compile`

Tests: `$truffle test`

Migration: `$truffle migrate`

## Client ChainConnect (site permettant l'inscription au réseau d'authentification décentralisé ChainConnect)

Le code du client est situé dans le répertoire `./chain-connect` et s'éxecute dans le terminal avec `$yarn start` en veillant à éxecuter `$yarn install` avant le premier lancement.

## Client Filltruck (site tiers utilisant l'authentification ChainConnect)

Le code du frontend est situé dans le répertoire `./filltruck/client` et s'éxecute dans le terminal avec `$yarn start` en veillant à éxecuter `$yarn install` avant le premier lancement.

Le code du backend est situé dans le répertoire `./filltruck/server` et s'éxecute dans le terminal avec `$flask run` en veillant à éxecuter `$pip install -r requirements.txt` avant le premier lancement.