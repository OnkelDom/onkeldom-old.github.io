---
permalink: /about/education/
title: "Ausbildungen"
---

{% if site.author_education_details %}
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
<a href="/about/" class="btn btn--primary">Zurück</a>