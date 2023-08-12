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

Une fois deployées, les fichiers .json des contrats sont à copier dans les dossiers `/src` des clients pour pouvoir être utilisés.

## Client ChainConnect

>  Client permettant l'inscription au réseau d'authentification décentralisée ChainConnect.

Le code du client est situé dans le répertoire `./chain-connect` et s'éxecute dans le terminal avec `$yarn start` en veillant à éxecuter `$yarn install` avant le premier lancement.

## Client Filltruck

> Client tiers utilisant l'authentification décentralisée ChainConnect.

Le code du frontend est situé dans le répertoire `./filltruck/client` et s'éxecute dans le terminal avec `$yarn start` en veillant à éxecuter `$yarn install` avant le premier lancement.