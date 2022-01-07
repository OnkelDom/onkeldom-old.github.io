---
permalink: /about/skills/
title: "Skills"
layout: single
author_profile: true
classes: wide
---

Im allgemeinen bin ich sicher im Umgang mit RedHat und Debian basierten Linux Distributionen und im Umgang mit der Microsoft Azure Cloud. Ansible ist für mich das Konfigurationmanagement Tool der wahl. Es ist schlank, leicht bedienbar und das wichtigste ist, dass es dezentral nutzbar ist und man auf keine Infrastruktur dafür angewiesen ist.

Im folgenden eine schlanke Übersicht mit den wichtigsten Skills.

{% if site.author_work_experiences_details %}
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
<a href="/about/" class="btn btn--primary">Zurück</a>