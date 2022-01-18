---
title: Zwei-Faktor Authentifizierung
permalink: /blog/zwei-faktor-authentifizierung
date: '2022-01-14 18:19:31 +0100'
categories:
  - sicherheit
  - wissen
---
Inspiriert im Kontext meiner eigenen täglichen Arbeit und was man sonst so alles mitbekommt, ist es mir wichtig, als erstes auf die Wichtigkeit bei der Absicherung deiner Privatsphäre hinzuweisen.

# Verfahren

Ich gehe jetzt nicht speziell auf alle Verfahren zur Absicherung eines Accounts ein, sondern beschränke mich auf die, die für den normalen Benutzer realistisch sind. Das bedeutet so etwas wie Hardwaretokens lasse ich außen vor.
Wenn es euch möglich ist, nutzt keine Zwei-Faktor Authentifizierung per SMS. SMS ist immer unverschlüsselt und es gibt weltweit nur einen großen Anbieter, über den alle Versand werden. Dieser wurde auch schon erfolgreich angegriffen ohne dass sie es direkt mitbekommen haben. Das bedeutet, wenn zusätzlich zu der SMS-Firma auch euer Account gestohlen wurde, kann ein Angreifer so trotzdem in euren Account. Ebenso kann man die SMS mitlesen, wenn euer Smartphone gehackt wurde.

Meine Empfehlung ist die Verwendung einer Authenticator App. Also eine App auf eurem Smartphone, die entweder eine Anfrage beim Login bekommt die ihr bestätigen müsst, oder eine generierte Nummer, die alle 30-Sekunden wechselt und ihr eingeben müsst. Auch die App selbst lässt sich in der Regel via Fingerabdruck oder Gesichtserkennung schützen. Nutzt diese Funktionen.

# Nutzung

Natürlich bietet leider nicht jeder Dienst die Möglichkeit einer Zwei-Faktor Authentifizierung. Wichtig hierbei ist, was euch wichtig ist. Es sollten in erster Linie all die Accounts abgesichert werden, über die ein weiterer Zugriff ermöglicht werden kann. Das sind im wesentlichen E-Mail Postfächer und all die Accounts, auf denen von euch persönliche oder wichtige Daten liegen. Verwendet auch bitte bei jedem Account ein anderes generiertes langes Passwort. Genaueres findet ihr in meinem Blog-Beitrag zu [Account und Passwort Sicherheit](/blog/account-und-passwort-sicherheit/).

Benutzt auch die Zwei-Faktor Authentifizierung bei eurem Authenticator per Fingerabdruck oder Gesichtserkennung. In einem Notfall ist es die letzte Bastion, die euch schützen kann. Danach hilft nur noch der Plan für [Incident Response](https://www.youtube.com/watch?v=8R9s9EpdMt0) by [The Morpheus Vlog](https://www.youtube.com/channel/UCkZ3fSYruC0IXv6p34BHciQ).

Hier findet ihr noch eine online gepflegte Liste von Webseiten und Services die eine Zwei-Faktor Authentifizierung und nicht nur den Authenticator unterstützen. [2FA-Directory](https://2fa.directory/)