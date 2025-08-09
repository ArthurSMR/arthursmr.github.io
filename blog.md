---
layout: default
title: Blog
permalink: /blog/
---

# Blog

{% for post in site.posts %}
  
### [{{ post.title }}]({{ post.url | relative_url }})  
*{{ post.date | date: "%B %d, %Y" }}*  
  
{{ post.excerpt | strip_html | truncate: 160 }}  

---  

{% endfor %}