---
title: Hochverfuegbares Raspberry PI Home Cluster
permalink: /blog/hochverfuegbares-raspberry-pi-home-cluster
date: '2022-02-01 21:55:23 +0100'
categories:
  - hochverfügbarkeit
  - raspberry
  - ubuntu
---
Vor einiger Zeit habe ich für mich den selbst Test gestartet und zu Hause mit zwei Raspberry PI eine Hochverfügbare DHCP, DNS, NTP und Proxy Umgebung mit Linux Standard Mitteln und Synchronisation auch für IPv6 gebaut. Da das ganze völliger Overkill für ein kleines Heimnetzwerk gewesen ist, habe ich die Lösung wieder verworfen und bin beim Standard geblieben. Was mir allerdings immer wichtig ist, dass ich einen vernünftigen Internetanschluss (IPv4 UND IPv6 mit prefered IPv6) habe. 

Ich habe mit jetzt mit einem Kollegen die Frage gestellt, ob es ein Problem sein könnte, wenn man zwei Server betreibt und auf beiden ein Prometheus läuft, der auf den anderen die Daten schreibt (Remote-Write). Davor dann einen Reverse Proxy und eine Service VIP (virtuelle IP-Adresse) die über Keepalived geschwenkt wird. Da ich neugierig bin, habe ich mir dafür noch etwas mehr überlegt. Ich nutze zu Hause [AdGuard-Home](https://adguard.com/de/welcome.html) um diese ganzen Tracking kram und Spam etwas entgegen zu wirken. Dazu dann noch ein wenig Unifi kram und Monitoring und schon sind die Anforderungen ganz andere. In meinem Scenario sieht das ganze wie folgt aus.

Für meine Spielerei zu Hause verzichte ich bewusst auf den Einsatz von K8S, K3S, Docker Swarm, Ceph oder sonstigen Container oder File Technologien. Nicht weil ich die nicht toll finde, sondern das ist für mich ein weiterer Layer, um den ich mich kümmern müsste. Die Meisten der Anwendungen, die ich verwende sind ein Go-Binary oder ich habe dafür sowieso schon eine Ansible Rolle die mir die Arbeit abnimmt.

# Anforderung

Schwenken einer virtuellen IP-Adresse (Service Adresse) zwischen zwei Servern ohne Beeinträchtigung der Dienste und dessen Lauffähigkeit.

## Zu Lösende Probleme

* Kann der Prometheus jeweils im aktiv/aktiv Betrieb auch auf die Gegenstelle Schreiben oder schaukelt sich das Ganze dann Hoch weil beide neue Daten bekommen und wieder zurück schreiben wollen?
* Ist der Traefik in der Lage in Kombination mit Cloudflare zweimal die Zertifikate zu verwalten?
* Lasen sich die Logdaten zwischen Loki und Loki über Lsyncd problemlos synchronisieren?
* Müssen Dienste mit einem Schwenk vom Keepalived gestartet oder gestoppt werden?

Mit den meisten dieser Anwendungen bin ich vertraut. Für DNS ist das ganze uninteressant, da man mehrere DNS Server in seinem Netzwerk bekannt machen kann und ein Client sich selbst darum kümmert (Roundrobin).

Am einfachsten wäre es, wenn man über den Keepalived immer nur auf dem Master (aktiver) Server die Dienste am laufen hat und mit Lsyncd einfach alle Verzeichnisse auf den Backup (inaktiver) Server schreibt. Bei einem Schwenk muss der Keepalived dann das Stoppen und Starten der Dienste übernehmen. Das könnte allerdings die ein oder andere Sekunde Unterbrechung bedeutet und das ist auch für zu Hause keine Option. 

## Genutzte Software

| Software          | Zweck                                                                       |
| ----------------- | ----------------------------------------------------------------------------|
| keepalived        | Schwenken von virtuellen IP-Adressen |
| traefik2          | Webserver / Reverse Proxy |
| prometheus        | Monitoring Server |
| alertmanager      | Alarmierung |
| pushgateway       | Metrik Empfänger |
| adguard-home      | DNS Server wie ein Pi-Hole |
| grafana           | Visualisierung von Metriken und Logs |
| loki              | Log Server |
| promtail          | Logsammler |
| lsyncd            | Synchronisieren von Daten zwischen Servern |
| rclone            | Nutze ich zum Synchronisieren wichtiger Daten zwischen zwei Cloud Speichern |
| blackbox-exporter | Abfrage von Webadressen über Prometheus |
| unifi-exporter    | Abfrage von Controller Werten für Prometheus |
| adguard-exporter  | Abfrage von DNS Werten für Prometheus |
| smtp-to-telegram  | Monitoring und Systemmails umwandeln und an Telegram schicken |
| alert-to-telegram | Alarmmeldungen direkt an einen Telegram Bot schicken |

# Planung

Damit ich mir das was ich erreichen möchte vorstellen kann, definiere ich mir immer den gewünschten Zielzustand. Die beiden Server sind primär mit ihrer LAN-Schnittstelle angebunden. Damit der Keepalived aber seinen VRRP Status nicht über das gleiche Interface wie seine Serviceadressen abfragen muss, habe ich dafür ein eignen WLAN mit einem /29 Netz eingerichtet. Das stellt sicher, dass wenn die LAN-Schnittstelle zu 100% ausgelastet ist, der Keepalived trotzdem uneingeschränkt seinen Clusterstatus mit dem Partner abfragen kann. Das ist besonders im Enterprise Umfeld ein Muss. Das muss nicht geroutet werden, da das nur innerhalb des keepalived zum Einsatz kommt. Eigentlich würde man hier sogar ein ungeroutetes /30 Netz für nutzen. Das lässt über WLAN aber mein Controller nicht zu oder ich bin zu blöd dafür ;)

