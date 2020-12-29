---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: home
---

<ul>
{% for file in site.data.logfile %}
  <li>
      {{ file.name}} -> {{ file.initialWords}}
  </li>
{% endfor %}

</ul>
