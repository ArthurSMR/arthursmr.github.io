---
layout: home
author_profile: true
---

Hey, nice to meet you! I'm Arthur Rodrigues, iOS Developer at Betsson 🎯.
Here I share articles on Swift, SwiftUI, and MVVM, along with tips on mobile development, productivity, and lessons learned from real-world projects.

When I’m not coding, you’ll probably find me running 🏃‍♂️ or at the gym 💪.
I hope you find something useful or inspiring here!
[More about me](/about/).

---

### Featured Projects
- **Payment Module (Banking)** — modular, testable payment service used in production.  
- **Globo Esporte (native)** — converted high-traffic site to native app; improved engagement & ratings.  
- **Running Tracker** — SwiftUI app with HealthKit & offline sync (public repo).

---

### Latest Posts
{% for post in site.posts limit:3 %}
- [{{ post.title }}]({{ post.url | relative_url }}) — {{ post.date | date: "%B %d, %Y" }}
{% endfor %}
