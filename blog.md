---
layout: default
title: Blog
permalink: /blog
---

# Blog

{% for post in site.posts %}
- <a href="{{ post.url }}">{{ post.title }}</a> — {{ post.date | date: "%b %d, %Y" }}
{% endfor %}