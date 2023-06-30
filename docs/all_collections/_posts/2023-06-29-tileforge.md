---
layout: post
title: TileForge
date: 2023-06-29
dateString: 2021-2023
categories: [React, NextJS, TypeScript, PixiJS, Supabase]
img: https://media.discordapp.net/attachments/678975352730681394/1124312795706568754/tileforge-portfolio-img.webp?width=682&height=455
description: A free to use, web based map builder for tabletop roleplaying gamers.
---

TileForge is a dynamic, user-friendly, online map builder designed for tabletop role-playing games. A free-to-use tool, it empowers users to draw and embellish intricate maps, like a medieval castle, a bustling tavern, or an enchanted forest. This tool is a perfect companion to Virtual Tabletops (VTTs like Roll20), allowing users to create and play immersive tabletop role-playing games virtually.

## Mission Statement

To create a user-friendly map builder that allows anyone to design a visually stunning map in under 15 minutes.

## Technology Stack

To provide a seamless user experience and ensure optimal performance, we utilized a robust tech stack:

- Supabase
- NextJS
- React
- React Redux
- PixiJS [Extended]
- Tailwind CSS
- Vercel

## Development History

After a constructive 6-month beta period with 700 avid users, our compact team of two initiated a complete overhaul of our map builder, basing every change and improvement on valuable user feedback. Less than 5% of the original codebase was retained, marking a significant evolution of TileForge. We started development of this improved version in early January 2023, culminating in a public launch in May 2023. 

During this development phase, I spearheaded 95% of the tasks, which included:

- Seamlessly migrating the database from Firebase to Supabase.
- Upgrading PixiJS to v7 for enhanced graphics.
- Reworking all collision logic for wall and floor textures to optimize map integrity.
- Redesigning UI/UX for a smoother, intuitive user experience.

## Roles and Responsibilities

- **Led UI/UX Design**: Created an intuitive and user-friendly design to enhance the product experience.
- **Conducted Customer Discovery**: Engaged in 1:1 interviews and distributed surveys to gather user feedback and needs, thereby shaping our product direction.
- **Database Design**: Structured and optimized the database for maximum efficiency and data integrity.
- **Managed Project**: Created and managed tasks and sprints, ensuring the timely delivery of features and updates.
- **Developed Core Features**: Worked on pivotal feature development to enhance user experience and product usability.
- **Created Core Art Assets**: Designed visually appealing art assets to elevate the aesthetic appeal of our tool.

## Features

**Dynamic Lighting:** Dynamic lighting allows users to create lights (e.g. candle) that do not penetrate walls. Combined with color filters, these lights allow for a more emmersive map.

**Wall Intersections:** When testing our competitor's tools, the wall tool was where things would break in stress testing. We managed to build a robust wall tool that can handle everything the average use would throw at it.

**Stair Tool:** In our original version of the builder, placing stairs was a challenge. Even though you could see the map layer below as you placed the second story staircase, you often had them misaligned. The stair tool solves this issue by automatically placing stairs above/below the active staircase.

**Portal Tool:** The most math intensive tool, portals can be placed along any valid wall and will automatically remove/add the wall beneath upon placing and deleting. The tool adapts to the portal size so that the art assets are not restricted like some tools.

## Future Developments

We’re constantly striving to innovate and enhance the capabilities of TileForge. Our current endeavor is the integration of an AI-driven dungeon generator and room decorator. This feature will further simplify map creation and enable users to create good-looking maps in significantly less time. By continuing to listen to our community and refine our tool, we aim to remain at the forefront of virtual map creation for tabletop role-playing games.

## Elaborated Challenges & Solutions

### Challenge 1: Wall Corners – The Janky Conundrum

One of the most prominent challenges in 2D graphics engines is texture/UV mapping, particularly around corners. After several attempts and iterations with this approach, we found the results to be far from ideal – let's just say it was rather "janky".

The primary issue was rendering wall textures that didn't necessitate a low-resolution image being stretched, sliced, or rotated to fill the triangles created by the UV mapping around corners. We knew we needed a different approach.

#### Solution 1: Masking

To combat this, we shifted our strategy from mapping textures to employing masking techniques. Instead of wrapping a texture around the corner based on a single set of points (one line), we would offset the lines to both sides and create two polygons (or one polygon in the case of open loops). One polygon would represent the outer perimeter,

 while the other would form the hole in the center. Once the texture was drawn and masked, the black outline was added using the polygons.

This alternative method allowed us to develop tiling wall textures that remained consistent and free from distortion, as the masks would only reveal the texture where the wall was intended to be.

### Challenge 2: Wall Intersections

While our inventive masking technique solved the issue with wall corners, it also amplified the intricacy of wall intersections.

Initially, walls were drawn as separate objects in a PIXI container that could be individually deleted. If a wall was drawn atop another, it simply appeared above it. However, with the masking technique, all textures were flattened to a single texture layer masked using polygon data. Individual walls were no longer identifiable, as all the polygons had to be reduced down based on their intersections. This posed a significant problem: there's a myriad of possible combinations for overlapping polygon intersections, each requiring isolation, condition writing, and testing.

#### Solution 2: Whiteboard Sessions + Persistence

Our approach to this was exhaustive but effective: a multitude of whiteboard sessions dedicated to identifying every possible intersection condition and illustrating them. For example, a polygon could overlap the perimeter of another, or a polygon could be inside another but not touch the perimeter.

The complexity grew when considering PixiJS does not permit drawing holes within holes, a scenario that frequently occurs when designing large building layouts. To solve this, we developed a tracking system for parent-child relationships during boolean functions, ensuring the correct assignment of holes to their parent polygons at the end of the sequence.

For each intersection case, we determined what boolean functions needed to be applied and constructed a stack that processed through each existing polygon on the map sequentially. As new polygons were created from boolean functions (e.g., a new hole was formed), they were added to the stack and processed in the correct order. This stack was vital to avoid any out-of-sequence holes or polygons that would result in incorrect parent-child relationships when the final polygons were rendered by PixiJS.

### Challenge 3: Image Transfer Costs – Data Overhead

TileForge, being a web-based application, doesn't have the benefit of storing art assets locally like some competitors do. This means that each time a user logs in, all art textures need to be requested from the database and loaded into the app, which could lead to significant data transfer costs (~10-15mb of assets each login) when operating at scale.

#### Solution 3: Local Caching

We employed browser caching to locally store the images temporarily in the user's local storage. When a user logs in, the app checks if the assets already exist and loads them in if necessary. If new or updated assets are detected, the app reloads those assets to ensure the user always has the most current versions of the art. This strategy effectively mitigates high data transfer costs while maintaining a smooth and up-to-date user experience.