---
permalink: /about/projects/
title: "Projekte"
layout: single
author_profile: true
classes: wide
---
{% if site.author_project_details %}
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
<a href="/about/" class="btn btn--primary">Zurück</a>