Ich verwende natürlich nur das Minimal Image für die PI's da die Dinger nach der Fertigstellung sowieso nur in meinem Serverschrank rumliegen. Eine Grafische Oberfläche kostet unnötigen Speicher.

## Server #1

|          |                                |
|----------|--------------------------------|
| HW       | Raspberry PI4 4g               |
| OS       | Raspberry Pi OS 64-Bit (arm64) |
| NET-ETH0 | 192.168.1.8/26                 |
| NET-WLAN | 192.168.2.2/29 (not route)     |

## Server #2

|          |                                |
|----------|--------------------------------|
| HW       | Raspberry PI3 4g               |
| OS       | Raspberry Pi OS 64-Bit (arm64) |
| NET-ETH0 | 192.168.1.9/26                 |
| NET-WLAN | 192.168.2.3/29 (not route)     |

## Failover

|          |                                |
|----------|--------------------------------|
| IP       | 192.168.1.10/26 (alle Services)|

## Verzeichnis Sync
|                      |                                                                                      |
|----------------------|--------------------------------------------------------------------------------------|
| /var/lib/loki        | (falls promtail nicht von selbst auf zwei targets schreiben kann)                    |
| /var/lib/prometheus  | (falls remote write nicht klappt)                                                    |
| /var/lib/grafana     | (falls erforderlich)                                                                 |
| /var/Lib/traefik     | (falls acme.json ein problem macht)                                                  |
| /var/lib/pushgateway | (nur bei latenzproblemen notwendig, da sonst instant auf prometheus geschrieben ist) |

# Umsetzung

Ich werde mich in den kommenden Wochen um die Umsetzung kümmern. Da ich aber umziehe, werden die Ergebnisse und Konfigurationen etwas mehr Zeit in Anspruch nehmen. Ich werde die Scripte oder Ansible Rollen so kommentieren, dass sie von jedem genutzt werden können. Den gesamten Code findet man nach der Fertigstellung dann in Github. Den Link stelle ich dann natürlich hier ein.

## Scripte / Ansible

Pro Service eine Ansible Rolle bzw. für Lsyncd (da ggf. nicht notwendig) ein Script oder die Konfiguration händisch.
Erstellen eines eigenen Playbooks als Vorlage

## Rollout

Bevor ihr jetzt wild drauf Los legt, sichert erstmal alle erforderlichen Daten. Da einer der beiden PI bei mir im produktiven Betrieb ist, musste ich alle wichtigen Anwendungen erstmal anderweitig unter bekommen. Die habe ich einfach frech auf dem Unifi Controller installiert. 

## Tests

Wir müssen jede Anwendung auf ihre failover Fähigkeit bzw. ihr Verhalten dabei prüfen. Dabei spielt es keine Rolle, ob der Keepalived die Dienste startet oder stoppt, oder nur der Schwenk der Service Adresse das ganze verändert. Auch die Datenkonsistenz spielt eine wichtige Rolle dabei. Überlegt euch also, welche Tests für euch wichtig sind. Notfalls schreibt euch noch Scripte, die das Prüfen und die Ergebnisse entweder in den Textfile Collector oder an das Pushgateway schicken und ihr könnt darauf direkt alarmieren. Das würde ich euch auch für den Keepalived empfehlen. Entweder ihr holt euch dafür den Prometheus Exporter oder macht das Scriptgesteuert bei einem Schwenk. Man möchte ja schon wissen, ob und ggf. warum auf den zweiten Server geschwenkt wurde.

# Zusammenfassung

Steht noch aus -,-

## Fazit

Da alleine schon die Vorgedanken so viele und umfangreich sind, habe ich diesen Post ohne die Ergebnisse oder eigentliche Durchführung veröffentlicht, um auch anderen einen Anreiz daran zu geben.