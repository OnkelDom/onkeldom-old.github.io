---
permalink: /uebermich/
title: "Über mich"
layout: single
author_profile: true
---

1987 Geboren, habe ich 2005 die mitlere Reife erlangt. Nach einiger Zeit zu hause am Computer und kleineren aushilfsjobs habe ich dann mit 18 meinen Grundwehrdienst bei der Bundeswehr absolviert. Im Anschluss daran habe ich mich im Verlagswesen selbstständig gemacht und mit zur Bestzeit 48 Mitarbeitern im hauptgeschäft für die Frankfurter Rundschau in allen Bereich tätig bin ich gemeinsam mit dieser 2012 in die Insolvenz gegangen. Bis 2014 habe ich dann noch als Teamleiter und Einsatzplaner in Tochterfirmen für die Abonentenzustellung gearbeitet. 

2014 habe ich mich dann dazu entschieden, mein Hobby Computer und Technik zum Beruf zu machen und startete im August 2014 die Ausbildung zum Fachinformatiker für Systemintegration die ich mit soliden 87 Punkten im Januar 2017 angeschlossen habe.

Nach der Ausbildung habe ich mich auf die Linux Server Administration konzentriert. Schwerpuntke dabei waren die Verwaltung mit Puppet/Foreman und die Anwendungen im Bereich Proxy, DNS, Loadbalancing, Monitoring und Hochverfügbare Lösungen.

2018 bot sich für mich die gelegenheit ein eigenes Team zu bekommen und das gesamte Monitoring von Zabbix zu etwas neuem zu Migrieren. Nach einer Evaluierungszeit haben wir dann auf den gesamten Prometheus Stack gesetzt und verwalten die Assets mit Consul und konnten somit eine nahezu vollautomatisierung erreichen. Das Projekt hat gesamt 4 Jahre Zeit in anspruch genommen. In dieser Zeit habe ich ebenfalls angefangen mich tief in Ansible, Github (ink actions) und weitere automatisierungsmöglichkeiten einzuareiten. 

2021 hat sich mir dann paralell die gelegenheit geboten, in die Administration der Microsoft Azure Cloud zu kommen und das Unternehmen bei der Migration dorthin zu begleiten. Einige Schulungen und Erfahrungen später erwies sich diese entscheidung als richtig.

Heute liegt mein interesse und der Arbeitsaltag im Allgemeinen auf übergreifenden, dezentralen monitoring Lösung in der Cloud und oder onPrem sowie die Administration in Azure. Zur verwaltung verwende ich im Kern Ansible, PowerShell oder automatismen in Github.

{% if site.author_education_details %}
<h2>{{ site.author_education_title }}</h2>
<table>
{% for detail in site.author_education_details %}{% if detail.visibility == true %}
  <tr>
    <td class="td_about_img"><img src="{{ site.url }}{{ site.baseurl }}/assets/images/about/{{ detail.logo }}"/></td>
    <td class="td_about_text">
      <p><b>{{ detail.degree }}</b></p>
      <p>{{ detail.college_name }}</p>
      <p>{{ detail.description }}</p>
      <p><a class="btn btn--primary" href="{{ detail.url }}" target="_blank">{{ detail.url }}</a></p>
    </td>
  </tr>
{% endif %}{% endfor %}
</table>
{% endif %}
{% if site.author_work_experiences_details %}
<h2>{{ site.author_work_experiences_title }}</h2>
<table>
{% for exp in site.author_work_experiences_details %}{% if exp.visibility == true %}
  <tr>
    <td class="td_about_img"><img src="{{ site.url }}{{ site.baseurl }}/assets/images/about/{{ exp.logo }}" /></td>
    <td class="td_about_text">
      <p><b>{{ exp.designation }}</b></p>
      <p>{{ exp.description }}</p>
      <p><a class="btn btn--primary" href="{{ exp.url }}" target="_blank">{{ exp.url}}</a></p>
    </td>
  </tr>
{% endif %}{% endfor %}
</table>
{% endif %}
{% if site.author_project_details %}
<h2>{{ site.author_project_title }}</h2>
<table>
{% for project in site.author_project_details %}{% if project.visibility == true %}
  <tr>
    <td class="td_about_img"><img src="{{ site.url }}{{ site.baseurl }}/assets/images/about/{{ project.thumbnail }}" /></td>
    <td class="td_about_text">
      <p><b>{{ project.title }}</b></p>
      <p>{{ project.description }}</p>
      <p><a class="btn btn--primary" href="{{ exp.url }}" target="_blank">{{ project.url}}</a></p>
    </td>
  </tr>
{% endif %}{% endfor %}
</table>
{% endif %}