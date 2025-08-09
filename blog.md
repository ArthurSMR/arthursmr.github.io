---
layout: default
title: Blog
permalink: /blog/
---

# Blog

<div class="posts-list">
  {% for post in site.posts %}
  <article class="post-item">
    <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
    <time datetime="{{ post.date | date_to_xmlschema }}">
      {{ post.date | date: "%B %d, %Y" }}
    </time>
    <p>{{ post.excerpt | strip_html | truncate: 160 }}</p>
  </article>
  {% endfor %}
</div>