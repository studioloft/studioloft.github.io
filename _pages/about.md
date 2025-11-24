---
layout: fullpage
title: About Me
permalink: /about/
---

<!-- begin hero -->
<section class="hero">
  <div class="container">
    <div class="hero__inner">
      <div class="row">

        <div class="col col-6 col-d-12">
          <div class="hero__left">
            <div class="hero__image">
              <img class="lazy" data-src="{{ site.data.settings.hero.hero_image }}" alt="{{ site.data.settings.author.name }}'s Picture">
            </div>
            {% if site.data.settings.hero.hero_image_caption %}
            <div class="hero__image__caption">{{ site.data.settings.hero.hero_image_caption | markdownify | replace: '<p>' | replace: '</p>' }}</div>
            {% endif %}
          </div>
        </div>

        <div class="col col-6 col-d-12">
          <div class="hero__right">
            {% if site.data.settings.hero.hero_avatar %}
            <div class="hero__avatar">
              <img class="lazy" data-src="{{ site.data.settings.hero.hero_avatar }}" alt="{{ site.data.settings.author.author_name }}">
            </div>
            {% endif %}

            {% if site.data.settings.hero.hero_title %}
            <h1 class="hero__title">{{ site.data.settings.hero.hero_title }}</h1>
            {% endif %}

            {% if site.data.settings.hero.hero_subtitle %}
            <p class="hero__subtitle">{{ site.data.settings.hero.hero_subtitle }}</p>
            {% endif %}

            {% if site.data.settings.hero.hero_description %}
            <div class="hero__description">{{ site.data.settings.hero.hero_description | markdownify }}</div>
            {% endif %}

            {% if site.data.settings.hero.hero_button_text %}
            <a href="{{ site.data.settings.hero.hero_button_link }}" class="hero__button button button--primary">{{ site.data.settings.hero.hero_button_text }}</a>
            <a href="mailto:Contact@StudioLoftMedia.com" class="hero__button button button--primary">"<i class="fa-solid fa-envelope"></i> Email Me"</a>
            {% endif %}
          </div>
        </div>

      </div>
    </div>
  </div>
</section>
<!-- end hero -->

Hi, I'm Gavin Hornak - I am a full-time Broadcast Engineering and IT Technologist with almost 2 decades of experience. I started Studio Loft Media in 2008, originally focued on media-industry education and resources helping early-career professionals understand the fundamentals of digital media and technical craft. Over time, the original mission caries on. As my career has transitioned more deeply into video engineering, live broadcast and IT infrastructure, Studio Loft evolved with me. Today Studio Loft expands on it's original intent, continuing to encourage learning and professional growth for anyone passionate about modern media technology.

My hope is that Studio Loft becomes a resource for engineers, students, operators and creatives who want to understand not just what we build, but why it matters. I hope you walk away with practical insights and inspiration to build, experiment and push the industry forward.

{: .q-left }
> “People think tech is rigid, but the truth is the opposite: once you understand the rules, you gain the freedom to bend them, optimize them, and build workflows no one else sees.”

My goal with Studio Loft Media is simple: To bridge the gap between people and technology. Here, you'll find technical insight on topics such as IP routing, signal integrity, monitoring and alerting, HDR imaging, Rf/Wireless, Disaster-recovery engineering, virtual machines, cloud computing, centralized workflows, workflow automation, and ands-on production tools.

Whether you're a student, a working creative, a future broadcast engineer or current media professional, this site is for you. I hope Studio Loft inspires you to experiment boldly, learn relentlessly, and push your technology beyond what you thought it was capable of.

> Because great storytelling isn't just creative - it's engineered.