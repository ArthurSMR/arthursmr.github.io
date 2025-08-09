---
layout: default
title: Home
permalink: /
---

## Hi, I'm **Arthur Rodrigues** 👋

![Photo of Arthur Rodrigues](/assets/images/profile.jpg){: style="width:150px; border-radius: 75px; float: right; margin-left: 20px;" }

I craft high-quality, performant, and scalable iOS applications — with a focus on **clean architecture**, maintainability, and delightful user experience.

---

### Latest Posts

{% for post in site.posts limit:3 %}
- [{{ post.title }}]({{ post.url | relative_url }}) — {{ post.date | date: "%B %d, %Y" }}
{% endfor %}