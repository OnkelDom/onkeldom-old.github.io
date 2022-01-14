---
layout: single
author: onkeldom
title: Git-Config
date: '2022-01-13 22:03:23 +0100'
categories:
  - linux
  - ubuntu
  - git
  - ssh
toc: true
---
In diesem Beitrag stelle ich eine grundlegende Git Themen vor. Von der Installation über die Konfiguration bishin zu der Nutzung mehrerer Accounts. Das System auf dem ich arbeite ist ein Ubuntu 20.04 im WSL2 (Windows Subsystem for Linux).

# Instalation
### Repository für eine aktuellere Version als im Ubuntu repo holen
`sudo add-apt-repository ppa:git-core/ppa`
### Packetstände aktualisieren
`sudo apt-get update`
### Packet git installieren ohne rückfrage (-y)
`sudo apt-get install -y git`
# Benutzer Daten und Konfiguration
### Benutzername der an einem Commit steht angeben
`git config --global user.name "your_name"`
### Die Mail-Adresse, die an einem Commit steht angeben
`git config --global user.email "email@address.com"`
### Auflisten der Konfigurtierten Parameter
`git config --list`
### Festlegen des Standard Editors (nano/vim)
`git config --global core.editor "vim"`

# Passwörter zwischenspeichern
Die nachfolgenden Befehle merken sich das Passwort für den genutzten Benutzer (sofern man sich mit Benutzer/Passwort anmeldet). Die angabe der Zeiten ist in Sekunden.

### Passwort für 15 Minuten merken (standard)
`git config --global credential.helper cache`
### Passwort für eine Stunde merken
`git config --global credential.helper 'cache --timeout=3600'`
### Passwort für acht Stunden merken
`git config --global credential.helper 'cache --timeout=28800'`

# Proxyserver
### Proxy für alle Verbindungen
Wenn man einen Proxy für alle Verbindungen benutzen möchte, kann man diesen mit dem nachfolgenden Befehl global setzen.

`git config --global http.proxy http://username:password@proxy_server.com:port`
### Proxy für bestimmte Domains
Wenn man z.B. innerhalb des unternehmens für das interne Versionsverwaltungssystem keinen Proxyserver benötigt, aber z.B. um auf Github zuzugreifen, kann mit mit dem folgenden Befehl speziell für Github einen Proxyserver hinterlegen. Wichtig dabei ist, dass vorne http. stehen muss und hinter der URL direkt das .proxy mit dran kommt. Das liegt daran, dass die Parameter dann korrekt in die Konfigurationdatei geschrieben werden unter `~/.gitconfig`.

`git config --global http.https://github.com.proxy http://username:password@proxy_server.com:port`

# Mehrer Accounts
Kürzlich stand ich vor der Aufgabe, dass ich mit zwei Github Accounts die jeweils einen eigenen SSH-Key haben, diese über meinen lokalen Benutzer nutzen musste. Dabei war mein Problem, dass er für beide Accounts immer den standard SSH-Key verwenden wollte. Wie man einen SSH-Key erstellt, werde ich hier nicht behandeln.

Damit das geht, zweckentfremden wir ein wenig die SSH (Benutzer) konfiguration. Dabei manipulieren wir zwei Dinge.
### Ändern der SSH Konfiguration
In der Datei `~/.ssh/config` fügen wir folgende Zeilen hinzu. Wir weisen damit dem SSH-Agent an, dass wenn er einen Aufruf auf `domhub.com` macht, dass er als Host `github.com` verwenden soll, aber als User `git`und als IdentitifyFile (SSH-Key) `~/.ssh/id_rsa_second`. Somit wird jeder Aufruf entsprechend mit einem anderen SSH-Key umgeleitet.
```bash
# Zweiter GitHub account
Host domhub.com
  HostName github.com
  User git
  AddKeysToAgent yes
  IdentityFile ~/.ssh/id_rsa_second
```
### Klonen eines neuen Repositories
Wenn ihr jetzt ein Repositorie von Github Klonen wollt, ändern direkt beim Klonen die URL ab um mit den anderen SSH-Key dafür zu arbeiten.
```bash
# Original URL
git clone git@github.com:OnkelDom/ansible-role-bashrc.git
# Manipulierte URL
git clone git@domhub.com:OnkelDom/ansible-role-bashrc.git
```
Somit sparrt ihr euch den Schnitt aus dem nachfolgende Punkt.

### Ändern der URL in der Repositorie Konfiguration eines vorhandenen Repos
In eurem Repository in der Datei `.git/config` steht die URL, die ihr aufrufen möchtet. Ändert die Domain einfach auf einen alternativen Namen. Ich habe hier `github` auf `domhub` abgeändert.
```bash
# Vorher
[remote "origin"]
        url = git@github.com:OnkelDom/ansible-role-bashrc.git
        fetch = +refs/heads/*:refs/remotes/origin/*
# Nachher
[remote "origin"]
        url = git@domhub.com:OnkelDom/ansible-role-bashrc.git
        fetch = +refs/heads/*:refs/remotes/origin/*
```

# Standard Kommandos
Anbei einige standard Kommandos, die man in Git öfters verwendet.

|Befehl|Beschreibung|
|------------|------|
|`git status`|Finden Sie geänderte Dateien im Arbeitsverzeichnis|
|`git diff`|Anzeigen der Änderungen im Arbeitsverzeichnis|
|`git add <file/folder>`|Datei oder Ordner zum nächsten Commit hinzufügen|
|`git commit -amend`|Änderungen in den letzten Commit hinzufügen (überschreiben)|
|`git commit -a`|Alle Änderungen zu einem Commit hinzufügen|
|`git commit -am "<message>"`|Alle Änderungen zu einem Commit und die Commit Nachricht hinzufügen|
|`git branch -m new-name`|Einen lokalen Branch umbenennen|
|`git remote -v`|Anzeigen aller konfigurierten Remote adressen|
|`git remote show <remote(origin)>`|Informationen zu einem Remote anzeigen|
|`git remote add`|Eine neue Remote Adresse (repo) hinzufügen|
|`git remote remove [remote name]`|Eine Remote Adresse entfernen|
|`git fetch`|Alle Änderungen aus einem Remote-Repository herunterladen|
|`git pull branch`|Einen bestimmten `branch/arbeitsstang` herunterladen und lokale zusammenführen|
|`git branch -d <branch>`|Einen bestimmten Branch lokal löschen|
|`git checkout -b <branch>`|Einen neuen Branch erstellen|
|`git checkout <branch>`|In einen Branch wechseln|
|`git cherry-pick <commit>`|Einen bestimmten existierenden Commit zum aktuellen Arbeitsverzeichnis hinzufügen|

